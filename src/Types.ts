import { z } from "zod";

const IdSchema = z.object({
  id: z.string(),
});

export const GameEventSchema = z.object({
  PlayerID: z.string(),
});

const PlayerPayloadSchema = z.object({
  Name: z.string(),
  Number: z.number(),
  DateOfBirth: z.string().optional(),
  Height: z.string().optional(),
  Image: z.any().optional(), // TODO: Think about potentially adding Images for easier identification of players.
});

// Combine idschema and playerPayloadSchema
export const PlayerSchema = PlayerPayloadSchema.merge(IdSchema);

export const TeamPayloadSchema = z.object({
  Name: z.string(),
  Location: z.string(),
  Players: z.array(z.string()),
});

export const TeamSchema = TeamPayloadSchema.merge(IdSchema);

// The payload schema for creating a game
export const GamePayloadSchema = z.object({
  Name: z.string().optional(), // Optional game name, if not provided, the name will be the teams and the date of the game.
  Description: z.string().optional(), // Optional game description. Ex. Pool play in the Olympics.
  Date: z.string(), // The official start time of the event
  Teams: z.array(z.string()), // TeamIDs
  Location: z.string().optional(),
});

export const GameSchema = GamePayloadSchema.merge(IdSchema).extend({
  GameEvents: z.array(GameEventSchema),
});

export const DataSourcesPayloadSchemaMap = {
  teams: TeamPayloadSchema,
  games: GamePayloadSchema,
  players: PlayerPayloadSchema,
};

export const DataSourcesSchemaMap = {
  teams: TeamSchema,
  games: GameSchema,
  players: PlayerSchema,
};

export const DataSourcesNameMap = {
  teams: "Teams",
  games: "Games",
  players: "Players",
};

export type DataSources = "teams" | "games" | "players";

export type ITeamSchema = z.infer<typeof TeamSchema>;
export type IGameSchema = z.infer<typeof GameSchema>;
export type IPlayerSchema = z.infer<typeof PlayerSchema>;

export type ITeamPayloadSchema = z.infer<typeof TeamPayloadSchema>;
export type IGamePayloadSchema = z.infer<typeof GamePayloadSchema>;
export type IPlayerPayloadSchema = z.infer<typeof PlayerPayloadSchema>;

export type DataSourceSchema = ITeamSchema | IGameSchema | IPlayerSchema;
export type DataSourcePayloadSchema =
  | ITeamPayloadSchema
  | IGamePayloadSchema
  | IPlayerPayloadSchema;

export type DataSourceSchemaMap = {
  [key in DataSources]: DataSourceSchema;
};
