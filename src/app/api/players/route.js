import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const player = searchParams.get("q");
  const API_TOKEN = process.env.API_TOKEN;

  if (!player) return NextResponse.json({ results: [] });

  const encodedPlayer = encodeURIComponent(player);
  const url = `https://api.sportmonks.com/v3/football/players/search/${encodedPlayer}?api_token=${API_TOKEN}&include=nationality;position;teams;trophies`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Error en Sportmonks API:", res.status);
    const text = await res.text();
    console.error("Respuesta:", text);
    return NextResponse.json({ results: [] });
  }

  const data = await res.json();
  console.log(data.data);

  const results = data.data.map((p) => ({
    name: p.display_name,
    image: p.image_path,
    nationality: p.nationality?.image_path ?? null,
  }));
  console.log(results);

  return NextResponse.json({ results });
}
