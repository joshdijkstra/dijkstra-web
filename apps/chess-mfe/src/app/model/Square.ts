import { Piece } from './Piece';

export interface Square {
  piece: Piece;
  x: number;
  y: number;
  isWhite: boolean;
}
