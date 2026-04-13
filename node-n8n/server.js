const express = require("express");
const nacl = require("tweetnacl");
const app = express();

app.use(express.raw({ type: "application/json" }));

const PUBLIC_KEY = "101840210d210b287c8f0502581375bfe34dd2078658753524350611a46963f8";

app.post("/interactions", async (req, res) => {
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];
    const body = req.body;

    const isValid = nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, "hex"),
        Buffer.from(PUBLIC_KEY, "hex")
    );

    if (!isValid) return res.status(401).send("invalid signature");

    const json = JSON.parse(body.toString());

    // PING check
    if (json.type === 1) {
        return res.json({ type: 1 });
    }

    // forward to n8n
    await fetch("https://guy-diocese-scroll.ngrok-free.dev/webhook/discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    });

    return res.json({ type: 4, data: { content: "Processing..." } });
});

app.listen(3000, () => console.log("Server running"));