# Modelo de site — psicanalista (modelo-psico-4)

> ⚠️ **Este repositório deve permanecer PRIVADO.** É um modelo de apresentação para prospectos; não altere a visibilidade para pública.

Todos os dados abaixo são **ilustrativos** e devem ser trocados ao personalizar para um prospecto:

| O quê | Onde |
| --- | --- |
| Nome da profissional (`THERAPIST_NAME`) e títulos/meta tags | `src/routes/index.tsx`, `src/routes/__root.tsx` |
| Endereço do site (`SITE_URL`, usado nas prévias de link) | `src/routes/index.tsx` |
| WhatsApp que recebe a triagem (`THERAPIST_WHATSAPP`) | `src/components/screening-modal.tsx` |
| Instagram e LinkedIn | rodapé em `src/routes/index.tsx` |
| Fotos (“Sobre mim” e imagem de compartilhamento 1200×630) | `src/assets/therapist.jpg`, `public/og-image.jpg` |

A anamnese completa é um app separado e não faz parte deste modelo.

---

# Sereno Spazio Web

Crie uma Landing Page institucional completa, humanizada, acolhedora e de alta conversão em React, TypeScript e Tailwind CSS para uma psicoterapeuta. 

⚠️ **Nota Crítica de Otimização (Economia de Créditos):** Desenvolva todo o projeto de uma única vez, estruturando os componentes de forma limpa e funcional, sem loops de dúvidas ou refatorações desnecessárias, para preservar os créditos de IA da plataforma.

### Objetivo do Projeto

Apresentar a autoridade e o trabalho da psicoterapeuta com seções informativas impecáveis. Quando o visitante clicar em qualquer botão de CTA, abrir-se-á um **questionário dinâmico (triagem rápida)**. Somente após o cliente preencher e finalizar o teste, os dados serão formatados e enviados via redirecionamento para o WhatsApp da profissional.

---

### Requisitos de Identidade Visual e Experiência

- **Paleta de Cores:** Tons terrosos suaves, verde sálvia, off-white e detalhes em dourado fosco. Transmite paz, segurança e profissionalismo.

- **Tipografia:** Limpa e elegante.

- **Responsividade:** Totalmente otimizada para dispositivos móveis.

---

### Estrutura da Landing Page

1. **Header / Navegação:**

   - Logotipo ou Nome da Profissional e links de navegação suave (Início, Sobre, Como Funciona, Especialidades, FAQ).

   - Botão de destaque: "Iniciar Atendimento".

2. **Hero Section (Primeira Dobra com Vídeo & Parallax):**

   - Título principal forte e acolhedor (ex: *"Um espaço seguro para você reencontrar seu equilíbrio emocional"*).

   - Subtítulo humanizado.

   - **CTA Principal:** Botão *"Agendar Sessão / Conversar no WhatsApp"* (dispara o fluxo de triagem).

   - **Vídeo em Destaque:** Um elemento visual integrado com efeito de **parallax suave** ao rolar a página, contendo um vídeo com duração de 15 segundos em **loop infinito** (`autoPlay loop muted playsInline`), complementado por um overlay translúcido elegante para garantir a perfeita legibilidade do texto da Hero.

3. **Seção "Sobre Mim":**

   - Biografia destacando a abordagem terapêutica, CRP e propósito.

4. **Seção "Como a Terapia Pode Te Ajudar" (Especialidades):**

   - Cards limpos abordando ansiedade, autoconhecimento, relacionamentos, estresse, etc.

5. **Seção "Como Funciona o Processo":**

   - Passo a passo visual em 3 etapas (Preenchimento da triagem -> Direcionamento humanizado no WhatsApp -> Início das sessões).

6. **Seção FAQ (Perguntas Frequentes):**

   - Acordeões com dúvidas comuns sobre as sessões online/presenciais.

7. **Footer / Rodapé:**

   - CRP, redes sociais e avisos legais.

---

### A Mecânica do Formulário Integrado ao WhatsApp

Ao clicar em qualquer botão de CTA da página, abre-se um **Modal centralizado** com o **Questionário Dinâmico (Multi-step)**:

- **Passo 1:** Nome completo e WhatsApp com DDD.

- **Passo 2:** Múltipla escolha: *"O que te traz à terapia neste momento?"*.

- **Passo 3:** Escala de bem-estar emocional nas últimas semanas.

- **Passo 4:** Pergunta condicional: *"Você já fez terapia antes?"*.

- **Passo 5 (Conclusão):** Botão **"Enviar respostas e falar com a terapeuta no WhatsApp"**.

- O botão formata as respostas e dispara o link via `https://wa.me/SEU_NUMERO_AQUI?text=...`.

### Configuração Facilitada

- Inclua uma constante no topo do código (ex: `THERAPIST_WHATSAPP = "55..."`) para fácil alteração do número.

- Utilize ícones minimalistas (`lucide-react`).

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
