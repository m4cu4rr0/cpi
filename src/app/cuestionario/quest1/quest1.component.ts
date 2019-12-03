import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quest1',
  templateUrl: './quest1.component.html',
  styleUrls: ['./quest1.component.scss']
})
export class Quest1Component implements OnInit {

  @Output() jsonSalida: EventEmitter<string> = new EventEmitter<string>();
  seccion = 1;
  json: string;


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
    preg20 : null,
  };

  constructor() { }

  ngOnInit() {
      }

  anterior() {
        window.scroll(0, 0);
        this.seccion--;
      }

  siguiente() {
        window.scroll(0, 0);
        this.seccion++;
      }

  salir() {
        this.jsonSalida.emit(this.json);
      }

}
