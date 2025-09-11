export default async function getPlayers(player) {
  const API_TOKEN = process.env.API_TOKEN;

  const res = await fetch(
    `https://api.sportmonks.com/v3/football/players/search/${player}?api_token=${API_TOKEN}&include=nationality;position;teams;trophies`
  );
  const data = await res.json();

  return data.data.map((p) => ({ name: p.display_name, image: p.image_path, nationality: p.nationality.image_path }));
}
