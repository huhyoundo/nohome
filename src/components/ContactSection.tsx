"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const procedures = [
  "원라인교정",
  "반달가슴거상",
  "눈성형",
  "코성형",
  "가슴성형",
  "안면윤곽",
  "동안성형",
  "재수술",
  "기타",
];

/* ── Floating input with animated label & underline ── */
function FloatingInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      {/* Floating label */}
      <label
        htmlFor={id}
        className="absolute left-0 text-xs font-medium tracking-wide uppercase transition-all duration-300"
        style={{
          top: isActive ? "-4px" : "12px",
          fontSize: isActive ? "10px" : "12px",
          color: focused
            ? "#c9a84c"
            : error
              ? "#d4513a"
              : "rgba(45,45,45,0.4)",
        }}
      >
        {label}
        {required && <span className="ml-0.5 text-gold">*</span>}
      </label>

      <input
        id={id}
        type={type}
        required={required}
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full border-b bg-transparent px-0 pb-2 pt-5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/20"
        style={{
          borderColor: error
            ? "#d4513a"
            : focused
              ? "#c9a84c"
              : "rgba(45,45,45,0.1)",
        }}
      />

      {/* Animated underline (center outward) */}
      <div className="relative h-[2px] w-full overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-gold transition-all duration-300"
          style={{
            width: focused ? "100%" : "0%",
          }}
        />
      </div>

      {/* Error text */}
      {error && (
        <p className="mt-1 text-[11px] text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ── Floating textarea ── */
function FloatingTextarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      {/* Floating label */}
      <label
        htmlFor={id}
        className="absolute left-0 text-xs font-medium tracking-wide uppercase transition-all duration-300"
        style={{
          top: isActive ? "-4px" : "12px",
          fontSize: isActive ? "10px" : "12px",
          color: focused
            ? "#c9a84c"
            : error
              ? "#d4513a"
              : "rgba(45,45,45,0.4)",
        }}
      >
        {label}
      </label>

      <textarea
        id={id}
        rows={rows}
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full resize-none border-b bg-transparent px-0 pb-2 pt-5 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/20"
        style={{
          borderColor: error
            ? "#d4513a"
            : focused
              ? "#c9a84c"
              : "rgba(45,45,45,0.1)",
        }}
      />

      {/* Animated underline */}
      <div className="relative h-[2px] w-full overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-gold transition-all duration-300"
          style={{
            width: focused ? "100%" : "0%",
          }}
        />
      </div>

      {error && (
        <p className="mt-1 text-[11px] text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ── Checkmark SVG animation ── */
function CheckmarkAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="mb-4"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="#c9a84c"
          strokeWidth="2"
          fill="none"
          style={{
            strokeDasharray: 188.5,
            strokeDashoffset: 0,
            animation: "drawCircle 0.6s ease-out forwards",
          }}
        />
        <path
          d="M20 33 L28 41 L44 25"
          stroke="#c9a84c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: 40,
            animation: "drawCheck 0.4s ease-out 0.4s forwards",
          }}
        />
      </svg>
      <h3 className="mb-2 text-xl font-bold text-charcoal">
        상담 신청이 완료되었습니다
      </h3>
      <p className="text-sm text-charcoal/50">
        빠른 시일 내에 연락드리겠습니다.
      </p>
      <style jsx>{`
        @keyframes drawCircle {
          from {
            stroke-dashoffset: 188.5;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes drawCheck {
          from {
            stroke-dashoffset: 40;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Contact info card with hover lift ── */
function ContactInfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm bg-white/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="mb-1 text-xs tracking-wide text-charcoal/40 uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [submitted, setSubmitted] = useState(false);

  /* Form state */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [procedure, setProcedure] = useState("");
  const [message, setMessage] = useState("");

  /* Validation errors */
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [btnHovered, setBtnHovered] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "이름을 입력해 주세요";
    const phoneClean = phone.replace(/[^0-9]/g, "");
    if (!phone.trim()) {
      next.phone = "연락처를 입력해 주세요";
    } else if (phoneClean.length < 10 || phoneClean.length > 11) {
      next.phone = "올바른 연락처를 입력해 주세요";
    }
    if (message.trim().length > 0 && message.trim().length < 5) {
      next.message = "5자 이상 입력해 주세요";
    }
    return next;
  }, [name, phone, message]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setTouched({ name: true, phone: true, message: true });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  /* Live validation on touched fields */
  const handleFieldChange = useCallback(
    (field: string, value: string, setter: (v: string) => void) => {
      setter(value);
      if (touched[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          /* Re-validate just this field */
          if (field === "name" && !value.trim()) {
            next.name = "이름을 입력해 주세요";
          } else if (field === "name") {
            delete next.name;
          }

          if (field === "phone") {
            const clean = value.replace(/[^0-9]/g, "");
            if (!value.trim()) {
              next.phone = "연락처를 입력해 주세요";
            } else if (clean.length < 10 || clean.length > 11) {
              next.phone = "올바른 연락처를 입력해 주세요";
            } else {
              delete next.phone;
            }
          }

          if (field === "message") {
            if (value.trim().length > 0 && value.trim().length < 5) {
              next.message = "5자 이상 입력해 주세요";
            } else {
              delete next.message;
            }
          }

          return next;
        });
      }
    },
    [touched],
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full bg-warm-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-16 md:flex-row md:gap-20">
          {/* Left side: branding text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full flex-col justify-center md:w-[40%]"
          >
            <h2
              className="text-6xl font-bold tracking-tight text-charcoal sm:text-7xl lg:text-8xl"
              style={{
                fontFamily: "var(--font-serif), 'Playfair Display', serif",
              }}
            >
              NOH
            </h2>
            <p
              className="mt-1 text-sm tracking-[0.2em] text-charcoal/40 uppercase"
              style={{
                fontFamily: "var(--font-serif), 'Playfair Display', serif",
              }}
            >
              Plastic Surgery
            </p>

            <p
              className="mt-10 text-lg font-bold leading-relaxed text-charcoal/50"
            >
              당신의 아름다움이
              <br />
              궁금하시다면?
            </p>
          </motion.div>

          {/* Right side: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-[60%]"
          >
            <div className="bg-white p-8 sm:p-10">
              {submitted ? (
                <CheckmarkAnimation />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* 이름 */}
                  <FloatingInput
                    id="contact-name"
                    label="이름"
                    placeholder="홍길동"
                    value={name}
                    onChange={(v) => handleFieldChange("name", v, setName)}
                    error={touched.name ? errors.name : undefined}
                    required
                  />

                  {/* 연락처 */}
                  <FloatingInput
                    id="contact-phone"
                    label="연락처"
                    type="tel"
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(v) => handleFieldChange("phone", v, setPhone)}
                    error={touched.phone ? errors.phone : undefined}
                    required
                  />

                  {/* 관심시술 */}
                  <div className="relative">
                    <label
                      htmlFor="contact-procedure"
                      className="absolute left-0 text-xs font-medium tracking-wide uppercase transition-all duration-300"
                      style={{
                        top: selectFocused || procedure ? "-4px" : "12px",
                        fontSize: selectFocused || procedure ? "10px" : "12px",
                        color: selectFocused
                          ? "#c9a84c"
                          : "rgba(45,45,45,0.4)",
                      }}
                    >
                      관심시술
                    </label>
                    <select
                      id="contact-procedure"
                      required
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      onFocus={() => setSelectFocused(true)}
                      onBlur={() => setSelectFocused(false)}
                      className="w-full border-b bg-transparent px-0 pb-2 pt-5 text-sm text-charcoal outline-none transition-colors"
                      style={{
                        borderColor: selectFocused
                          ? "#c9a84c"
                          : "rgba(45,45,45,0.1)",
                      }}
                    >
                      <option value="" disabled>
                        시술을 선택해 주세요
                      </option>
                      {procedures.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    {/* Animated underline */}
                    <div className="relative h-[2px] w-full overflow-hidden">
                      <div
                        className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-gold transition-all duration-300"
                        style={{
                          width: selectFocused ? "100%" : "0%",
                        }}
                      />
                    </div>
                  </div>

                  {/* 문의내용 */}
                  <FloatingTextarea
                    id="contact-message"
                    label="문의내용"
                    placeholder="궁금하신 점을 자유롭게 작성해 주세요"
                    value={message}
                    onChange={(v) => handleFieldChange("message", v, setMessage)}
                    error={touched.message ? errors.message : undefined}
                  />

                  {/* Submit button with sweep effect */}
                  <button
                    type="submit"
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    className="relative mt-4 w-full overflow-hidden px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-colors duration-300"
                    style={{
                      background: btnHovered
                        ? "linear-gradient(90deg, #d4b65e 0%, #c9a84c 100%)"
                        : "#c9a84c",
                    }}
                  >
                    {/* Sweep overlay */}
                    <span
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                        backgroundSize: "200% 100%",
                        animation: btnHovered
                          ? "btnSweep 0.8s ease-in-out"
                          : "none",
                        backgroundPosition: btnHovered ? undefined : "200% 0",
                      }}
                    />
                    <span className="relative z-10">상담 신청하기</span>
                    <style jsx>{`
                      @keyframes btnSweep {
                        0% {
                          background-position: 200% 0;
                        }
                        100% {
                          background-position: -200% 0;
                        }
                      }
                    `}</style>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Contact info row — hover lift cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 gap-4 border-t border-charcoal/10 pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          <ContactInfoCard title="전화">
            <p className="text-sm font-medium text-charcoal">02-470-9114</p>
          </ContactInfoCard>

          <ContactInfoCard title="주소">
            <p className="text-sm font-medium text-charcoal">
              서울 강동구 천호대로 1041
            </p>
          </ContactInfoCard>

          <ContactInfoCard title="진료시간">
            <p className="text-sm font-medium text-charcoal">
              평일 10:00-19:00 / 토 10:00-16:00
            </p>
          </ContactInfoCard>

          <ContactInfoCard title="YouTube">
            <a
              href="https://www.youtube.com/@nodak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-charcoal transition-colors hover:text-gold"
            >
              노닥!nodak!
            </a>
          </ContactInfoCard>
        </motion.div>
      </div>
    </section>
  );
}
