import {
  h,
  jsx,
  serve,
  serveStatic,
} from 'https://deno.land/x/sift@0.1.7/mod.ts';

function App({ name }: { name: string }) {
  return <div>Hello, {name}</div>;
}

serve({
  '/': () =>
    jsx(
      <html>
        <head>
          <link rel="stylesheet" href="style.css" />
        </head>
        <body>
          <App name="yutaro-elk" />
          <p class="red">test</p>
        </body>
      </html>
    ),
  '/style.css': serveStatic('style.css', {
    baseUrl: import.meta.url,
    intervene: (response) => {
      response.headers.set('content-type', 'text/css; charset=utf-8');
      return response;
    },
  }),
});
