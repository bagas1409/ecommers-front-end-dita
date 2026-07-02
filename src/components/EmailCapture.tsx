// src/components/EmailCapture.jsx
export default function EmailCapture() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={`mt-6 flex max-w-md`}>
      <input
        type="email"
        required
        placeholder="Email kamu"
        className="flex-1 rounded-l-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-400"
      />
      <button className="rounded-r-xl bg-gradient-to-r from-rose-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:opacity-95">
        Dapatkan Promo
      </button>
    </form>
  );
}
