import { Router } from "express";

import YAUS from "../dao";
const router = Router();

router.post("/", async (request, response) => {
  const { original_url, custom_url } = request.body;
  if (!original_url || typeof original_url !== "string")
    return response
      .status(400)
      .json({ error: "Bad Source URL format, expected string." });
  try {
    const link: { url: string } | { error: string } = await YAUS.add(
      custom_url,
      original_url
    );
    if ("error" in link) throw new Error(link.error);
    return response.status(200).json(link);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

export default router;
