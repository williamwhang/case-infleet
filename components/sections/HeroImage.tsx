/* ─────────────────────────────────────────────────
   Secção 2 — Imagem full-bleed
   Foto da silhueta com o produto no monitor
───────────────────────────────────────────────── */

import Image from "next/image";

export function HeroImage() {
  return (
    <section style={{ width: "100%", lineHeight: 0, background: "#080808" }}>
      <Image
        src="/images/hero-silhouette.png"
        alt="Dois utilizadores a rever identificações de motoristas na plataforma Infleet"
        width={1600}
        height={900}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority
        unoptimized
      />
    </section>
  );
}
