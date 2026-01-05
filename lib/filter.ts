import { CardGame, GameConstraints } from './types';
import gamesData from '../data/games.json';

const { games } = gamesData as { games: CardGame[] };

export function filterGames(constraints: GameConstraints): CardGame[] {
  return games.filter((game) => {
    // Check player count
    if (constraints.players < game.minPlayers || constraints.players > game.maxPlayers) {
      return false;
    }

    // Check deck count
    if (constraints.decks < game.decks) {
      return false;
    }

    // Check joker requirement
    if (game.requiresJokers && !constraints.hasJokers) {
      return false;
    }

    return true;
  });
}

export function getAllGames(): CardGame[] {
  return games;
}

