import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quest2',
  templateUrl: './quest2.component.html',
  styleUrls: ['./quest2.component.scss']
})
export class Quest2Component implements OnInit {

  @Output() jsonSalida: EventEmitter<string> = new EventEmitter<string>();
  seccion = 1;
  json: string;
  error = 0;
  serCliente: number;
  esJefe: number;
  progreso: number;

  quest2 = {
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
    preg21 : null,
    preg22 : null,
    preg23 : null,
    preg24 : null,
    preg25 : null,
    preg26 : null,
    preg27 : null,
    preg28 : null,
    preg29 : null,
    preg30 : null,
    preg31 : null,
    preg32 : null,
    preg33 : null,
    preg34 : null,
    preg35 : null,
    preg36 : null,
    preg37 : null,
    preg38 : null,
    preg39 : null,
    preg40 : null,
    preg41 : null,
    preg42 : null,
    preg43 : null,
    preg44 : null,
    preg45 : null,
    preg46 : null,
  }

  constructor() { }

  ngOnInit() {
    this.progreso = 0;
  }

  anterior() {
    window.scroll(0, 0);
    this.seccion--;
  }

  siguiente() {
    if(this.seccion == 1){
      if(this.quest2.preg1 === null ||
        this.quest2.preg2 === null ||
        this.quest2.preg3 === null ||
        this.quest2.preg4 === null ||
        this.quest2.preg5 === null ||
        this.quest2.preg6 === null ||
        this.quest2.preg7 === null ||
        this.quest2.preg8 === null ||
        this.quest2.preg9 === null ){
        this.error = 1;
      }else{
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 19.8;
      }
    } else if (this.seccion == 2){
      if(this.quest2.preg10 === null ||
        this.quest2.preg11 === null ||
        this.quest2.preg12 === null ||
        this.quest2.preg13 === null ){
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 28.6;
      }
    } else if (this.seccion == 3){
      if(this.quest2.preg14 === null ||
        this.quest2.preg15 === null ||
        this.quest2.preg16 === null ||
        this.quest2.preg17 === null ){
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 37.4;
      }
    } else if (this.seccion == 4){
      if(this.quest2.preg18 === null ||
        this.quest2.preg19 === null ||
        this.quest2.preg20 === null ||
        this.quest2.preg21 === null ||
        this.quest2.preg22 === null ){
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 48.4;
      }
    } else if (this.seccion == 5){
      if(this.quest2.preg23 === null ||
        this.quest2.preg24 === null ||
        this.quest2.preg25 === null ||
        this.quest2.preg26 === null ||
        this.quest2.preg27 === null ){
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 59.4;
      }
    } else if (this.seccion == 6){
      if(this.quest2.preg28 === null ||
        this.quest2.preg29 === null ||
        this.quest2.preg30 === null ||
        this.quest2.preg31 === null ||
        this.quest2.preg32 === null ||
        this.quest2.preg33 === null ||
        this.quest2.preg34 === null ||
        this.quest2.preg35 === null ||
        this.quest2.preg36 === null ||
        this.quest2.preg37 === null ||
        this.quest2.preg38 === null ||
        this.quest2.preg39 === null ||
        this.quest2.preg40 === null ){
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 88;
      }
    } else if (this.seccion == 7){
      if(this.quest2.preg41 === null ||
        this.quest2.preg42 === null ||
        this.quest2.preg43 === null ){
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion++;
        this.error = 0;
        this.progreso = 94.6;
      }
    } else if (this.seccion == 8){
      if(this.quest2.preg44 === null ||
        this.quest2.preg45 === null ||
        this.quest2.preg46 === null ){
        this.error = 1;
      } else {
        window.scroll(0, 0);
        this.seccion = 1;
        this.error = 0;
        this.calificarQuest();
        this.salir()
      }
    }
  }

  salir() {
    this.json = JSON.stringify(this.quest2);
    this.jsonSalida.emit(this.json);
  }

  clienteChange($event){
    if(this.serCliente == 0){
      this.quest2.preg41 = '0';
      this.quest2.preg42 = '0';
      this.quest2.preg43 = '0';
    }
  }

  jefeChange($event){
    if(this.esJefe == 0){
      this.quest2.preg44 = '0';
      this.quest2.preg45 = '0';
      this.quest2.preg46 = '0';
    }
  }

  calificarQuest(){
    let calificacion: number = 0;
    for(let preg in this.quest2){
      calificacion += +this.quest2[preg];
    }
    let ambienteTrabajo: number = +this.quest2.preg1 + +this.quest2.preg2 + +this.quest2.preg3;
    let factoresActividad: number =  +this.quest2.preg4 +
      +this.quest2.preg9 +
      +this.quest2.preg5 +
      +this.quest2.preg6 +
      +this.quest2.preg7 +
      +this.quest2.preg8 +
      +this.quest2.preg41 +
      +this.quest2.preg42 +
      +this.quest2.preg43;
  }

}
