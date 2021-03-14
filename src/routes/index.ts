import { oak } from "deps";

const router = new oak.Router();

// Routes
router.get("/", ({ response }) => {
  response.body = "¡Webfonts!";
});

router.get("/fonts/:fontname", async ({ response, params, request }) => {
  for await (const dirEntry of Deno.readDir("fonts")) {
    if (dirEntry.name == params.fontname) {
      const fontStyles = await Deno.readTextFile(
        `fonts/${params.fontname}/index.css`,
      );
      response.body = fontStyles.replaceAll(
        "$API_URL",
        request.url.origin + `/fonts/${params.fontname}`,
      );
      response.type = "text/css";
      console.log(request);
    }
  }
});

export default router;
