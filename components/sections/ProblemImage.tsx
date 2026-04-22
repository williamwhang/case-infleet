import Image from "next/image";

export function ProblemImage() {
  return (
    <section className="pb-20">
      <div
        className="relative w-full rounded-card overflow-hidden bg-surface flex items-center justify-center"
        style={{ border: "0.5px solid #e8e8e6", minHeight: 280 }}
      >
        {/* Real image (swap in when available) */}
        <Image
          src="/images/mapa-problema.png"
          alt="Mapa de monitoramento — motorista aparece como não identificado"
          width={680}
          height={400}
          className="w-full h-auto rounded-card"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='680' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23f8f8f6'/%3E%3C/svg%3E"
        />
        {/* Placeholder overlay shown when image is missing */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-surface"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          <div
            className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
            style={{ background: "#e8e8e6" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="16" height="16" rx="2" stroke="#6b6b6b" strokeWidth="1.5"/>
              <circle cx="7" cy="7" r="1.5" fill="#6b6b6b"/>
              <path d="M2 13l5-4 4 3 3-2 4 3" stroke="#6b6b6b" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xs text-muted">mapa-problema.png</span>
        </div>
      </div>
      <p className="text-xs text-muted mt-3 text-center">
        Mapa de monitoramento — motorista aparece como &quot;não identificado&quot;
      </p>
    </section>
  );
}
