"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminHomePage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <section className="min-h-screen bg-background-950 px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <p className="font-mono text-sm text-accent-500">/admin/dashboard</p>
          <h1 className="font-heading text-3xl text-text-50">Painel Administrativo</h1>
          <p className="text-text-400">
            Acesso autenticado com Cognito. Use o painel para gerenciar conteudo administrativo.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="font-heading text-text-50">Conteudo</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-text-300">
              Gerencie certificados, formacoes, projetos e knowledge com rotas dedicadas `/admin/*`.
              <div className="mt-4">
                <Button asChild className="bg-accent-500 text-background-950 hover:bg-accent-400">
                  <Link href="/admin/content">Abrir CRUD</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="font-heading text-text-50">Usuarios Admin</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-text-300">
              Permissoes controladas pelos grupos Cognito `superadmin` e `editor`.
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-border text-text-50 hover:bg-background-800"
        >
          Sair
        </Button>
      </div>
    </section>
  );
}
