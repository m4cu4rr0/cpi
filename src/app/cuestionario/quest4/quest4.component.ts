import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quest4',
  templateUrl: './quest4.component.html',
  styleUrls: ['./quest4.component.scss']
})
export class Quest4Component implements OnInit {

  @Output() jsonSalida: EventEmitter<string> = new EventEmitter<string>();
  @Output() calificacionQ4: EventEmitter<number> = new EventEmitter<number>();
  json: string;
  error = 0;
  calificacion: number;


  quest4 = {
    preg1 : null,
    preg2 : null,
    preg3 : null,
    preg4 : null,
    preg5 : null,
    preg6 : null,
    preg7 : null,
    preg8 : null,
    preg9 : null,
    preg10 : null,
    preg11 : null,
    preg12 : null
  };

  constructor() { }

  ngOnInit() {}

  terminar() {
    if (this.quest4.preg1 === null ||
      this.quest4.preg2 === null ||
      this.quest4.preg3 === null ||
      this.quest4.preg4 === null ||
      this.quest4.preg5 === null ||
      this.quest4.preg6 === null ||
      this.quest4.preg7 === null ||
      this.quest4.preg8 === null ||
      this.quest4.preg9 === null ||
      this.quest4.preg10 === null ||
      this.quest4.preg11 === null ||
      this.quest4.preg12 === null ) {
      this.error = 1;
    } else {
      this.salir();
    }
  }

  salir() {
    this.json = JSON.stringify(this.quest4);
    this.calificaQuest();
    this.jsonSalida.emit(this.json);
    this.calificacionQ4.emit(this.calificacion);
  }

  calificaQuest() {
    const total = +this.quest4.preg1 +
      +this.quest4.preg2 +
      +this.quest4.preg3 +
      +this.quest4.preg4 +
      +this.quest4.preg5 +
      +this.quest4.preg6 +
      +this.quest4.preg7 +
      +this.quest4.preg8 +
      +this.quest4.preg9 +
      +this.quest4.preg10 +
      +this.quest4.preg11 +
      +this.quest4.preg12;
    if (total < 18) {
      this.calificacion = 1;
    }  else if (total < 30) {
      this.calificacion = 2;
    } else if (total < 42) {
      this.calificacion = 3;
    } else if (total < 54) {
      this.calificacion = 4;
    } else if (total < 64) {
      this.calificacion = 5;
    } else {
      this.calificacion = 6;
    }
  }
}
