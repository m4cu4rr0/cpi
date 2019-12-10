import { Component, OnInit } from '@angular/core';
import {EmpresaModel} from '../model/empresa.model';
import {EmpresasService} from '../services/empresas.service';
import {Router} from '@angular/router';
import {EncuestaModel} from '../model/encuesta.model';
import {RegistroService} from '../services/registro.service';
import {MatDialog} from '@angular/material';
import {LoadingComponent} from '../modal/loading/loading.component';

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

  constructor(public empService: EmpresasService,
              private router: Router,
              private regService: RegistroService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.cargarEmpresa();
    this.nuevaEncuesta = new EncuestaModel(null, null, null, false, false, false );
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
      width: '350px',
      data: {mensaje},
      disableClose: true
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
