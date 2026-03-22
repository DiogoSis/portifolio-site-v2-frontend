#!/usr/bin/env node

/**
 * Smoke test for Next.js BFF production APIs.
 *
 * Required env vars:
 * - BFF_BASE_URL (optional, default: https://www.diogo.life)
 * - BFF_ADMIN_USERNAME
 * - BFF_ADMIN_PASSWORD
 *
 * Optional env vars:
 * - BFF_CHAT_QUESTION
 */

const BASE_URL = (process.env.BFF_BASE_URL || "https://www.diogo.life").replace(/\/$/, "");
const ADMIN_USERNAME = process.env.BFF_ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.BFF_ADMIN_PASSWORD || "";
const CHAT_QUESTION =
  process.env.BFF_CHAT_QUESTION || "Qual sua experiencia profissional?";

function logStep(status, label, details = "") {
  const suffix = details ? ` - ${details}` : "";
  console.log(`${status} ${label}${suffix}`);
}

async function requestJson(path, init = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, init);

  let json;
  let text;

  try {
    json = await response.json();
  } catch {
    text = await response.text().catch(() => "");
  }

  return { url, response, json, text };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getCookieHeaderFromResponse(response) {
  const setCookie = response.headers.get("set-cookie");

  if (!setCookie) {
    return "";
  }

  return setCookie.split(";")[0];
}

async function testPublicCollection(path) {
  const label = `GET ${path}`;
  const { response, json, text } = await requestJson(path, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  assert(response.ok, `${label} retornou ${response.status}. Body: ${JSON.stringify(json || text)}`);
  assert(json && Array.isArray(json.data), `${label} nao retornou objeto com data[]`);
  assert(typeof json.count === "number", `${label} nao retornou count numerico`);

  logStep("PASS", label, `status=${response.status}, count=${json.count}`);
}

async function testChat() {
  const label = "POST /api/chat";
  const { response, json, text } = await requestJson("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      question: CHAT_QUESTION,
    }),
  });

  assert(response.ok, `${label} retornou ${response.status}. Body: ${JSON.stringify(json || text)}`);
  assert(json && typeof json.answer === "string", `${label} nao retornou answer`);
  assert(typeof json.conversationId === "string", `${label} nao retornou conversationId`);

  logStep("PASS", label, `status=${response.status}`);
}

async function testAdminFlow() {
  const loginLabel = "POST /api/admin/auth/login";

  assert(ADMIN_USERNAME, "Defina BFF_ADMIN_USERNAME para testar fluxo admin");
  assert(ADMIN_PASSWORD, "Defina BFF_ADMIN_PASSWORD para testar fluxo admin");

  const login = await requestJson("/api/admin/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    }),
  });

  assert(login.response.ok, `${loginLabel} retornou ${login.response.status}. Body: ${JSON.stringify(login.json || login.text)}`);
  assert(login.json && login.json.success === true, `${loginLabel} nao retornou success=true`);

  const cookieHeader = getCookieHeaderFromResponse(login.response);
  assert(cookieHeader, `${loginLabel} nao retornou cookie de sessao`);

  logStep("PASS", loginLabel, `status=${login.response.status}`);

  const projectsLabel = "GET /api/admin/projects";
  const projects = await requestJson("/api/admin/projects", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: cookieHeader,
    },
  });

  assert(projects.response.ok, `${projectsLabel} retornou ${projects.response.status}. Body: ${JSON.stringify(projects.json || projects.text)}`);
  assert(projects.json && Array.isArray(projects.json.data), `${projectsLabel} nao retornou data[]`);

  logStep("PASS", projectsLabel, `status=${projects.response.status}, count=${projects.json.count}`);
}

async function main() {
  console.log(`Running BFF production smoke tests against: ${BASE_URL}`);

  const tests = [
    () => testPublicCollection("/api/certificates"),
    () => testPublicCollection("/api/formations"),
    () => testPublicCollection("/api/projects"),
    () => testChat(),
    () => testAdminFlow(),
  ];

  let passed = 0;
  let failed = 0;

  for (const testFn of tests) {
    try {
      await testFn();
      passed += 1;
    } catch (error) {
      failed += 1;
      logStep("FAIL", testFn.name || "test", error instanceof Error ? error.message : String(error));
    }
  }

  console.log("\nSummary");
  console.log(`- passed: ${passed}`);
  console.log(`- failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
