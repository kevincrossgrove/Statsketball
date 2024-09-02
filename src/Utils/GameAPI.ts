import { IGameEvent } from "@/types/GameEventTypes";
import { IGameSchema, IPlayerSchema, ITeamSchema } from "@/types/Types";

export type GameInfo = {
  game: IGameSchema;
  teams: ITeamSchema[];
  playersMap: Record<string, IPlayerSchema>;
};

// For Game Specific API calls, that aren't covered by RecordAPI
export default class GameAPI {
  static async FetchGameTeamsAndPlayers(
    gameID: string
  ): Promise<GameInfo | null> {
    // This logic will be server side in the future
    // For now, we'll just use our localStorage setup.

    // ----------- Game Fetching -----------
    const { game } = await GameAPI.GetGame(gameID);

    if (!game) return null;

    // ----------- Teams Fetching -----------
    const teamsString = localStorage.getItem("teams");

    if (!teamsString) return null;

    const allTeams: ITeamSchema[] = JSON.parse(teamsString);

    const teams = allTeams.filter((team) => game.Teams.includes(team.id));

    if (!teams.length || teams.length > 2) return null;

    // ----------- Players Fetching -----------
    const playersString = localStorage.getItem("players");

    if (!playersString) return null;

    const allPlayers: IPlayerSchema[] = JSON.parse(playersString);

    const teamPlayers = teams.map((team) => team.Players).flat();

    const playersMap = allPlayers.reduce((acc, player) => {
      if (!teamPlayers.includes(player.id)) return acc;

      acc[player.id] = player;
      return acc;
    }, {} as Record<string, IPlayerSchema>);

    if (!Object.keys(playersMap).length) return null;

    return { game, teams, playersMap };
  }

  static async CreateGameEvent(
    gameID: string,
    event: IGameEvent
  ): Promise<IGameSchema | null> {
    console.log("Fetching games");

    // ----------- Game Fetching -----------
    const { game, games } = await this.GetGame(gameID);

    if (!games || !game) return null;

    if (!game?.GameEvents) game.GameEvents = [];

    // ----------- Add the game event ------
    game.GameEvents.push(event);

    // ----------- Update the game event ---
    games.map((g) => (g.id === gameID ? game : g));

    console.log("Updated games", games);

    localStorage.setItem("games", JSON.stringify(games));

    return game;
  }

  // ----------- Game Fetching -----------
  static async GetGame(
    gameID: string
  ): Promise<{ game: IGameSchema | null; games: IGameSchema[] | null }> {
    const gamesString = localStorage.getItem("games");

    if (!gamesString) return { games: null, game: null };

    const games: IGameSchema[] = JSON.parse(gamesString);

    const game = games.find((game) => game.id === gameID);

    return { games, game: game || null };
  }
}
