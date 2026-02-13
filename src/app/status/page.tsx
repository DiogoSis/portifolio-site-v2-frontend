"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  Database,
  GitBranch,
  Music,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface APIStatus {
  online: boolean;
  latency?: number;
  lastCheck: Date;
}

interface GitHubCommit {
  message: string;
  repo: string;
  timestamp: string;
  url: string;
  author: string;
}

interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt?: string;
  isPlaying: boolean;
}

export default function StatusPage() {
  const [apiStatus, setApiStatus] = useState<APIStatus | null>(null);
  const [lastCommit, setLastCommit] = useState<GitHubCommit | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados - substituir por chamadas reais de API
    const fetchData = async () => {
      setLoading(true);

      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      setApiStatus({
        online: true,
        latency: 45,
        lastCheck: new Date(),
      });

      setLastCommit({
        message: "feat: implementar dashboard de status real-time",
        repo: "portfolio-v2-frontend",
        timestamp: "2 horas atrás",
        url: "https://github.com/diogoluna/portfolio-v2",
        author: "Diogo Luna",
      });

      setCurrentTrack({
        name: "Coding in the Zone",
        artist: "Lo-Fi Beats",
        isPlaying: true,
        albumArt: "https://via.placeholder.com/100",
      });

      setLoading(false);
    };

    fetchData();

    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-accent-500" />
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-50">
              Status Lab
            </h1>
          </div>
          <p className="text-text-400 text-lg max-w-2xl">
            Dashboard em tempo real. Monitoramento de serviços, última atividade
            no GitHub e o que estou ouvindo no momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* API Status Card */}
          <Card className="bg-background-900 border-background-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-text-50">
                <Database className="w-5 h-5 text-accent-500" />
                API Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {apiStatus?.online ? (
                      <>
                        <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse-glow" />
                        <Badge className="bg-accent-500/20 text-accent-500 border-accent-500/30">
                          Online
                        </Badge>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <Badge variant="destructive">Offline</Badge>
                      </>
                    )}
                  </div>

                  {apiStatus?.online && (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-text-400">
                        <span className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          Latência
                        </span>
                        <span className="font-mono text-accent-500">
                          {apiStatus.latency}ms
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-text-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Última verificação
                        </span>
                        <span className="text-text-300">
                          {apiStatus.lastCheck.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* GitHub Activity Card */}
          <Card className="bg-background-900 border-background-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-text-50">
                <GitBranch className="w-5 h-5 text-primary-400" />
                Último Commit
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ) : lastCommit ? (
                <div className="space-y-3">
                  <p className="text-text-50 font-medium leading-relaxed">
                    {lastCommit.message}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-text-400">
                      <span className="font-mono text-primary-400">
                        {lastCommit.repo}
                      </span>
                    </p>
                    <p className="text-xs text-text-500">
                      {lastCommit.author} • {lastCommit.timestamp}
                    </p>
                  </div>
                  <a
                    href={lastCommit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-accent-500 hover:text-accent-400 transition-colors"
                  >
                    Ver no GitHub →
                  </a>
                </div>
              ) : (
                <p className="text-text-400">Nenhuma atividade recente</p>
              )}
            </CardContent>
          </Card>

          {/* Spotify Now Playing Card */}
          <Card className="bg-background-900 border-background-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-text-50">
                <Music className="w-5 h-5 text-green-500" />
                Spotify
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-16 rounded" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ) : currentTrack?.isPlaying ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {currentTrack.albumArt && (
                      <div className="relative">
                        <img
                          src={currentTrack.albumArt}
                          alt="Album art"
                          className="w-16 h-16 rounded"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background-900 animate-pulse" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-text-50 font-medium truncate">
                        {currentTrack.name}
                      </p>
                      <p className="text-sm text-text-400 truncate">
                        {currentTrack.artist}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    Tocando agora
                  </Badge>
                </div>
              ) : (
                <div className="text-text-400 text-center py-4">
                  <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nada tocando no momento</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Health Card */}
          <Card className="bg-background-900 border-background-700 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-text-50">
                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-500" />
                    <div>
                      <p className="text-sm font-medium text-text-50">
                        Frontend
                      </p>
                      <p className="text-xs text-text-400">Vercel</p>
                    </div>
                  </div>
                  <Badge className="bg-accent-500/20 text-accent-500 border-accent-500/30">
                    Operational
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-500" />
                    <div>
                      <p className="text-sm font-medium text-text-50">
                        Backend API
                      </p>
                      <p className="text-xs text-text-400">Railway</p>
                    </div>
                  </div>
                  <Badge className="bg-accent-500/20 text-accent-500 border-accent-500/30">
                    Operational
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-500" />
                    <div>
                      <p className="text-sm font-medium text-text-50">
                        Database
                      </p>
                      <p className="text-xs text-text-400">PostgreSQL</p>
                    </div>
                  </div>
                  <Badge className="bg-accent-500/20 text-accent-500 border-accent-500/30">
                    Operational
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 rounded-lg border border-background-700 bg-background-900/50">
          <div className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-primary-400 mt-0.5" />
            <div>
              <p className="text-sm text-text-300 leading-relaxed">
                Este dashboard é atualizado automaticamente a cada 30 segundos.
                Os dados são simulados para demonstração - a integração real
                com GitHub API, Spotify API e métricas de servidor será
                implementada na fase 2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
