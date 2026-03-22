import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  decodeCognitoIdToken,
  createAdminSessionToken,
  resolveAdminRole,
} from "@/lib/admin-auth";

interface LoginBody {
  username?: string;
  password?: string;
}

interface CognitoInitiateAuthSuccess {
  AuthenticationResult?: {
    IdToken?: string;
  };
  ChallengeName?: string;
}

interface CognitoErrorPayload {
  __type?: string;
  message?: string;
}

function getCognitoConfig() {
  const region = process.env.COGNITO_REGION || "us-east-1";
  const clientId = process.env.COGNITO_USER_POOL_CLIENT_ID || "";

  return { region, clientId };
}

async function authenticateWithCognito(username: string, password: string) {
  const { region, clientId } = getCognitoConfig();

  if (!clientId) {
    throw new Error("COGNITO_NOT_CONFIGURED");
  }

  const response = await fetch(`https://cognito-idp.${region}.amazonaws.com/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
    },
    body: JSON.stringify({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as CognitoErrorPayload;
    const cognitoType = errorData.__type || "";

    if (cognitoType.includes("NotAuthorizedException") || cognitoType.includes("UserNotFoundException")) {
      throw new Error("INVALID_CREDENTIALS");
    }

    throw new Error("COGNITO_AUTH_ERROR");
  }

  const data = (await response.json()) as CognitoInitiateAuthSuccess;

  if (data.ChallengeName) {
    throw new Error("COGNITO_CHALLENGE_NOT_SUPPORTED");
  }

  const idToken = data.AuthenticationResult?.IdToken;

  if (!idToken) {
    throw new Error("COGNITO_NO_ID_TOKEN");
  }

  return idToken;
}

export async function POST(request: NextRequest) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { error: "Payload invalido" },
      { status: 400 }
    );
  }

  if (!body.username || !body.password) {
    return NextResponse.json(
      { error: "Usuario e senha sao obrigatorios" },
      { status: 400 }
    );
  }

  let idToken: string;

  try {
    idToken = await authenticateWithCognito(body.username, body.password);
  } catch (error) {
    if (error instanceof Error && error.message === "COGNITO_NOT_CONFIGURED") {
      return NextResponse.json(
        {
          error:
            "Cognito nao configurado no frontend (defina COGNITO_USER_POOL_CLIENT_ID no ambiente do servidor e reinicie o deploy)",
        },
        { status: 500 }
      );
    }

    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return NextResponse.json({ error: "Credenciais invalidas" }, { status: 401 });
    }

    if (error instanceof Error && error.message === "COGNITO_CHALLENGE_NOT_SUPPORTED") {
      return NextResponse.json(
        { error: "Usuario requer desafio adicional (ex.: troca de senha inicial)" },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: "Falha ao autenticar no Cognito" }, { status: 502 });
  }

  const claims = decodeCognitoIdToken(idToken);

  if (!claims) {
    return NextResponse.json({ error: "Token Cognito invalido" }, { status: 401 });
  }

  const groups = claims["cognito:groups"] || [];
  const role = resolveAdminRole(groups);

  if (!role) {
    return NextResponse.json({ error: "Usuario sem grupo admin permitido" }, { status: 403 });
  }

  const token = createAdminSessionToken({
    sub: claims.sub,
    email: claims.email,
    groups,
    role,
    idToken,
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
