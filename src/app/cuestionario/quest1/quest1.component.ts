import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quest1',
  templateUrl: './quest1.component.html',
  styleUrls: ['./quest1.component.scss']
})
export class Quest1Component implements OnInit {

  @Output() jsonSalida: EventEmitter<string> = new EventEmitter<string>();
  @Output() atencionQ1: EventEmitter<boolean> = new EventEmitter<boolean>();
  seccion = 1;
  json: string;
  error = 0;
  atencion: boolean;
  progreso: number;


  quest1 = {
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
    preg15 : null,
    preg16 : null,
    preg17 : null,
    preg18 : null,
    preg19 : null,
    preg20 : null
  };

  constructor() { }

  ngOnInit() {
    this.progreso = 0;
  }

  anterior() {
    window.scroll(0, 0);
    this.seccion--;
  }

  siguiente() {
    if (this.seccion === 1) {
      if (this.quest1.preg1 === null ||
        this.quest1.preg2 === null ||
        this.quest1.preg3 === null ||
        this.quest1.preg4 === null ||
        this.quest1.preg5 === null ||
        this.quest1.preg6 === null ) {
        this.error = 1;
      } else {
        if (this.quest1.preg1 === '0' &&
          this.quest1.preg2 === '0' &&
          this.quest1.preg3 === '0' &&
          this.quest1.preg4 === '0' &&
          this.quest1.preg5 === '0' &&
          this.quest1.preg6 === '0' ) {
          this.quest1.preg7 = '0';
          this.quest1.preg8 = '0';
          this.quest1.preg9 = '0';
          this.quest1.preg10 = '0';
          this.quest1.preg11 = '0';
          this.quest1.preg12 = '0';
          this.quest1.preg13 = '0';
          this.quest1.preg14 = '0';
          this.quest1.preg15 = '0';
          this.quest1.preg16 = '0';
          this.quest1.preg17 = '0';
          this.quest1.preg18 = '0';
          this.quest1.preg19 = '0';
          this.quest1.preg20 = '0';
          this.salir();
        } else {
          window.scroll(0, 0);
          this.seccion++;
          this.error = 0;
          this.progreso = 30;
        }
      }
    } else if (this.seccion === 2) {
      if (this.quest1.preg7 === null ||
        this.quest1.preg8 === null ) {
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 40;
      }
    } else if (this.seccion === 3) {
      if (this.quest1.preg9 === null ||
        this.quest1.preg10 === null ||
        this.quest1.preg11 === null ||
        this.quest1.preg12 === null ||
        this.quest1.preg13 === null ||
        this.quest1.preg14 === null ||
        this.quest1.preg15 === null) {
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 75;
      }
    } else if (this.seccion === 4) {
      if (this.quest1.preg16 === null ||
        this.quest1.preg17 === null ||
        this.quest1.preg18 === null ||
        this.quest1.preg19 === null ||
        this.quest1.preg20 === null) {
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion = 1;
        this.error = 0;
        this.salir();
      }
    }
  }

  salir() {
    this.json = JSON.stringify(this.quest1);
    this.validaAtencion();
    this.jsonSalida.emit(this.json);
    this.atencionQ1.emit(this.atencion);
  }

  validaAtencion() {
    const  val1 = +this.quest1.preg7 + +this.quest1.preg8 ;
    const  val2 = +this.quest1.preg9 +
      +this.quest1.preg10 +
      +this.quest1.preg11 +
      +this.quest1.preg12 +
      +this.quest1.preg13 +
      +this.quest1.preg14 +
      +this.quest1.preg15 ;
    const  val3 = +this.quest1.preg16 +
      +this.quest1.preg17 +
      +this.quest1.preg18 +
      +this.quest1.preg19 +
      +this.quest1.preg20;
    if (val1 > 0) {
      this.atencion = true;
    } else if (val2 > 2) {
      this.atencion = true;
    } else if (val3 > 1) {
      this.atencion = true;
    } else {
      this.atencion = false;
    }
  }

}
