import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
export default async function uploadImage(file, userid) {
  if (!file || typeof file === "string") {
    return { error: "No file uploaded" }, { status: 400 };
  }

  const buffer = await file.arrayBuffer();
  const uploadDir = path.join(process.cwd(), `public/uploads/${userid}`);

  //   ✅ Ellenőrizzük, hogy létezik-e a mappa, és ha nem, létrehozzuk
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, Buffer.from(buffer));
  return { success: true, filePath: `/uploads/${userid}/${file.name}` };
}
