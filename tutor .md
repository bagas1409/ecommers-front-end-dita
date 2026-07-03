# 🚀 PANDUAN DEPLOYMENT E-COMMERCE BACKEND KE VPS (MENGGUNAKAN aaPANEL & DOMAINESIA)

Dokumen ini berisi panduan lengkap berurutan dari nol untuk men-deploy backend aplikasi E-Commerce ke VPS (Virtual Private Server) menggunakan domain **`payload.web.id`** yang dibeli di DomaiNesia dan dikelola melalui dashboard **aaPanel**.

---

## 🎯 1. Keunggulan Arsitektur Proyek Ini

Proyek backend ini dikategorikan sebagai **Proyek Standar Industri (Production-Grade Project)** dengan arsitektur modern:
1. **Type-Safety (TypeScript):** Menggunakan TypeScript penuh untuk kompilasi aman sebelum dideploy.
2. **Database ORM Modern (Prisma):** Migrasi database terstruktur dengan type-safe query menggunakan Prisma Client.
3. **Keamanan API:** Dilengkapi rate-limiter, CORS dinamis terkonfigurasi, enkripsi password (bcryptjs), dan perlindungan otentikasi JWT ganda.
4. **Manajemen Proses (PM2):** Memastikan server backend otomatis berjalan kembali saat VPS reboot atau mengalami crash mendadak.

---

## 🛠️ 2. Persiapan Server VPS Baru (Ubuntu 20.04/22.04 LTS)

Sebelum memasang backend, jalankan perintah berikut di terminal VPS Anda untuk menginstal semua kebutuhan dasar:

### A. Update Sistem & Instal Tools Pendukung
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip build-essential
```

### B. Instal Node.js (Versi 20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```
*Verifikasi instalasi:* `node -v` dan `npm -v`

### C. Instal PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

---

## 💾 3. Persiapan Database PostgreSQL di VPS

Sebelum menjalankan backend, PostgreSQL harus terinstal dan database **`kosmetik_db`** harus dibuat terlebih dahulu.

### Pilihan A: Melalui Terminal VPS (Ubuntu)
1. **Instal PostgreSQL:**
   ```bash
   sudo apt install postgresql postgresql-contrib -y
   ```
2. **Jalankan & Aktifkan Service:**
   ```bash
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```
3. **Masuk ke CLI PostgreSQL:**
   ```bash
   sudo -i -u postgres psql
   ```
4. **Set Password untuk user `postgres` (sesuaikan dengan .env Anda, misal: `bagas`):**
   ```sql
   ALTER USER postgres PASSWORD 'bagas';
   ```
5. **Buat Database Baru bernama `kosmetik_db`:**
   ```sql
   CREATE DATABASE kosmetik_db;
   ```
6. **Keluar dari PostgreSQL CLI:**
   ```sql
   \q
   ```

*Catatan Port:* Secara default PostgreSQL berjalan di port `5432`. Jika Anda ingin menggunakan port `5433` seperti di konfigurasi `.env` Anda, Anda perlu mengubah port di file konfigurasi:
`sudo nano /etc/postgresql/14/main/postgresql.conf` (ganti `14` dengan versi terpasang) -> cari baris `port = 5432` dan ubah menjadi `port = 5433`, lalu restart PostgreSQL dengan `sudo systemctl restart postgresql`.

### Pilihan B: Melalui aaPanel (UI Grafis)
1. Masuk ke dashboard **aaPanel** Anda.
2. Buka menu **App Store** di sebelah kiri.
3. Cari **PostgreSQL Manager**, lalu klik **Install**.
4. Setelah terinstal, klik **Settings** pada PostgreSQL Manager.
5. Pada tab **Database**, klik **Add database**:
   * **Database Name:** `kosmetik_db`
   * **Username:** `postgres`
   * **Password:** `bagas`
6. Klik **Submit**. Database dan user akan otomatis terbuat secara instan.

---

## 🌐 4. Konfigurasi DNS di DomaiNesia

Langkah ini bertujuan mengarahkan subdomain Anda (contoh: `api.payload.web.id`) ke IP VPS Anda.

