"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MANDATO, BAIRROS, ASSUNTOS } from "@/lib/conteudo";
import { enviarContato, ErroDeEnvio, type Assunto } from "@/lib/enviar-formulario";

type Estado = "parado" | "enviando" | "ok" | "erro";

const VAZIO = {
  nome: "",
  email: "",
  telefone: "",
  bairro: "",
  assunto: "",
  mensagem: "",
  lgpd: false,
};

export function ContatoSection() {
  const [dados, setDados] = React.useState(VAZIO);
  const [estado, setEstado] = React.useState<Estado>("parado");
  const [erro, setErro] = React.useState("");

  function alterar<C extends keyof typeof VAZIO>(campo: C, valor: (typeof VAZIO)[C]) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setEstado("enviando");
    setErro("");

    try {
      await enviarContato({ ...dados, assunto: dados.assunto as Assunto });
      setEstado("ok");
      setDados(VAZIO);
    } catch (e) {
      setEstado("erro");
      setErro(
        e instanceof ErroDeEnvio ? e.message : "Não conseguimos enviar sua mensagem. Tente novamente."
      );
    }
  }

  return (
    <section id="contato" className="bg-muted/30 py-16 md:py-24" aria-labelledby="contato-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <Badge className="mb-3">Participe</Badge>
          <h2 id="contato-titulo" className="font-heading text-3xl font-bold md:text-4xl">
            Fale com o Mandato
          </h2>
          <p className="mt-3 text-muted-foreground">
            Sua voz importa. Envie sugestões, demandas do seu bairro ou convites de agenda.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                {estado === "ok" ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-bold">Mensagem enviada!</h3>
                    <p className="text-muted-foreground">A equipe do gabinete retornará em breve.</p>
                    <Button className="mt-6" variant="outline" onClick={() => setEstado("parado")}>
                      Enviar outra mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={enviar} className="space-y-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nome">
                          Nome completo <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="nome"
                          name="nome"
                          required
                          autoComplete="name"
                          value={dados.nome}
                          onChange={(e) => alterar("nome", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          E-mail <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={dados.email}
                          onChange={(e) => alterar("email", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          type="tel"
                          autoComplete="tel"
                          value={dados.telefone}
                          onChange={(e) => alterar("telefone", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Select value={dados.bairro} onValueChange={(v) => alterar("bairro", v)}>
                          <SelectTrigger id="bairro">
                            <SelectValue placeholder="Selecione seu bairro" />
                          </SelectTrigger>
                          <SelectContent>
                            {BAIRROS.map((b) => (
                              <SelectItem key={b} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assunto">
                        Assunto <span className="text-destructive">*</span>
                      </Label>
                      <Select value={dados.assunto} onValueChange={(v) => alterar("assunto", v)}>
                        <SelectTrigger id="assunto">
                          <SelectValue placeholder="Selecione o assunto" />
                        </SelectTrigger>
                        <SelectContent>
                          {ASSUNTOS.map((a) => (
                            <SelectItem key={a} value={a}>
                              {a}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">
                        Mensagem <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        rows={5}
                        required
                        placeholder="Descreva sua sugestão, demanda ou convite..."
                        value={dados.mensagem}
                        onChange={(e) => alterar("mensagem", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Evite incluir dados de saúde ou outras informações pessoais sensíveis.
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="lgpd"
                        checked={dados.lgpd}
                        onCheckedChange={(v) => alterar("lgpd", v === true)}
                      />
                      <Label htmlFor="lgpd" className="text-sm font-normal leading-relaxed">
                        Autorizo o tratamento dos meus dados para retorno deste contato, conforme a{" "}
                        <Link href="/privacidade" className="text-primary underline-offset-4 hover:underline">
                          Política de Privacidade
                        </Link>
                        .
                      </Label>
                    </div>

                    {erro && (
                      <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {erro}
                      </p>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={estado === "enviando" || !dados.lgpd}>
                      {estado === "enviando" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={100} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Badge className="mb-4">{MANDATO.gabinete}</Badge>

                <ul className="space-y-5 text-sm">
                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-medium">Endereço</strong>
                      <span className="text-muted-foreground">
                        {MANDATO.endereco.local}
                        <br />
                        {MANDATO.endereco.rua}
                        <br />
                        {MANDATO.endereco.bairro}
                        <br />
                        {MANDATO.endereco.cep}
                      </span>
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                      <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-medium">Telefone</strong>
                      <a href="tel:+555532207220" className="text-muted-foreground hover:text-primary">
                        {MANDATO.telefone}
                      </a>
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/30">
                      <Mail className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <strong className="block font-medium">E-mail</strong>
                      <a
                        href={`mailto:${MANDATO.email}`}
                        className="break-all text-muted-foreground hover:text-primary"
                      >
                        {MANDATO.email}
                      </a>
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </span>
                    <span>
                      <strong className="block font-medium">Horário de Atendimento</strong>
                      <span className="text-muted-foreground">
                        {MANDATO.atendimento.map((linha) => (
                          <span key={linha} className="block">
                            {linha}
                          </span>
                        ))}
                      </span>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Dados pessoais tratados para fins de atendimento conforme a LGPD.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
