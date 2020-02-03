import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quest5',
  templateUrl: './quest5.component.html',
  styleUrls: ['./quest5.component.scss']
})
export class Quest5Component implements OnInit {

  @Output() jsonSalida: EventEmitter<string> = new EventEmitter<string>();
  @Output() calificacion1Q5: EventEmitter<number> = new EventEmitter<number>();
  @Output() calificacion2Q5: EventEmitter<number> = new EventEmitter<number>();
  seccion = 1;
  json: string;
  error = 0;
  calificacion1: number;
  calificacion2: number;


  quest5 = {
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
    preg12 : null,
    preg13 : null,
    preg14 : null,
    preg15 : null
  };

  constructor() { }

  ngOnInit() {}

  anterior() {
    window.scroll(0, 0);
    this.seccion--;
  }

  siguiente() {
    if (this.seccion == 1) {
      if (this.quest5.preg1 === null ||
        this.quest5.preg2 === null ||
        this.quest5.preg3 === null ||
        this.quest5.preg4 === null ||
        this.quest5.preg5 === null ||
        this.quest5.preg6 === null ||
        this.quest5.preg7 === null ) {
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
      }
    } else {
      if ( this.quest5.preg8 === null ||
        this.quest5.preg9 === null ||
        this.quest5.preg10 === null ||
        this.quest5.preg11 === null ||
        this.quest5.preg12 === null ||
        this.quest5.preg13 === null ||
        this.quest5.preg14 === null ||
        this.quest5.preg15 === null ) {
        this.error = 1;
      } else {
        this.salir();
      }
    }
  }

  salir() {
    this.json = JSON.stringify(this.quest5);
    this.calificaQuest();
    this.jsonSalida.emit(this.json);
    this.calificacion1Q5.emit(this.calificacion1);
    this.calificacion2Q5.emit(this.calificacion2);
  }

  calificaQuest() {
    const total1 = +this.quest5.preg1 +
      +this.quest5.preg2 +
      +this.quest5.preg3 +
      +this.quest5.preg4 +
      +this.quest5.preg5 +
      +this.quest5.preg6 +
      +this.quest5.preg7;
    if (total1 < 14) {
      this.calificacion1 = 1;
    }  else if (total1 < 35) {
      this.calificacion1 = 2;
    } else {
      this.calificacion1 = 3;
    }
    const total2 = +this.quest5.preg8 +
      +this.quest5.preg9 +
      +this.quest5.preg10 +
      +this.quest5.preg11 +
      +this.quest5.preg12 +
      +this.quest5.preg13 +
      +this.quest5.preg14 +
      +this.quest5.preg15;
    if (total2 < 20) {
      this.calificacion2 = 1;
    }  else if (total2 < 44) {
      this.calificacion2 = 2;
    } else {
      this.calificacion2 = 3;
    }
  }

}
