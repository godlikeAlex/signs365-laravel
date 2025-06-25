
async function lul() {
  const js = await import('./bootstrap/ssr/ssr.mjs');
  console.log(js.render().html);
}

lul();