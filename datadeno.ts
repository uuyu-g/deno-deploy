import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.1.7/mod.ts";

async function handleRequest(request: Request) {
  const { body, error } = await validateRequest(request, {
    GET: {},
    POST: {
      body: ["message"],
      headers: ["Authentication"],
    },
  });

  if (error) {
    return json(
      { error: error.message },
      { status: error.status },
    );
  }

  if (request.method === "GET") {
    return new Response(
      `<body
        align="center"
        style="font-family: Avenir, Helvetica, Arial, sans-serif; font-size: 1.5rem;"
      >
        <p>
          datadeno.
        </p>
      </body>`,
      {
        headers: {
          "content-type": "text/html; charset=UTF-8",
        },
      },
    );
  }

  const token = Deno.env.get("SLACK_TOKEN");
  if (!token) {
    return json({ error: "環境変数が設定されていません" }, { status: 500 });
  }

  const auth = request.headers.get("Authentication");
  if (auth !== token) return json({ error: "権限がありません" }, { status: 401 });

  return fetch(`https://hooks.slack.com/services/${token}`, {
    method: "POST",
    body: JSON.stringify({ text: `Hello, ${body!.message}!` }),
  });
}

serve({ "/": handleRequest });
