import db from "#db/client";
import { createFiles } from "#db/queries/files";
import { createFolders } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {

  for (let i = 1; i <= 3; i++) {
    const folder = await createFolders("Folder " + i);
    for (let j = 1; j <= 6; j++) {
      await createFiles("File " + j, 1000 * j, folder.id);
    }
  }
}
