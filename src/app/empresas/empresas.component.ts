import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EmpresaModel} from '../model/empresa.model';
import {MatDialog} from '@angular/material';
import {NuevaEmpresaComponent} from '../modal/nueva-empresa/nueva-empresa.component';
import {EmpresasService} from '../services/empresas.service';
import {ConfirmationDialogService} from '../modal/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  displayedColumns: string[] = ['razonSocial', 'contacto', 'mail', 'telefono', 'accion'];
  dataSource;
  empresas: EmpresaModel[];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public dialog: MatDialog,
              public empService: EmpresasService,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit() {
    this.cargarEmpresa();
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(NuevaEmpresaComponent, {
      width: '350px',
      data: {id},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarEmpresa();
    });
  }

  cargarEmpresa() {
    this.empService.fetchEmpresas().then(() => {
      this.empService.getEmpresas().subscribe(empresas => {
        this.empresas = empresas;
      });
      this.dataSource = new MatTableDataSource(this.empresas);
    });
  }

  deleteEmpresa(id: string) {
    this.empService.deleteEmpresa(id).subscribe();
  }

  openConfirmationDialog(id: string) {
    this.confirmationDialogService.confirm('Eliminar Empresa', 'Estas seguro de eliminar la empresa?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.deleteEmpresa(id);
          this.empService.fetchEmpresas().then(() => {
            this.cargarEmpresa();
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
