import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), "src/app/data/players.json");

    const jsonData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : { playersData: [] };

    const lastId =
      jsonData.playersData.length > 0
        ? Math.max(...jsonData.playersData.map((p) => p.ID))
        : 390;

    const newPlayer = {
      ID: lastId + 1,
      Name: body.Name,
      Teams: body.Teams,
    };

    jsonData.playersData.push(newPlayer);

    // Convertir a JSON con indentación, pero arrays en una sola línea
    const jsonString = JSON.stringify(jsonData, null, 2)
      .replace(/\[\s+([^\]]+?)\s+\]/gs, (_, p1) => `[${p1.replace(/\s+/g, " ")}]`);

    fs.writeFileSync(filePath, jsonString, "utf-8");

    return new Response(JSON.stringify({ success: true, player: newPlayer }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