1. Siapkan **IP Publik VPS** Anda (misalnya: `103.123.45.67`).
2. Login ke **Client Area DomaiNesia** (https://my.domainesia.com).
3. Pilih menu **Domains** di sebelah kiri, lalu klik domain **`payload.web.id`**.
4. Klik menu **DNS Management** di sebelah kiri.
5. Tambahkan record baru (**Add Record**):
   * **Host Name / Subdomain:** Isi dengan **`api`** (jangan tulis lengkap `api.payload.web.id`, cukup `api` saja).
   * **Record Type:** Pilih **`A`**
   * **Address (IP Target):** Isi dengan **IP VPS Anda**.
   * **TTL:** Biarkan default (biasanya `14400` atau `3600`).
6. Klik **Save**.
7. Tunggu proses propagasi DNS (biasanya 5 menit hingga 1 jam). Anda bisa mengetesnya di CMD laptop dengan mengetik `ping api.payload.web.id`.

---

## 📦 5. Langkah Deployment Pertama Kali (First-Time Setup)

### Langkah 1: Clone Repository di VPS
Masuk ke folder home VPS Anda, lalu clone source code proyek:
```bash
cd ~
git clone <URL_REPOSITORY_BACKEND_ANDA> ecommerce-backend
cd ecommerce-backend
```

### Langkah 2: Buat dan Isi File `.env` di VPS
Buat file konfigurasi `.env` di dalam folder root backend:
```bash
nano .env
```
Salin dan sesuaikan variabel konfigurasi berikut ke dalam editor nano tersebut:
```env
# ─── DATABASE ─────────────────────────────────
DATABASE_URL="postgresql://postgres:bagas@127.0.0.1:5433/kosmetik_db"

# ─── JWT ──────────────────────────────────────
JWT_ACCESS_SECRET="buat_string_random_yang_panjang_dan_aman_di_sini_access"
JWT_REFRESH_SECRET="buat_string_random_yang_panjang_dan_aman_di_sini_refresh"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

# ─── SERVER ───────────────────────────────────
PORT=7000
NODE_ENV="production"

# ─── CORS ─────────────────────────────────────
FRONTEND_URL="https://payload.web.id"
```
*Catatan:*
*   Simpan file (`Ctrl+O`, lalu `Enter`) dan keluar (`Ctrl+X`).
*   Ubah nilai `JWT_ACCESS_SECRET` dan `JWT_REFRESH_SECRET` dengan string acak dan unik.
*   Isi `FRONTEND_URL` dengan domain aplikasi frontend Anda agar request CORS diizinkan.

### Langkah 3: Instal Dependensi Node.js
```bash
npm install
```

### Langkah 4: Terapkan Migrasi Database, Generate Client & Seeding
Terapkan migrasi skema database PostgreSQL secara aman, buat modul klien Prisma, dan masukkan data awal (seeding) ke database:
```bash
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

### Langkah 5: Compile TypeScript ke JavaScript (Build)
```bash
npm run build
```

### Langkah 6: Jalankan Server Menggunakan PM2
Jalankan aplikasi menggunakan PM2 dan berikan nama alias unik `--name "ecommerce-backend"` agar proses mudah dikontrol:
```bash
pm2 start dist/index.js --name "ecommerce-backend"
```

Agar PM2 otomatis menyala kembali ketika VPS mengalami reboot/restart fisik:
```bash
pm2 startup
# Salin dan jalankan perintah sudo env PATH=... yang muncul di terminal Anda
pm2 save
```

---

## 🔒 6. Konfigurasi Reverse Proxy & SSL di aaPanel

Agar domain `api.payload.web.id` terhubung secara aman (HTTPS) dengan backend Node.js yang berjalan di port `7000`.

### Langkah A: Daftarkan Subdomain di aaPanel
1. Masuk ke **aaPanel** -> pilih menu **Website** -> klik tombol **Add site**.
2. Pada bagian **Domain**, ketik: **`api.payload.web.id`**.
3. Pada bagian **Database**, pilih **`No`**.
4. Pada bagian **PHP version**, pilih **`Static`**.
5. Klik **Submit**.

### Langkah B: Buat Reverse Proxy ke Port 7000
1. Di daftar website aaPanel, klik domain **`api.payload.web.id`**.
2. Di pop-up pengaturan yang terbuka, klik tab **Reverse proxy** di sebelah kiri.
3. Klik tombol **Add reverse proxy**.
4. Isi formulir dengan data berikut:
   * **Proxy name:** `backend-proxy`
   * **Target URL:** **`http://127.0.0.1:7000`** *(Ini port backend Anda)*
   * **Sent Domain:** `$host`
5. Klik **Submit**.

### Langkah C: Aktifkan SSL HTTPS
1. Masih di pop-up pengaturan website yang sama, klik tab **SSL** di sebelah kiri.
2. Klik tab **Let's Encrypt** di sebelah atas.
3. Centang domain Anda (**`api.payload.web.id`**).
4. Klik tombol **Apply** dan tunggu sampai proses selesai.
5. Setelah berhasil, aktifkan tombol **Force HTTPS** di pojok kanan atas.

---

## 🔄 7. Langkah Update Backend (Ketika Ada Perubahan Kode/Git Pull)

Setiap kali Anda selesai melakukan push kode baru dari lokal dan ingin menerapkannya di VPS, masuk ke terminal VPS Anda dan jalankan baris perintah ini:

```bash
# 1. Masuk ke folder proyek
cd ~/ecommerce-backend

# 2. Ambil kode terbaru dari Git
git pull origin main

# 3. Instal dependensi baru (jika ada tambahan package)
npm install --include=dev

# 4. Sinkronisasi perubahan tabel database (jika ada migrasi baru)
npx prisma migrate deploy
npx prisma generate

# 5. Build ulang file TypeScript
npm run build

# 6. Restart server PM2 agar kode baru terload
pm2 restart ecommerce-backend
```

---

## 💡 8. Troubleshooting & Log Ringkas

*   **Melihat status backend berjalan:**
    ```bash
    pm2 status
    ```
*   **Melihat log jalannya backend secara real-time:**
    ```bash
    pm2 logs ecommerce-backend
    ```
*   **Melihat status penggunaan memori/CPU server:**
    ```bash
    pm2 monit
    ```
*   **Mengetes endpoint kesehatan server secara lokal di VPS:**
    ```bash
    curl http://localhost:7000/health
    ```