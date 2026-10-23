import { readFile, writeFile, mkdir } from "node:fs/promises";

const FILE = "data/project.sb3";

export async function GET() {
  try {
    return new Response(await readFile(FILE), {
      headers: {
        "Content-Type": "application/x.scratch.sb3"
      }
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}

export async function PUT({ request }) {
  await mkdir("data", { recursive: true });
  await writeFile(FILE, Buffer.from(await request.arrayBuffer()));
  return new Response(null, { status: 204 });
}
