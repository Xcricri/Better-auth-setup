import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";

const prisma = new PrismaClient();

async function main() {
    const email = "test@example.com";
    const plainPassword = "12345678";

    console.log("🚀 Memulai proses seeding...");

    // 1. Hash password menggunakan standar Better Auth
    // Ini menjamin format salt dan algoritma sesuai dengan engine auth kamu
    const hashedPassword = await hashPassword(plainPassword);

    // 2. Upsert User (buat jika belum ada, abaikan jika sudah ada)
    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: "Test User",
            emailVerified: true,
            image: "https://api.dicebear.com",
        },
    });

    // 3. Upsert Account (Relasi kredensial login)
    // Pastikan providerId adalah "credential" agar dibaca oleh emailAndPassword
    await prisma.account.upsert({
        where: {
            providerId_accountId: {
                providerId: "credential",
                accountId: email,
            },
        },
        update: {
            password: hashedPassword,
        },
        create: {
            userId: user.id,
            providerId: "credential",
            accountId: email,
            password: hashedPassword,
        },
    });

    console.log(`✅ Seed Berhasil!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${plainPassword}`);
}

main()
    .catch((e) => {
        console.error("❌ Terjadi error saat seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
