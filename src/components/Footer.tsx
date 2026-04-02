export default function Footer() {
  return (
    <footer className="w-full bg-light-gray/10 border-t border-charcoal/5">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left: branding */}
          <div>
            <p
              className="text-sm font-semibold tracking-wide text-charcoal"
              style={{
                fontFamily: "var(--font-serif), 'Playfair Display', serif",
              }}
            >
              NOH PLASTIC SURGERY
            </p>
            <p className="mt-1 text-xs text-charcoal/40">
              서울미즈병원 노승형과장 · 성형외과 전문의
            </p>
          </div>

          {/* Center: info */}
          <div className="flex flex-col gap-1 text-xs text-charcoal/40 md:text-center">
            <p>02-470-9114</p>
            <p>서울 강동구 천호대로 1041</p>
            <p>평일 10:00-19:00 / 토 10:00-16:00</p>
          </div>

          {/* Right: YouTube */}
          <div>
            <a
              href="https://www.youtube.com/@nodak"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-charcoal/40 transition-colors hover:text-gold"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.75 15.57V8.43L15.75 12l-6 3.57Z" />
              </svg>
              노닥!nodak!
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal/5">
        <div className="mx-auto max-w-6xl px-6 py-5 lg:px-12">
          <p className="text-center text-[11px] text-charcoal/25">
            &copy; 2024 서울미즈병원 성형외과. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
