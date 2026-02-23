import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool({connectionString: databaseUrl});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

async function main(){
  console.log("Adding Roles")
  await prisma.role.createMany({
    data: [
      { roles: "user" },
      { roles: "admin" },
    ],
    skipDuplicates: true,
  });
  console.log("Roles Added")

  await prisma.user.create({
    data : {
      name : "Admin",
      email : "admin@email.com",
      password : "Admin123!",
      userRole : {
        create : {
          role : {
            connect : {
              roles : "admin"
            }
          }
        }
      }
    }
  })
}

main().catch((error) => {
    console.error(error);
  }).finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });