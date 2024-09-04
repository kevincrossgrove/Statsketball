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
const MakeEventSchema = BaseGameEventSchema.extend({
  Type: z.literal("Make"),
  PlayerID: z.string(),
  AssistedBy: z.string().optional(),
  Points: z.enum(["2", "3"]),
});

// Missed Shot Event
const MissEventSchema = BaseGameEventSchema.extend({
  Type: z.literal("Miss"),
  PlayerID: z.string(),
  Points: z.enum(["2", "3"]),
  BlockedBy: z.string().optional(),
});

export type IMakeEvent = z.infer<typeof MakeEventSchema>;
export type IMissEvent = z.infer<typeof MissEventSchema>;

export const GameEventSchema = z.discriminatedUnion("Type", [
  MakeEventSchema,
  MissEventSchema,
]);

export type IGameEvent = z.infer<typeof GameEventSchema>;
