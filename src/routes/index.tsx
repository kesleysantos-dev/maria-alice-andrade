import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Brain,
  CalendarHeart,
  ClipboardList,
  Heart,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Monogram } from "@/components/monogram";
import { ScreeningModal } from "@/components/screening-modal";
import heroPoster from "@/assets/hero-poster.jpg";

const heroVideoUrl = "/hero-loop.mp4";
import therapistPhoto from "@/assets/therapist.jpg";

const THERAPIST_NAME = "Maria Alice Andrade";
const THERAPIST_TITLE = "Psicologia e Psicanálise Clínica";
const THERAPIST_CRP = "08/03550";
const THERAPIST_EMAIL = "m.alice.andrade@hotmail.com";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Santos+Dumont,+3472,+Maring%C3%A1+-+PR,+87013-050";
// Trocar pelo domínio do prospecto (ou pela URL da Vercel) — usado nas prévias de link.
const SITE_URL = "https://modelo-psico-4.vercel.app/";
// Recorte 1200x630 da foto de "Sobre mim" (public/og-image.jpg) usado nas prévias de link.
const OG_IMAGE_URL = `${SITE_URL}og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maria Alice Andrade · Psicologia e Psicanálise Clínica | Atendimento online e presencial" },
      {
        name: "description",
        content:
          "Atendimento psicanalítico acolhedor para ansiedade, autoconhecimento e relacionamentos. Faça a triagem rápida e converse com a terapeuta no WhatsApp.",
      },
      {
        property: "og:title",
        content: "Maria Alice Andrade · Psicologia e Psicanálise Clínica",
      },
      {
        property: "og:description",
        content:
          "Um espaço seguro para reencontrar seu equilíbrio emocional. Terapia online e presencial, com escuta humanizada.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Maria Alice Andrade · Psicologia e Psicanálise Clínica" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:secure_url", content: OG_IMAGE_URL },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Maria Alice Andrade · Psicologia e Psicanálise Clínica" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Como funciona", href: "#processo" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "FAQ", href: "#faq" },
];

const SPECIALTIES = [
  {
    icon: Brain,
    title: "Ansiedade e pensamentos acelerados",
    text: "Ferramentas para desacelerar a mente, lidar com crises e recuperar a sensação de controle no dia a dia.",
  },
  {
    icon: Sparkles,
    title: "Autoconhecimento e propósito",
    text: "Compreender padrões, histórias e escolhas para viver com mais coerência entre o que você sente e o que faz.",
  },
  {
    icon: Users,
    title: "Relacionamentos e vínculos",
    text: "Limites saudáveis, comunicação afetiva e reparação de vínculos familiares, amorosos e profissionais.",
  },
  {
    icon: Leaf,
    title: "Estresse e esgotamento",
    text: "Cuidado para quem vive no automático: burnout, sobrecarga e a culpa de parar para respirar.",
  },
  {
    icon: Moon,
    title: "Tristeza, luto e mudanças",
    text: "Acompanhamento sensível em perdas, transições de vida e períodos de desânimo prolongado.",
  },
  {
    icon: Heart,
    title: "Autoestima e autocrítica",
    text: "Amaciar a voz interna dura e construir uma relação mais gentil e confiante com você mesmo.",
  },
];

const STEPS = [
  {
    icon: ClipboardList,
    title: "1. Triagem rápida",
    text: "Você responde a algumas perguntas em menos de um minuto sobre o que está sentindo neste momento.",
  },
  {
    icon: MessageCircle,
    title: "2. Direcionamento humanizado",
    text: "Suas respostas chegam organizadas no WhatsApp e você recebe um retorno pessoal, sem robôs ou formulários frios.",
  },
  {
    icon: CalendarHeart,
    title: "3. Início das sessões",
    text: "Agendamos o primeiro encontro, online ou presencial, no horário que caiba na sua rotina.",
  },
];

const FAQ = [
  {
    q: "As sessões são online ou presenciais?",
    a: "Você pode escolher. O atendimento presencial acontece no consultório em Maringá, e o online é feito por videochamada em plataforma segura, com a mesma escuta atenta e profundidade. Para as sessões online, você só precisa de um lugar reservado e uma boa conexão de internet.",
  },
  {
    q: "Quanto tempo dura cada sessão e qual a frequência?",
    a: "Cada encontro tem duração de até 50 minutos. A frequência inicial costuma ser semanal, o que ajuda a criar continuidade no processo. Depois, ajustamos juntos conforme o seu momento.",
  },
  {
    q: "Tudo o que eu falar é confidencial?",
    a: "Sim. O sigilo é um princípio ético fundamental do trabalho psicanalítico, com as raras exceções previstas em lei para proteção da vida.",
  },
  {
    q: "Nunca fiz terapia. Como é a primeira sessão?",
    a: "A primeira sessão é uma conversa sem cobranças: você conta o que quiser, no seu ritmo, e eu explico como trabalho. Não é preciso preparar nada nem saber explicar o que está sentindo.",
  },
  {
    q: "Qual é a abordagem utilizada?",
    a: "Trabalho a partir da Psicanálise, que busca compreender o que os sintomas dizem sobre a sua história, num espaço de escuta livre e acolhedora, no seu ritmo.",
  },
  {
    q: "Como funcionam valores e pagamento?",
    a: "Os valores são informados no primeiro contato pelo WhatsApp, com possibilidade de horários sociais em vagas limitadas. O pagamento é feito exclusivamente por Pix, mediante envio do comprovante.",
  },
  {
    q: "O que acontece se eu não comparecer à consulta?",
    a: "Como trabalhamos com horários exclusivos e individuais, as faltas ou cancelamentos em cima da hora não dão direito a reembolso ou reposição, sendo cobrados de forma habitual.",
  },
];

function Index() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        el.style.transform = `translate3d(0, ${window.scrollY * 0.28}px, 0) scale(1.15)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    root.classList.add("reveal-on");
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-on");
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = Math.max(window.scrollY, 0);
        const delta = y - lastY;
        if (Math.abs(delta) < 6) return;
        setHeaderHidden(delta > 0 && y > 80);
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const startScreening = () => {
    setMenuOpen(false);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <ScreeningModal open={open} onOpenChange={setOpen} />

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none ${
          headerHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <Monogram className="h-9 w-9" />
            <span className="flex flex-col">
              <span className="font-display text-xl leading-none">{THERAPIST_NAME}</span>
              <span className="mt-1.5 text-[0.625rem] uppercase leading-none tracking-[0.2em] text-muted-foreground">
                {THERAPIST_TITLE}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={startScreening} className="hidden rounded-full sm:inline-flex">
              Iniciar atendimento
            </Button>
            <button
              type="button"
              aria-label="Abrir menu"
              className="rounded-full p-2 text-foreground md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-background px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-muted-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Button onClick={startScreening} className="mt-2 rounded-full">
                Iniciar atendimento
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="inicio"
          className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
        >
          <div ref={videoRef} className="absolute inset-0 will-change-transform">
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster={heroPoster}
            >
              <source src={heroVideoUrl} type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-plum-deep/45" aria-hidden />
          <div
            className="absolute inset-x-0 -bottom-px h-48"
            style={{
              backgroundImage:
                "linear-gradient(to top, var(--calm-top) 0%, var(--calm-top) 12%, transparent 100%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-6xl px-5 py-20">
            <div className="max-w-4xl">
              <p className="eyebrow text-background/80">
                Psicóloga e psicanalista clínica
                <br />
                Atendimento online e presencial
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.1] text-background sm:text-6xl">
                Um espaço para dar lugar à sua palavra e compreender aquilo que se repete na sua
                vida e te faz sofrer.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-background/85 sm:text-lg">
                Atendimento humanizado e focado no seu bem-estar. Um espaço acolhedor para você
                superar a ansiedade, organizar seus pensamentos e retomar a orientação da sua vida.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  onClick={startScreening}
                  className="gap-2 rounded-full px-7 py-6 text-base shadow-lift"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  Agendar sessão · Conversar no WhatsApp
                </Button>
                <span className="text-sm text-background/75">Triagem gratuita de 1 minuto</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="sobre"
          className="surface-calm relative -mt-3 overflow-x-clip pb-24 pt-[calc(6rem+0.75rem)]"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
            <div data-reveal className="relative">
              <img
                src={therapistPhoto}
                alt={`${THERAPIST_NAME}, psicóloga e psicanalista clínica, sentada em uma poltrona`}
                loading="lazy"
                width={901}
                height={1352}
                className="w-full rounded-[2rem] object-cover shadow-lift"
              />
              <div className="absolute -bottom-8 right-4 flex items-center gap-4 rounded-2xl border border-gold/50 bg-card/95 py-4 pl-5 pr-6 shadow-soft backdrop-blur-sm sm:right-6">
                <Monogram className="h-10 w-10 bg-gold" />
                <span className="h-12 w-px bg-gold/50" aria-hidden />
                <span className="flex flex-col">
                  <span className="text-xs uppercase leading-none tracking-[0.2em] text-muted-foreground">
                    Psicóloga · CRP
                  </span>
                  <span className="mt-2 font-display text-[1.75rem] font-semibold leading-none text-primary lining-nums">
                    {THERAPIST_CRP}
                  </span>
                </span>
              </div>
            </div>

            <div data-reveal="right">
              <p className="eyebrow gold-rule">Sobre mim</p>
              <h2 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
                Acredito que ninguém precisa atravessar tudo sozinho
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Sou {THERAPIST_NAME}, psicóloga e psicanalista clínica, dedicada a acompanhar pessoas
                  no processo de autoconhecimento e elaboração do sofrimento psíquico.
                </p>
                <p>
                  A Psicanálise não busca apenas aliviar o sintoma, mas compreender o que ele diz
                  sobre a sua história. Em consultório, crio uma atmosfera de acolhimento onde você
                  pode falar abertamente sobre o que incomoda, descobrindo novos caminhos e formas
                  mais autênticas de lidar com a própria vida.
                </p>
                <p>
                  Áreas de acompanhamento: Angústia, ansiedade, sobrecarga mental, questões de
                  autoimagem e fases de mudança.
                </p>
                <p>📍Atendimento online e presencial.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { value: "100%", label: "Dedicação ao paciente" },
                  { value: "100+", label: "sessões conduzidas" },
                  { value: "100%", label: "sigilo profissional" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="especialidades" className="py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div data-reveal className="max-w-2xl">
              <p className="eyebrow gold-rule">Especialidades</p>
              <h2 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
                Como a terapia pode te ajudar
              </h2>
              <p className="mt-4 text-muted-foreground">
                Não é preciso estar em crise para buscar ajuda. Esses são alguns dos temas que
                trabalhamos com frequência nas sessões.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SPECIALTIES.map(({ icon: Icon, title, text }, i) => (
                <article
                  key={title}
                  data-reveal
                  style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                  className="rounded-3xl border border-border bg-card p-7 transition-shadow hover:shadow-soft"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="surface-calm py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div data-reveal className="max-w-2xl">
              <p className="eyebrow gold-rule">Como funciona</p>
              <h2 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
                Três passos simples até a sua primeira sessão
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <div
                  key={title}
                  data-reveal
                  style={{ transitionDelay: `${i * 90}ms` }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-soft"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                size="lg"
                onClick={startScreening}
                className="gap-2 rounded-full px-8 py-6 text-base"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Iniciar minha triagem
              </Button>
            </div>
          </div>
        </section>

        <section id="faq" className="py-24">
          <div
            data-reveal
            className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <p className="eyebrow gold-rule">Perguntas frequentes</p>
              <h2 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
                Dúvidas comuns antes de começar
              </h2>
              <p className="mt-4 text-muted-foreground">
                Se a sua pergunta não estiver aqui, é só me chamar depois da triagem.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-display text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="px-5 pb-24">
          <div
            data-reveal
            className="mx-auto max-w-6xl rounded-[2.5rem] bg-plum-deep px-8 py-16 text-center text-background"
          >
            <Monogram className="mx-auto block h-14 w-14 bg-gold" />
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl leading-tight text-background sm:text-4xl">
              O primeiro passo pode ser hoje, e ele é bem menor do que parece
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-background/80">
              Responda a triagem e receba um retorno humano, sem compromisso.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={startScreening}
              className="mt-9 gap-2 rounded-full px-8 py-6 text-base"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Agendar minha sessão
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-muted/40 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <Monogram className="h-9 w-9" />
                <span className="flex flex-col">
                  <span className="font-display text-xl leading-none">{THERAPIST_NAME}</span>
                  <span className="mt-1.5 text-[0.625rem] uppercase leading-none tracking-[0.2em] text-muted-foreground">
                    {THERAPIST_TITLE}
                  </span>
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Atendimento presencial em Maringá e online para todo o Brasil.
              </p>
              <address className="mt-5 space-y-3 text-sm not-italic text-muted-foreground">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 transition-colors hover:text-primary"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    Rua Santos Dumont, 3472 · Sala 302 · 3º andar
                    <br />
                    Bandeirantes · 87013-050 · Maringá – PR
                  </span>
                </a>
                <a
                  href={`mailto:${THERAPIST_EMAIL}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {THERAPIST_EMAIL}
                </a>
              </address>
              <div className="mt-5 flex gap-3">
                <a
                  href="https://instagram.com/mariaaliceandrade.psi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
                >
                  <Instagram className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="https://linkedin.com/in/mariaaliceandrade-psi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Navegação</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="hover:text-primary">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="max-w-xs">
                <p className="text-sm font-medium">Aviso importante</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Este site não presta atendimento de emergência. Em situações de risco, ligue para
                  o CVV no 188 (24h) ou procure o serviço de saúde mais próximo.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <p>
              © {new Date().getFullYear()} {THERAPIST_NAME}. Todos os direitos reservados.
            </p>
            <p>
              Conteúdo informativo, sem substituir avaliação clínica individual · Sigilo conforme a
              ética da Psicanálise.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
