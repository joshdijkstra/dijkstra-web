/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  animationFrameScheduler,
  fromEvent,
  map,
  subscribeOn,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Pieces } from '../model/Piece';

declare var SockJS;
declare var Stomp;
@Component({
  selector: 'dijkstra-web-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  board: any;
  activeElement: any;
  originalX: any;
  originalY: any;
  activeX: any;
  activeY: any;
  offsetTop: any;
  offsetLeft: any;
  playerWhite = true;
  promoting = false;

  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
  }
  public stompClient: any;
  public msg: any;
  public callback: any;

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect(
      { login: 'mylogin', passcode: 'mypasscode' },
      function (frame: any) {
        that.stompClient.subscribe('/message', (message: any) => {
          if (message.body) {
            // console.log(JSON.parse(message.body))
            that.diplayPieces(JSON.parse(message.body));
          }
        });
        that.stompClient.send('/app/send/message', {});
      }
    );
  }

  axisVertical = ['1', '2', '3', '4', '5', '6', '7', '8'];
  axisHorizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  url = 'api/v1/game';

  ngOnInit() {
    // this.showBoard();
    const chessboard = document.getElementById('chessboard');
    if (chessboard != undefined) {
      this.offsetLeft = chessboard?.offsetLeft;
      this.offsetTop = chessboard?.offsetTop;
    }
  }

  // public getBoard = () => {
  //   let header = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get(this.url, { headers: header });
  // };

  public makeMove = (
    atX: number,
    atY: number,
    toX: number,
    toY: number,
    promote?: string
  ) => {
    let requestBody: string =
      this.axisHorizontal[atX] +
      this.axisVertical[atY] +
      this.axisHorizontal[toX] +
      this.axisVertical[toY];
    if (promote) {
      requestBody += promote;
    }
    this.stompClient.send('/app/ws-makemove', {}, requestBody);
  };

  public isSquareAttacked = (x: number, y: number) => {
    return this.board.squares[x][y].attackedWhite;
  };

  public isLegalSquare = (x: number, y: number) => {
    if (
      this.activeX != null &&
      this.activeY != null &&
      this.board != undefined
    ) {
      const moves =
        this.board.squares[this.activeX][this.activeY].piece.legalMoves;
      const includesArray = (data: any[], arr: any[]) => {
        return data.some(
          (e) => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o))
        );
      };
      return includesArray(moves, [x, y]);
    }

    return false;
  };

  public hasPieceOn = (x: number, y: number) => {
    if (this.board != undefined && this.board.squares[x][y].piece != null) {
      return true;
    } else {
      return false;
    }
  };

  public lookUpImage = (x: number, y: number) => {
    const colour = this.board.squares[x][y].piece.isWhite ? 'w' : 'b';
    switch (this.board.squares[x][y].piece.pieceType) {
      case Pieces.PAWN:
        return `assets/pawn_${colour}.png`;
      case Pieces.ROOK:
        return `assets/rook_${colour}.png`;
      case Pieces.KNIGHT:
        return `assets/knight_${colour}.png`;
      case Pieces.BISHOP:
        return `assets/bishop_${colour}.png`;
      case Pieces.KING:
        return `assets/king_${colour}.png`;
      case Pieces.QUEEN:
        return `assets/queen_${colour}.png`;
      default:
        return ``;
    }
  };

  public diplayPieces = (res: any) => {
    this.board = res;
    console.log(res);
    return res;
  };

  public grabPiece = (e: MouseEvent) => {
    const box = e.target as HTMLElement;
    const element = e.target as HTMLElement;
    this.originalX = element.offsetLeft;
    this.originalY = element.offsetTop;
    this.activeElement = element;
    this.activeX = Math.floor((e.clientX - this.offsetLeft) / 100);
    this.activeY = this.playerWhite
      ? Math.abs(Math.ceil((e.clientY - this.offsetTop - 800) / 100))
      : 7 - Math.abs(Math.ceil((e.clientY - this.offsetTop - 800) / 100));

    const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap((start) => {
        return mousemove$.pipe(
          map((move) => {
            move.preventDefault();
            return {
              left: move.clientX - start.offsetX - 50,
              top: move.clientY - start.offsetY - 50,
            };
          }),
          takeUntil(mouseup$)
        );
      })
    );
    const position$ = drag$.pipe(subscribeOn(animationFrameScheduler));

    position$.subscribe((pos) => {
      box.style.top = `${pos.top}px`;
      box.style.left = `${pos.left}px`;
    });
  };

  public dropPiece = (e: MouseEvent) => {
    if (this.activeElement) {
      const targetX = Math.floor((e.clientX - this.offsetLeft) / 100);
      const targetY = this.playerWhite
        ? Math.abs(Math.ceil((e.clientY - this.offsetTop - 800) / 100))
        : 7 - Math.abs(Math.ceil((e.clientY - this.offsetTop - 800) / 100));
      if (this.isLegalSquare(targetX, targetY)) {
        this.makeMove(this.activeX, this.activeY, targetX, targetY);
      } else {
        this.activeElement.style.position = 'absolute';
        this.activeElement.style.left = `${this.originalX}px`;
        this.activeElement.style.top = `${this.originalY}px`;
      }
      this.activeElement = null;
      this.activeX = null;
      this.activeY = null;
      this.originalX = null;
      this.originalY = null;
    }
  };

  public promote = (x: number, y: number) => {
    this.promoting = true;
    this.makeMove(this.activeX, this.activeY, x, y);
  };
}
