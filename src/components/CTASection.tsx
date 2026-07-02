"use client";
import Shield from "./icons/Shield";
import EmailCapture from "./EmailCapture";

export default function CTASection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-6 pb-20">
      <div className="rounded-3xl border border-gray-100 bg-white/80 p-8 text-center shadow-sm backdrop-blur">
        <h3 className="text-2xl font-bold md:text-3xl">
          Siap mulai perjalanan kulit sehatmu?
        </h3>
        <p className="mt-2 text-gray-600">
          Daftar untuk mendapatkan tips eksklusif & penawaran khusus.
        </p>
        <EmailCapture />
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <Shield className="h-4 w-4" /> Data aman & terenkripsi
        </div>
      </div>
    </section>
  );
}
