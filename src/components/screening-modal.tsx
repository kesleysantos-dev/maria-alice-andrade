import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, HeartHandshake, MessageCircle } from "lucide-react";

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
import { cn } from "@/lib/utils";

/** Número de WhatsApp da profissional (formato internacional, apenas dígitos). */
export const THERAPIST_WHATSAPP = "5511900000000";

const SERVICES = ["Terapia Individual", "Terapia em Grupo", "Palestras/Workshops"];

type Answers = {
  name: string;
  phone: string;
  service: string;
};

const emptyAnswers: Answers = {
  name: "",
  phone: "",
  service: "",
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
  const canAdvance = answers.name.trim().length > 2 && digits.length >= 10;
  const canSubmit = answers.service !== "";

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
      `👤 *Nome:* ${answers.name.trim()}`,
      `📱 *WhatsApp:* ${answers.phone}`,
      `📌 *Serviço:* ${answers.service}`,
    ].join("\n");

    window.open(
      `https://wa.me/${THERAPIST_WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-border bg-card p-6 sm:max-w-lg sm:p-8">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex items-center gap-2 text-primary">
            <HeartHandshake className="h-5 w-5" aria-hidden />
            <span className="eyebrow">Agendar atendimento</span>
          </div>
          <DialogTitle className="font-display text-2xl leading-snug">
            {step === 1 ? "Vamos dar o primeiro passo" : "Qual serviço você procura?"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {step === 1
              ? "Preencha seus dados para continuar."
              : "Você será direcionado ao WhatsApp para conversarmos."}
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
                <Label htmlFor="phone">WhatsApp com DDD</Label>
                <Input
                  id="phone"
                  inputMode="tel"
                  value={answers.phone}
                  onChange={(e) => set("phone", formatPhone(e.target.value))}
                  placeholder="(85) 99999-9999"
                  autoComplete="tel"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="grid gap-2">
              {SERVICES.map((service) => {
                const active = answers.service === service;
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => set("service", service)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                      active
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-background hover:bg-muted",
                    )}
                  >
                    <span>{service}</span>
                    {active && <Check className="h-4 w-4 shrink-0" aria-hidden />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {step === 2 ? (
            <Button variant="ghost" className="gap-2" onClick={() => setStep(1)}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Voltar
            </Button>
          ) : (
            <span />
          )}

          {step === 1 ? (
            <Button className="gap-2" disabled={!canAdvance} onClick={() => setStep(2)}>
              Seguir
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          ) : (
            <Button className="gap-2" disabled={!canSubmit} onClick={sendToWhatsApp}>
              <MessageCircle className="h-4 w-4" aria-hidden />
              Enviar e falar no WhatsApp
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
