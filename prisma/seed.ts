import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    const email = "test@example.com";
    const plainPassword = "12345678";

    console.log("🚀 Memulai proses seeding...");

    // Hash password
    const hashedPassword = await hashPassword(plainPassword);

    // Upsert User
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

    // Upsert Account
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

    // Random users

    for (let i = 0; i < 5; i++) {
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email().toLocaleLowerCase();
        const randomPassword = "user12345678";

        const hashedRandomPassword = await hashPassword(randomPassword);

        // Simpan user dan tangkap hasilnya
        const randomUser = await prisma.user.upsert({
            where: { email: randomEmail },
            update: {},
            create: {
                email: randomEmail,
                name: randomName,
                emailVerified: true,
                image: "https://api.dicebear.com",
                role: "user"
            },
        });

        // Langsung pakai randomUser.id (tidak perlu findUnique lagi)
        await prisma.account.upsert({
            where: {
                providerId_accountId: {
                    providerId: "credential",
                    accountId: randomEmail,
                },
            },
            update: {
                password: hashedRandomPassword,
            },
            create: {
                userId: randomUser.id,
                providerId: "credential",
                accountId: randomEmail,
                password: hashedRandomPassword,
            },
        });
        console.log(`👤 ${randomEmail} | 🔑 ${randomPassword}`);
    }

    console.log("✅ Seed Berhasil!");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${plainPassword}`);
}

// Panggil main DI LUAR function
main()
    .catch((e) => {
        console.error("❌ Terjadi error saat seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
