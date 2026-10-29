import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/** Número de WhatsApp da profissional (formato internacional, apenas dígitos). */
export const THERAPIST_WHATSAPP = "554498192283";

const MODALITIES = [
  { value: "Online", description: "Por videochamada, de onde você estiver", icon: Video },
  { value: "Presencial", description: "No consultório em Maringá", icon: MapPin },
];

type Step = { title: string; description: string };

const STEPS: [Step, ...Step[]] = [
  {
    title: "Vamos dar o primeiro passo",
    description: "Preencha seus dados para continuar.",
  },
  {
    title: "Como prefere ser atendido(a)?",
    description: "Escolha a modalidade de atendimento.",
  },
  {
    title: "Conte um pouco sobre você",
    description: "Ao enviar, você será direcionado ao WhatsApp para conversarmos.",
  },
];

type Answers = {
  name: string;
  phone: string;
  modality: string;
  reason: string;
};

const emptyAnswers: Answers = {
  name: "",
  phone: "",
  modality: "",
  reason: "",
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ScreeningModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const digits = answers.phone.replace(/\D/g, "");
  const canAdvance =
    step === 1
      ? answers.name.trim().length > 2 && digits.length >= 10
      : step === 2
        ? answers.modality !== ""
        : answers.reason.trim().length > 0;

  const reset = () => {
    setStep(1);
    setAnswers(emptyAnswers);
  };

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);
    if (!value) setTimeout(reset, 250);
  };

  const sendToWhatsApp = () => {
    const message = [
      "Olá! Gostaria de agendar um atendimento.",
      "",
      `*Nome:* ${answers.name.trim()}`,
      `*Telefone:* ${answers.phone}`,
      `*Atendimento:* ${answers.modality}`,
      "",
      "*O que me trouxe até aqui:*",
      answers.reason.trim(),
    ].join("\n");

    // Sem emojis: o redirecionamento do WhatsApp corrompe alguns deles em certos aparelhos ("?").
    window.open(
      `https://api.whatsapp.com/send?phone=${THERAPIST_WHATSAPP}&text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    handleOpenChange(false);
  };

  const current = STEPS[step - 1] ?? STEPS[0];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-border bg-card p-6 sm:max-w-lg sm:p-8">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex items-center justify-between gap-3 pr-8 text-primary">
            <span className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5" aria-hidden />
              <span className="eyebrow">Agendar atendimento</span>
            </span>
            <span className="text-xs text-muted-foreground">
              Passo {step} de {STEPS.length}
            </span>
          </div>
          <div className="flex gap-1.5" aria-hidden>
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i < step ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
          <DialogTitle className="font-display text-2xl leading-snug">{current.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {current.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 space-y-5">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={answers.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Como você gosta de ser chamado(a)"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (WhatsApp) com DDD</Label>
                <Input
                  id="phone"
                  inputMode="tel"
                  value={answers.phone}
                  onChange={(e) => set("phone", formatPhone(e.target.value))}
                  placeholder="(44) 99999-9999"
                  autoComplete="tel"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="grid gap-3" role="radiogroup" aria-label="Modalidade de atendimento">
              {MODALITIES.map(({ value, description, icon: Icon }) => {
                const active = answers.modality === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => set("modality", value)}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors",
                      active
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-background hover:bg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        active ? "bg-primary text-primary-foreground" : "bg-muted text-primary",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium">{value}</span>
                      <span className="block text-sm text-muted-foreground">{description}</span>
                    </span>
                    {active && <Check className="h-4 w-4 shrink-0" aria-hidden />}
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <Label htmlFor="reason" className="leading-snug">
                Gostaria que me contasse brevemente o que te trouxe até aqui.
              </Label>
              <Textarea
                id="reason"
                value={answers.reason}
                onChange={(e) => set("reason", e.target.value)}
                rows={5}
                maxLength={800}
                placeholder="Escreva com suas palavras, no seu tempo."
                className="resize-none"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 1 ? (
            <Button variant="ghost" className="gap-2" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Voltar
            </Button>
          ) : (
            <span />
          )}

          {step < STEPS.length ? (
            <Button className="gap-2" disabled={!canAdvance} onClick={() => setStep(step + 1)}>
              Seguir
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          ) : (
            <Button className="gap-2" disabled={!canAdvance} onClick={sendToWhatsApp}>
              <MessageCircle className="h-4 w-4" aria-hidden />
              Enviar e falar no WhatsApp
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
