export interface Game {
  id: string;
  Name?: string; // Optional game name, if not provided, the name will be the teams and the date of the game.
  Description?: string; // Optional game description. Ex. Pool play in the Olympics.
  Date: string; // The official start time of the event
  Teams: TeamID[];
  Location: string;
  GameEvents: GameEvent[];
}

export interface Team {
  id: TeamID;
  Name: string;
  Location: string;
  Players: Player[];
}

export interface Player {
  id: PlayerID;
  Name: string;
  Number: number;
  DateOfBirth?: string;
  Image?: any; // TODO: Think about potentially adding Images for easier identification of players.
}

interface GameEvent {
  PlayerID: PlayerID;
}

type PlayerID = string;
type TeamID = string;
