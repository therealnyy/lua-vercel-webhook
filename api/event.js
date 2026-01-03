export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { event, message, secret } = req.body;

  if (secret !== process.env.EVENT_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (event === "SPECIAL_TRIGGER") {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "🚨 Lua triggered the event:\n" + message
      })
    });
  }

  res.json({ ok: true });
}
