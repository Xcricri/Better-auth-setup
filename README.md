## 🚀 Next Auth Starter – Ujikom Edition

Selamat datang di proyek Next.js penuh semangat ini! Repositori ini memadukan **Next.js 16**, **Tailwind CSS 4**, dan **Better Auth** di atas database **Prisma + SQLite**. Cocok untuk membangun aplikasi autentikasi modern.

### ✨ Fitur Unggulan

- 📦 Struktur Next.js App Router yang rapi dan mudah dikembangkan.
- 🔐 Autentikasi email + password lewat Better Auth dengan sesi 7 hari.
- 🗄️ Prisma ORM dengan skema siap pakai (User, Session, Account).
- 🌱 Script seeding untuk akun demo sehingga kamu bisa langsung login.
- 🎨 Tailwind CSS 4 untuk styling cepat dan responsif.

### 🛠️ Prasyarat

Pastikan perangkat tempur kamu sudah terpasang:

- Node.js 20 atau lebih baru
- npm (atau pnpm/yarn sesuai selera)

### ⚙️ Langkah Persiapan

1. **Kloning repositori** ini atau salin ke mesin kamu.
2. **Instal dependensi**:
   - `npm install`
3. **Siapkan lingkungan** dengan menyesuaikan `.env` bila perlu:
   ```dotenv
   DATABASE_URL="file:./dev.db"
   BETTER_AUTH_BASE_URL=http://localhost:3000
   ```
   Ganti `BETTER_AUTH_BASE_URL` dengan URL deploy jika ingin online.

### 🧭 Prisma & Database

- Jalankan migrasi untuk memastikan skema database terkini:
  - `npx prisma migrate deploy`
- Isi data demo:
  - `npx prisma db seed`
- Kredensial bawaan setelah seeding:
  - Email: `test@example.com`
  - Password: `12345678`

### ▶️ Menjalankan Proyek

- Mode pengembangan: `npm run dev`
- Build produksi: `npm run build`
- Menjalankan build: `npm run start`
- Pemeriksaan linting: `npm run lint`

### 🧰 Struktur Folder Singkat

```
app/           # Halaman Next.js App Router & API route
lib/           # Helper seperti konfigurasi Better Auth & Prisma
prisma/        # schema.prisma, seed, dan migrasi
public/        # Asset statis
```

### 💡 Tips Biar Tetap On Fire

- Commit kecil tapi konsisten biar progres terlihat.
- Manfaatkan Tailwind untuk eksperimen UI secara kilat.
- Jangan lupa re-run seeding kalau database direset.
- Tulis catatan singkat setiap kali menemukan ide baru.

### 🎯 Target Akhir

Dengan dokumentasi ini, harapannya kamu bisa:

- Mem-booting proyek dalam hitungan menit.
- Memahami alur autentikasi tanpa kebingungan.
- Melanjutkan pengembangan fitur dengan penuh percaya diri.

Semangat berkarya! 💪
# Better-auth-setup
