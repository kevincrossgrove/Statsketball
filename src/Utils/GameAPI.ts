import { IGameSchema, IPlayerSchema, ITeamSchema } from "@/types/Types";

// For Game Specific API calls, that aren't covered by RecordAPI
export default class GameAPI {
  static async FetchGameTeamsAndPlayers(gameID: string) {
    // This logic will be server side in the future
    // For now, we'll just use our localStorage setup.

    // ----------- Game Fetching -----------
    const gamesString = localStorage.getItem("games");

    if (!gamesString) return [];

    const games: IGameSchema[] = JSON.parse(gamesString);

    const game = games.find((game) => game.id === gameID);

    if (!game) return null;

    // ----------- Teams Fetching -----------
    const teamsString = localStorage.getItem("teams");

    if (!teamsString) return [];

    const allTeams: ITeamSchema[] = JSON.parse(teamsString);

    const teams = allTeams.filter((team) => game.Teams.includes(team.id));

    if (!teams.length || teams.length > 2) return null;

    // ----------- Players Fetching -----------
    const playersString = localStorage.getItem("players");

    if (!playersString) return [];

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
}
