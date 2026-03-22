"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Resource = "certificates" | "formations" | "projects" | "knowledge";

type ItemRecord = Record<string, unknown> & { id: number };
type FieldType = "text" | "url" | "textarea" | "number" | "list";

interface ResourceField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}

type FormState = Record<string, string>;

const resources: { value: Resource; label: string }[] = [
  { value: "certificates", label: "Certificados" },
  { value: "formations", label: "Formacoes" },
  { value: "projects", label: "Projetos" },
  { value: "knowledge", label: "Knowledge" },
];

const fieldsByResource: Record<Resource, ResourceField[]> = {
  certificates: [
    { key: "courseName", label: "Nome do curso", type: "text", placeholder: "AWS Practitioner" },
    { key: "categoryCode", label: "Categoria", type: "text", placeholder: "Cloud" },
    { key: "certificateUrl", label: "URL do certificado", type: "url", placeholder: "https://..." },
    { key: "imageUrl", label: "URL da imagem", type: "url", placeholder: "https://..." },
    { key: "startedAt", label: "Data de inicio", type: "text", placeholder: "01/01/2026" },
    { key: "finishedAt", label: "Data de conclusao", type: "text", placeholder: "02/01/2026" },
  ],
  formations: [
    { key: "name", label: "Nome da formacao", type: "text", placeholder: "Sistemas de Informacao" },
    { key: "area", label: "Area", type: "text", placeholder: "Tecnologia" },
    { key: "certificate", label: "URL do certificado", type: "url", placeholder: "https://..." },
    { key: "conclusion", label: "Conclusao", type: "text", placeholder: "12/2027" },
    { key: "materias", label: "Materias", type: "list", placeholder: "Node.js, AWS, Arquitetura" },
  ],
  projects: [
    { key: "projectName", label: "Nome do projeto", type: "text", placeholder: "Portfolio V2" },
    { key: "description", label: "Descricao", type: "textarea", placeholder: "Descreva o projeto" },
    { key: "categoryLocal", label: "Categoria", type: "text", placeholder: "Pessoal" },
    { key: "typePerformance", label: "Tipo de atuacao", type: "text", placeholder: "Full Stack" },
    { key: "imagesUrl", label: "Imagens (URLs)", type: "list", placeholder: "https://img1, https://img2" },
    { key: "technologiesUsed", label: "Tecnologias", type: "list", placeholder: "Next.js, TypeScript" },
  ],
  knowledge: [
    { key: "title", label: "Titulo", type: "text", placeholder: "TypeScript" },
    { key: "icon", label: "URL do icone", type: "url", placeholder: "https://..." },
    { key: "category", label: "Categoria", type: "text", placeholder: "Backend" },
    { key: "rating", label: "Rating", type: "number", placeholder: "4" },
  ],
};

function valueToFormString(value: unknown, type: FieldType): string {
  if (value == null) {
    return "";
  }

  if (type === "list") {
    if (Array.isArray(value)) {
      return value.map((item) => String(item)).join(", ");
    }
    return "";
  }

  return String(value);
}

function buildEmptyForm(resource: Resource): FormState {
  const form: FormState = {};

  for (const field of fieldsByResource[resource]) {
    form[field.key] = "";
  }

  return form;
}

function buildFormFromItem(resource: Resource, item: ItemRecord): FormState {
  const form: FormState = {};

  for (const field of fieldsByResource[resource]) {
    form[field.key] = valueToFormString(item[field.key], field.type);
  }

  return form;
}

function buildPayloadFromForm(resource: Resource, form: FormState): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  for (const field of fieldsByResource[resource]) {
    const rawValue = (form[field.key] || "").trim();

    if (rawValue === "") {
      continue;
    }

    if (field.type === "number") {
      payload[field.key] = Number(rawValue);
      continue;
    }

    if (field.type === "list") {
      payload[field.key] = rawValue
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
      continue;
    }

    payload[field.key] = rawValue;
  }

  return payload;
}

