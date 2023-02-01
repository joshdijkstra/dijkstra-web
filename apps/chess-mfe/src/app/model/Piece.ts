export interface Piece {
  x: number;
  y: number;
  isWhite: boolean;
}

export enum Pieces {
  PAWN = 'PAWN',
  ROOK = 'ROOK',
  KNIGHT = 'KNIGHT',
  BISHOP = 'BISHOP',
  KING = 'KING',
  QUEEN = 'QUEEN',
}
