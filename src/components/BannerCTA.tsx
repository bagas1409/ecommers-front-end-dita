export default function BannerCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-indigo-600 p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Gratis Ongkir & Diskon 15% Hari Ini
            </h3>
            <p className="mt-1 text-white/90">
              Kode: AURORA15 • Berlaku hingga 23.59 WIB
            </p>
          </div>
          <a href="#shop" className="btn btn-white   ">
            Klaim Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
