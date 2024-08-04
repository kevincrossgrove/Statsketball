import { z } from "zod";

export const GameEventSchema = z.object({
  PlayerID: z.string(),
});

const PlayerSchema = z.object({
  id: z.string(),
  Name: z.string(),
  Number: z.number(),
  DateOfBirth: z.string().optional(),
  Image: z.any().optional(), // TODO: Think about potentially adding Images for easier identification of players.
});

export const TeamSchema = z.object({
  id: z.string(),
  Name: z.string(),
  Location: z.string(),
  Players: z.array(PlayerSchema),
});

// The payload schema for creating a game
export const GamePayloadSchema = z.object({
  Name: z.string().optional(), // Optional game name, if not provided, the name will be the teams and the date of the game.
  Description: z.string().optional(), // Optional game description. Ex. Pool play in the Olympics.
  Date: z.string(), // The official start time of the event
  Teams: z.array(z.string()), // TeamIDs
  Location: z.string().optional(),
});

export const GameSchema = GamePayloadSchema.extend({
  id: z.string(),
  GameEvents: z.array(GameEventSchema),
});

export const DataSourcesPayloadSchemaMap = {
  teams: GamePayloadSchema,
  games: GamePayloadSchema,
};

export const DataSourcesSchemaMap = {
  teams: TeamSchema,
  games: GameSchema,
};

export const DataSourcesNameMap = {
  teams: "Teams",
  games: "Games",
};

export type DataSources = "teams" | "games";

export type ITeamSchema = z.infer<typeof TeamSchema>;
export type IGameSchema = z.infer<typeof GameSchema>;

export type DataSourceSchema = ITeamSchema | IGameSchema;

export type DataSourceSchemaMap = {
  [key in DataSources]: DataSourceSchema;
};
