import { z } from "zod";

export const WrapHskSchema = z
  .object({
    amountToWrap: z.string().describe("Amount of HSK to wrap in wei"),
  })
  .strip()
  .describe("Instructions for wrapping HSK to WHSK");
