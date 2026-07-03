# 🎓 CHEAT SHEET PRESENTASI: E-COMMERCE BACKEND, FRONTEND & DATABASE

Dokumen ini adalah panduan singkat, padat, dan berdaging untuk mempermudah Anda menjelaskan arsitektur proyek, letak kode logika utama, struktur database, serta cara menjawab pertanyaan penguji secara percaya diri saat presentasi.

---

## 🚀 1. Ringkasan Arsitektur & Teknologi

*   **Frontend (FE):** Next.js App Router (TypeScript, TailwindCSS untuk styling, Axios untuk komunikasi API, dan Sonner untuk notifikasi/toast).
*   **Backend (BE):** Express.js REST API (TypeScript, Prisma ORM sebagai jembatan ke database, Zod untuk validasi input, Helmet & Rate Limiting untuk keamanan).
*   **Database (DB):** PostgreSQL yang terpusat dan dikelola secara aman melalui Prisma.

---

## 📂 2. Peta Folder & File Penting (Lokasi Logika Utama)

Jika penguji meminta Anda membuka kode untuk fitur tertentu, tunjukkan file-file berikut:

### 🔑 A. Autentikasi (Login & Register)
*   **Frontend (Tampilan & Event):**
    *   `ecommers-front-end/src/app/auth/signin/page.tsx` — Halaman Form Login. Di sini kredensial dikirim ke API backend, lalu token JWT yang didapat disimpan ke `localStorage` dan `document.cookie`.
    *   `ecommers-front-end/src/hooks/useAuth.ts` — Hook untuk mendapatkan data profil user aktif (`/auth/me`) dan menangani proses logout (menghapus token & cookies).
*   **Backend (Logika & Keamanan):**
    *   `ecommers-backend/src/modules/auth/auth.router.ts` — Rute API login, register, logout, dan refresh token.
    *   `ecommers-backend/src/modules/auth/auth.controller.ts` — Menerima request login/register dari frontend dan mengirim respons.
    *   `ecommers-backend/src/modules/auth/auth.service.ts` — **Jantung Logika Login.** Di sini password dicocokkan menggunakan `bcrypt.compare()` dan token JWT di-generate menggunakan library `jsonwebtoken`.

### 🛡️ B. Pembatasan Akses (Middleware / Route Guards)
*   **Frontend (Proteksi Halaman):**
    *   `ecommers-front-end/src/middleware.ts` — Membaca token dari cookie. Jika user bukan `ADMIN` dan mencoba masuk ke `/admin/*`, otomatis di-redirect ke `/customer/dashboard`. Jika belum login, di-redirect ke `/auth/signin`.
*   **Backend (Proteksi Endpoint API):**
    *   `ecommers-backend/src/middleware/auth.middleware.ts` — Memverifikasi keaslian JWT token yang dikirim di header Request (`Authorization: Bearer <token>`).
    *   `ecommers-backend/src/middleware/role.middleware.ts` — Memastikan role pengguna cocok (misal: hanya `ADMIN` yang boleh membuat/menghapus produk).

### 🛒 C. Manajemen Keranjang Belanja (Cart)
*   **Frontend (Aksi di Browser):**
    *   `ecommers-front-end/src/hooks/useCart.ts` — Menyediakan fungsi `addToCart`, `updateQuantity`, dan `removeFromCart` yang memicu request API ke backend.
    *   `ecommers-front-end/src/components/card/itemcard.tsx` — Tampilan produk di dalam keranjang belanja.
*   **Backend (Logika Database):**
    *   `ecommers-backend/src/modules/cart/cart.service.ts` — Logika penambahan barang ke keranjang (cek stok, buat item baru atau update quantity jika barang sudah ada di keranjang).

### 🛍️ D. Produk & Stok (CRUD)
*   **Backend (API & Database):**
    *   `ecommers-backend/src/modules/products/product.service.ts` — Logika CRUD produk (termasuk *Soft Delete* dengan mengubah `isActive = false` agar tidak merusak data transaksi lama).
*   **Frontend (Tampilan Produk):**
    *   `ecommers-front-end/src/app/(main)/customer/products/[id]/page.tsx` — Halaman Detail Produk & aksi tambah ke keranjang dengan efek loading.

---

## 💾 3. Struktur Database (PostgreSQL & Prisma)

Buka file **`ecommers-backend/prisma/schema.prisma`** untuk memperlihatkan model database.

### Hubungan Relasi Utama:
1.  **`User` ↔ `Cart` (One-to-One):** Setiap user memiliki 1 keranjang belanja aktif.
2.  **`Cart` ↔ `CartItem` (One-to-Many):** 1 keranjang belanja dapat menampung banyak jenis barang.
3.  **`Product` ↔ `CartItem` (One-to-Many):** 1 produk dapat dimasukkan ke banyak keranjang belanja user berbeda.
4.  **`Category` ↔ `Product` (One-to-Many):** 1 kategori (misal: *Skincare*) menaungi banyak produk.
5.  **`User` ↔ `Order` (One-to-Many):** 1 user dapat melakukan banyak transaksi/checkout.

---

## 💬 4. Tanya Jawab Cepat (Ujian Pertahanan Kode)

**Q: Bagaimana aplikasi menjaga keamanan password pengguna?**
> **A:** Password tidak disimpan dalam bentuk teks biasa, melainkan di-hash menggunakan algoritma **BcryptJS** dengan faktor pengacakan (*salt rounds*) sebanyak 12 di backend sebelum disimpan ke database PostgreSQL.

**Q: Bagaimana cara kerja autentikasi JWT di aplikasi ini?**
> **A:** Ketika login berhasil, backend menghasilkan **Access Token** (masa berlaku 15 menit untuk keamanan) dan **Refresh Token** (masa berlaku 7 hari untuk memperpanjang sesi tanpa perlu login ulang). Frontend menyimpan Access Token ini di `localStorage` untuk disisipkan ke header setiap request API, dan menyalinnya ke **Cookie** agar Next.js middleware di sisi server bisa membaca role pengguna untuk pembatasan rute halaman secara instan.

**Q: Kenapa ada Next.js Middleware dan Express Middleware? Apa bedanya?**
> **A:** 
> *   **Next.js Middleware (FE):** Berjalan di sisi server frontend sebelum halaman di-render. Tugasnya hanya membatasi akses URL halaman (misal: menjaga agar pembeli biasa tidak bisa membuka halaman panel admin).
> *   **Express Middleware (BE):** Berjalan di server API. Tugasnya memproteksi data/endpoint API asli (misal: memblokir request post produk baru jika pengirim bukan admin terverifikasi).

**Q: Bagaimana sistem menangani error secara global di backend?**
> **A:** Kami menggunakan *Global Error Middleware* di file `ecommers-backend/src/middleware/error.middleware.ts`. Middleware ini menangkap semua error runtime, error validasi input Zod, serta error constraint database dari Prisma, lalu mengubahnya menjadi format JSON yang rapi dengan status HTTP yang sesuai sehingga frontend tidak crash dan dapat menampilkan pesan error yang mudah dipahami user.
