export interface CardGame {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  decks: number;
  requiresJokers?: boolean;
  worksWithMissingCards?: boolean;
  maxMissingCards?: number; // Maximum number of cards that can be missing
  specialRequirements?: string[];
  variantOf?: string; // ID of the base game this is a variant of
}

export interface GameConstraints {
  players: number;
  decks: number;
  hasJokers?: boolean;
}

export interface GamesData {
  games: CardGame[];
}

