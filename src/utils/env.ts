import { z } from "zod";

const schema = z.object({
  VITE_BACKEND_URL: z.url(),
});

const parsed = schema.safeParse(import.meta.env);

if (!parsed.success) {
  throw new Error("Make sure environment variables have been set up");
}

export default parsed.data;
