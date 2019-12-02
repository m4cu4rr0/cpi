import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogData {
    mensaje: string;
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  mensaje: string;

    constructor(public dialogRef: MatDialogRef<LoadingComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.mensaje = data.mensaje;
    }

  ngOnInit() {
  }

}
