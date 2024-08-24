import { z } from "zod";

export type ClickLocation = z.infer<typeof ClickLocationSchema>;

export const ClickLocationSchema = z.object({
  type: z.enum(["Make", "Miss"]),
  id: z.string(),
  x: z.number(),
  y: z.number(),
});

export const BaseGameEventSchema = z.object({
  id: z.string(),
  ClickRequired: z.boolean(),
  ClickLocation: ClickLocationSchema.optional(),
});

// Made Shot Event
const MakeEventSchema = z.object({
  Type: z.literal("Make"),
  PlayerID: z.string(),
  AssistedBy: z.string().optional(),
  Points: z.enum(["2", "3"]),
});

// Missed Shot Event
const MissEventSchema = z.object({
  Type: z.literal("Miss"),
  PlayerID: z.string(),
  Points: z.enum(["2", "3"]),
  BlockedBy: z.string().optional(),
});

type IBaseGameEvent = z.infer<typeof BaseGameEventSchema>;
type IMakeEvent = z.infer<typeof MakeEventSchema>;
type IMissEvent = z.infer<typeof MissEventSchema>;

export type IGameEvent = IBaseGameEvent & (IMakeEvent | IMissEvent);