function getItemTitle(resource: Resource, item: ItemRecord): string {
  if (resource === "certificates") {
    return String(item.courseName || "Sem nome");
  }

  if (resource === "formations") {
    return String(item.name || "Sem nome");
  }

  if (resource === "projects") {
    return String(item.projectName || "Sem nome");
  }

  return String(item.title || "Sem nome");
}

export default function AdminContentPage() {
  const [resource, setResource] = useState<Resource>("certificates");
  const [items, setItems] = useState<ItemRecord[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedForm, setSelectedForm] = useState<FormState>(buildEmptyForm("certificates"));
  const [createForm, setCreateForm] = useState<FormState>(buildEmptyForm("certificates"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) || null,
    [items, selectedId]
  );

  const title = useMemo(() => {
    const item = resources.find((entry) => entry.value === resource);
    return item?.label || resource;
  }, [resource]);

  const loadItems = useCallback(async (selectedResource = resource) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/${selectedResource}`, { cache: "no-store" });
      const data = (await response.json()) as { data?: ItemRecord[]; error?: string };

      if (!response.ok) {
        setError(data.error || "Falha ao carregar itens");
        setItems([]);
        setSelectedId(null);
        setSelectedForm(buildEmptyForm(selectedResource));
        return;
      }

      const list = Array.isArray(data.data) ? data.data : [];
      setItems(list);

      if (list.length === 0) {
        setSelectedId(null);
        setSelectedForm(buildEmptyForm(selectedResource));
        return;
      }

      const selectedStillExists = list.some((entry) => entry.id === selectedId);
      const fallbackItem = list[0];
      const nextSelected = selectedStillExists
        ? list.find((entry) => entry.id === selectedId) || fallbackItem
        : fallbackItem;

      setSelectedId(nextSelected.id);
      setSelectedForm(buildFormFromItem(selectedResource, nextSelected));
    } catch {
      setError("Erro de rede ao carregar itens");
      setItems([]);
      setSelectedId(null);
    } finally {
      setLoading(false);
    }
  }, [resource, selectedId]);

  function handleSelectItem(item: ItemRecord) {
    setSelectedId(item.id);
    setSelectedForm(buildFormFromItem(resource, item));
  }

  useEffect(() => {
    loadItems(resource);
    setCreateForm(buildEmptyForm(resource));
    setSelectedForm(buildEmptyForm(resource));
  }, [resource, loadItems]);

  async function handleCreate() {
    const parsed = buildPayloadFromForm(resource, createForm);

    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Falha ao criar item");
        return;
      }

      setCreateForm(buildEmptyForm(resource));
      await loadItems();
    } catch {
      setError("Erro de rede ao criar item");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleUpdate() {
    if (!selectedId) {
      setError("Selecione um item para editar");
      return;
    }

    const parsed = buildPayloadFromForm(resource, selectedForm);

    setBusyId(selectedId);
    setError(null);

    try {
      const response = await fetch(`/api/admin/${resource}/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || `Falha ao atualizar item ${selectedId}`);
        return;
      }

      await loadItems();
    } catch {
      setError(`Erro de rede ao atualizar item ${selectedId}`);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete() {
    if (!selectedId) {
      setError("Selecione um item para excluir");
      return;
    }

    setBusyId(selectedId);
    setError(null);

    try {
      const response = await fetch(`/api/admin/${resource}/${selectedId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || `Falha ao excluir item ${selectedId}`);
        return;
      }

      await loadItems();
    } catch {
      setError(`Erro de rede ao excluir item ${selectedId}`);
    } finally {
      setBusyId(null);
    }
  }

  function renderField(
    field: ResourceField,
    value: string,
    onChange: (nextValue: string) => void
  ) {
    if (field.type === "textarea") {
      return (
        <textarea
          className="min-h-24 w-full rounded-md border border-border bg-background-900 px-3 py-2 text-sm text-text-50 outline-none focus:border-accent-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
    }

    const inputType = field.type === "number" ? "number" : field.type === "url" ? "url" : "text";

    return (
      <input
        type={inputType}
        className="h-10 w-full rounded-md border border-border bg-background-900 px-3 text-sm text-text-50 outline-none focus:border-accent-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <section className="min-h-screen bg-background-950 px-4 pt-28 pb-16">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-text-400 hover:text-accent-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao painel
          </Link>

          <p className="font-mono text-sm text-accent-500">/admin/content</p>
          <h1 className="font-heading text-3xl text-text-50">Gestao de Conteudo</h1>
          <p className="text-text-400">
            Selecione um item para editar e use o formulario para criar novos registros.
          </p>
        </header>

        <Card className="glass border-border">
          <CardHeader className="space-y-4">
            <CardTitle className="font-heading text-text-50">Recurso</CardTitle>
            <Tabs value={resource} onValueChange={(value) => setResource(value as Resource)}>
              <TabsList className="h-auto w-full flex-wrap bg-background-900 border border-border">
                {resources.map((entry) => (
                  <TabsTrigger key={entry.value} value={entry.value}>
                    {entry.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl text-text-50">Itens existentes ({items.length})</h2>
          <Button
            variant="outline"
            className="border-border text-text-50 hover:bg-background-800"
            onClick={() => loadItems()}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Atualizar
          </Button>
        </div>

        {error ? (
          <Card className="border-red-500/40 bg-red-500/5">
            <CardContent className="py-4 text-sm text-red-300">{error}</CardContent>
          </Card>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="glass border-border lg:col-span-4">
            <CardHeader>
              <CardTitle className="font-heading text-text-50">Lista de {title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <p className="text-sm text-text-400">Carregando itens...</p>
              ) : null}

              {!loading && items.length === 0 ? (
                <p className="text-sm text-text-400">Nenhum item encontrado para este recurso.</p>
              ) : null}

              {items.map((item) => {
                const isSelected = selectedId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-left transition-colors",
                      isSelected
                        ? "border-accent-500 bg-accent-500/10"
                        : "border-border bg-background-900 hover:border-accent-500/40"
                    )}
                  >
                    <p className="text-xs text-text-400">ID {item.id}</p>
                    <p className="text-sm font-medium text-text-50 line-clamp-1">
                      {getItemTitle(resource, item)}
                    </p>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <div className="space-y-4 lg:col-span-8">
            <Card className="glass border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-text-50">
                  {selectedItem ? `Editar item #${selectedItem.id}` : "Selecione um item para editar"}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleUpdate}
                    disabled={!selectedItem || busyId === selectedId}
                    className="bg-primary-400 text-background-950 hover:bg-primary-300"
                  >
                    {busyId === selectedId ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Salvar
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={!selectedItem || busyId === selectedId}
                    variant="outline"
                    className="border-red-500/50 text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {fieldsByResource[resource].map((field) => (
                  <div
                    key={`edit-${field.key}`}
                    className={cn("space-y-2", field.type === "textarea" ? "md:col-span-2" : "")}
                  >
                    <label className="text-sm text-text-300">{field.label}</label>
                    {renderField(field, selectedForm[field.key] || "", (nextValue) =>
                      setSelectedForm((previous) => ({ ...previous, [field.key]: nextValue }))
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-text-50">Adicionar novo item</CardTitle>
                <Button
                  onClick={handleCreate}
                  disabled={isCreating}
                  className="bg-accent-500 text-background-950 hover:bg-accent-400"
                >
                  {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Criar
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {fieldsByResource[resource].map((field) => (
                  <div
                    key={`create-${field.key}`}
                    className={cn("space-y-2", field.type === "textarea" ? "md:col-span-2" : "")}
                  >
                    <label className="text-sm text-text-300">{field.label}</label>
                    {renderField(field, createForm[field.key] || "", (nextValue) =>
                      setCreateForm((previous) => ({ ...previous, [field.key]: nextValue }))
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
