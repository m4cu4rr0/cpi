import {Component, Inject, OnInit} from '@angular/core';
import {PersonaModel} from '../../model/persona.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  persona: PersonaModel;
}
@Component({
  selector: 'app-datos-persona',
  templateUrl: './datos-persona.component.html',
  styleUrls: ['./datos-persona.component.scss']
})
export class DatosPersonaComponent implements OnInit {

  personaActual: PersonaModel;

  constructor(public dialogRef: MatDialogRef<DatosPersonaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.personaActual = data.persona;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
