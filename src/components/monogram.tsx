import logoMonograma from "@/assets/logo-monograma.png";
import { cn } from "@/lib/utils";

// Monograma "MA" usado como máscara: a cor vem de `bg-*` (padrão: bg-primary), seguindo o tema.
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-primary", className)}
      style={{
        maskImage: `url(${logoMonograma})`,
        WebkitMaskImage: `url(${logoMonograma})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
