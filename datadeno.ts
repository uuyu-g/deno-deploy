import { serve } from "https://deno.land/x/sift@0.1.7/mod.ts";

const SLACK_URL = Deno.env.get("SLACK_URL");

if (!SLACK_URL) {
  throw new Error("SLACK_URLが設定されていません");
}

serve({
  "/:name": (req, params) => {
    fetch(
      SLACK_URL,
      {
        method: "POST",
        body: JSON.stringify({ text: `Hello, ${params?.name}!` }),
      },
    );
    return new Response("send!");
  },
});
