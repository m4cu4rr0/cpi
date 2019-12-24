import {Component, Inject, OnInit} from '@angular/core';
import {EmpresaModel} from '../model/empresa.model';
import {EmpresasService} from '../services/empresas.service';
import {Router} from '@angular/router';
import {EncuestaModel} from '../model/encuesta.model';
import {RegistroService} from '../services/registro.service';
import {MatDialog} from '@angular/material';
import {LoadingComponent} from '../modal/loading/loading.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  encuesta: EncuestaModel;
}

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  empresas: EmpresaModel[];
  nuevaEncuesta: EncuestaModel;
  error = 0;
  newId: string;

  dialogRef: any;

  area: string;

  constructor(public empService: EmpresasService,
              private router: Router,
              private regService: RegistroService,
              public dialog: MatDialog,
              public dialogRefAc: MatDialogRef<EncuestaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.nuevaEncuesta = data.encuesta;
  }

  ngOnInit() {
    this.cargarEmpresa();
    if (this.nuevaEncuesta ) {
      // console.log(this.nuevaEncuesta);
    } else {
      this.nuevaEncuesta = new EncuestaModel(null, null, null, false, false, false, []);
    }
    this.newId = null;
  }

  cargarEmpresa() {
    this.empService.fetchEmpresas().then(() => {
      this.empService.getEmpresas().subscribe(empresas => {
        this.empresas = empresas;
      });
    });
  }

  cancelar() {
    this.router.navigateByUrl('/home');
  }

  save() {
    if (this.nuevaEncuesta.idEmpresa != null && this.nuevaEncuesta.numPersonas != null) {
      this.openDialog('Creando encuesta');
      this.regService.agregarEncuesta(this.nuevaEncuesta).then( () => {
        this.newId = this.regService.uniqueId;
        setTimeout(() => {
          this.closeDialog();
        }, 1000);
        // console.log('ID:' + this.newId);
      });
    } else {
      this.error = 1;
    }
  }
  openDialog(mensaje: string): void {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      width: '700px',
      data: {mensaje},
      disableClose: true
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  cerrar(): void {
    this.dialogRefAc.close();
  }

  update() {
    if (this.nuevaEncuesta.idEmpresa != null && this.nuevaEncuesta.numPersonas != null) {
      this.openDialog('Actualizando encuesta');
      this.regService.updateEmpresa(this.nuevaEncuesta).subscribe( resData => {
        // console.log(resData);
        setTimeout(() => {
          this.closeDialog();
          this.cerrar();
        }, 1000);
      });
    } else {
      this.error = 1;
    }
  }

  addArea() {
    if (this.area !== '') {
    this.nuevaEncuesta.areas.push(this.area);
    this.area = '';
    }
  }

}
