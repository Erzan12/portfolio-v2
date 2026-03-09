import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo"); // e.g., "Erzan12/Product-Inventory-System"

  const res = await fetch(`https://api.github.com/repos/${repo}`);
  const data = await res.json();

  return NextResponse.json({ stars: data.stargazers_count });
}