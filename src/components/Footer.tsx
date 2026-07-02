// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/70">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-indigo-500 text-white font-bold">
                AB
              </span>
              <span className="font-semibold">Aurora Beauty</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Skincare modern untuk kulit sehat bercahaya setiap hari.
            </p>
          </div>

          {/* panggil FooterCol */}
          <FooterCol
            title="Produk"
            links={["Serum", "Toner", "Moisturizer", "Sunscreen"]}
          />
          <FooterCol
            title="Bantuan"
            links={["Kontak", "Pengiriman", "Pengembalian", "Garansi"]}
          />
          <FooterCol
            title="Perusahaan"
            links={["Tentang", "Karier", "Kemitraan", "Kebijakan"]}
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Aurora Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-700">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-700">
              TikTok
            </a>
            <a href="#" className="hover:text-gray-700">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// definisikan FooterCol
function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-gray-900">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
