import { Component, OnInit } from '@angular/core';
import {PersonaModel} from '../model/persona.model';
import {MatDialog} from '@angular/material';
import {LoadingComponent} from '../modal/loading/loading.component';
import {RegistroService} from '../services/registro.service';
import {EncuestaModel} from '../model/encuesta.model';
import { Quest2Model } from '../model/quest2.model';
import { Quest3Model } from '../model/quest3.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  cuestionario = 0;
  nuevaPersona: PersonaModel;
  error = 0;
  folio: string;
  encuestaActual: EncuestaModel;
  dialogRef: any;
  msj: string;
  quest2Res: Quest2Model;
  quest3Res: Quest3Model;

  constructor(public dialog: MatDialog, private regService: RegistroService) { }

  ngOnInit() {
    this.nuevaPersona = new PersonaModel(null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.regService.fetchEncuestas();
    this.error = 0;
  }

  validarFolio() {
    if (this.folio != null) {
      this.openDialog('Validando folio ' + this.folio + ' por favor espere');
      this.regService.getEncuesta(this.folio).subscribe(encuesta => {
        this.encuestaActual = encuesta as EncuestaModel;
      });
      setTimeout(() => {
        this.closeDialog();
        if (this.encuestaActual.id != null) {
          let numPer = 0;
          this.regService.personasFolio(this.encuestaActual.id).then( () => {
            this.regService.getPersonas().subscribe( resData => {
              numPer = resData.length;
            });
          });
          if (numPer < this.encuestaActual.numPersonas) {
            this.error = 0;
            this.cuestionario = 1;
            this.nuevaPersona.folio = this.encuestaActual.id;
          } else {
            this.msj = 'Lleno el número de encuestas permitidas para este Folio';
          }
        } else {
          this.msj = 'Folio Invalido';
        }
      }, 1500);

    } else {
      this.msj = 'Favor de ingresar folio';
      this.error = 1;
    }
  }

  save() {
    if (this.nuevaPersona.contratacion !== null &&
      this.nuevaPersona.departamento !== null &&
      this.nuevaPersona.edad !== null &&
      this.nuevaPersona.edoCivil !== null &&
      this.nuevaPersona.estudios !== null &&
      this.nuevaPersona.expActual !== null &&
      this.nuevaPersona.expTotal !== null &&
      this.nuevaPersona.jornada !== null &&
      this.nuevaPersona.nombre !== null &&
      this.nuevaPersona.ocupacion !== null &&
      this.nuevaPersona.personal !== null &&
      this.nuevaPersona.puesto !== null &&
      this.nuevaPersona.rotacion !== null &&
      this.nuevaPersona.sexo !== null) {
      this.cuestionario = 2;
    } else {
      this.error = 1;
    }
  }

  openDialog(mensaje: string): void {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      width: '350px',
      data: {mensaje},
      disableClose: true
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  questionario1() {
    if (this.nuevaPersona.quest1 === null) {
      this.cuestionario = 3;
    }
  }

  salidaQuest1($event) {
    this.nuevaPersona.quest1 = $event;
    this.cuestionario = 2;
  }

  salidaBoolean($event) {
    this.nuevaPersona.atencionQ1 = $event;
  }

  questionario2() {
    if (this.nuevaPersona.quest2 === null) {
      this.cuestionario = 4;
    }
  }

  questionario3() {
    if (this.nuevaPersona.quest3 === null) {
      this.cuestionario = 5;
    }
  }

  salidaQuest2($event) {
    this.nuevaPersona.quest2 = $event;
    this.cuestionario = 2;
  }

  salidaQuest3($event) {
    this.nuevaPersona.quest3 = $event;
    this.cuestionario = 2;
  }

  salidaRes2($event) {
    this.quest2Res = $event;
  }

  salidaRes3($event) {
    this.quest3Res = $event;
  }

  terminar() {
    let id: string;
    this.regService.agregarPersona(this.nuevaPersona).then( resData => {
      console.log(resData);
      id = this.regService.uniqueId;
      console.log(id);
      this.quest2Res.idPersona = id;
      this.quest3Res.idPersona = id;
      this.regService.agregarQuest2(this.quest2Res);
      this.regService.agregarQuest3(this.quest3Res);
    });
    this.cuestionario = 6;
  }

  cerrar() {
    this.cuestionario = 0;
    this.nuevaPersona = new PersonaModel(null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.error = 0;
    this.folio = null;
  }


}
