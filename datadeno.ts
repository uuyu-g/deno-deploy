import { serve } from "https://deno.land/x/sift@0.1.7/mod.ts";

const SLACK_TOKEN = Deno.env.get("SLACK_TOKEN");
if (!SLACK_TOKEN) {
  throw new Error("環境変数が設定されていません");
}
const SLACK_URL = `https://hooks.slack.com/services/${SLACK_TOKEN}`;

serve({
  "/:name": (req, params) => {
    const token = req.headers.get("Authentication");
    if (token !== SLACK_TOKEN) return new Response("権限がありません");

    return fetch(
      SLACK_URL,
      {
        method: "POST",
        body: JSON.stringify({ text: `Hello, ${params?.name}!` }),
      },
    );
  },
});
