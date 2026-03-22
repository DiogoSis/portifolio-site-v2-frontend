"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error || "Falha ao autenticar");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erro de rede ao autenticar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-background-950 px-4 pt-28 pb-16">
      <div className="mx-auto w-full max-w-md">
        <Card className="glass border-border">
          <CardHeader>
            <p className="text-accent-500 font-mono text-sm">admin@login</p>
            <CardTitle className="font-heading text-text-50 text-2xl">
              Area Administrativa
            </CardTitle>
            <p className="text-text-400 text-sm">
              Use suas credenciais para acessar o painel.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-text-300" htmlFor="username">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="w-full rounded-md border border-border bg-background-900 px-3 py-2 text-text-50 outline-none focus:border-accent-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@local.dev"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-text-300" htmlFor="password">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-md border border-border bg-background-900 px-3 py-2 text-text-50 outline-none focus:border-accent-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>

              {error ? <p className="text-red-400 text-sm">{error}</p> : null}

              <Button
                type="submit"
                className="w-full bg-accent-500 text-background-950 hover:bg-accent-400"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
