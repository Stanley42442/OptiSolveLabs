import { db } from "./db";
import { promoStatuses } from "@shared/schema";

async function seed() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  console.log("Seeding promo status for current month...");

  await db.insert(promoStatuses).values({
    month: currentMonth,
    year: currentYear,
    slotsRemaining: 3,
  });

  console.log("✅ Seeded promo status with 3 slots for current month");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
