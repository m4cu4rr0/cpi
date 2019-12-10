import {Component, OnInit} from '@angular/core';
import {RegistroService} from '../services/registro.service';
import {EncuestaModel} from '../model/encuesta.model';
import {MatTableDataSource} from '@angular/material';
import {EmpresasService} from '../services/empresas.service';
import {EmpresaModel} from '../model/empresa.model';
import {ConfirmationDialogService} from '../modal/confirmation-dialog/confirmation-dialog.service';
import {PersonaModel} from '../model/persona.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  constructor(public regSer: RegistroService, public empSer: EmpresasService,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  chartType = 'bar';
  displayedColumns: string[] = ['empresa', 'folio', 'personas', 'encuesta1', 'encuesta2', 'encuesta3', 'acciones'];
  dataSource;
  encuestas: EncuestaModel[];
  numPer: Array<{id: string, text: string}> = [];
  encuestaActual: EncuestaModel;
  personasEncuesta: PersonaModel[];

  chartDatasets: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'}
  ];

  chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  chartClicked(e: any): void {
  }

  chartHovered(e: any): void {
  }

  ngOnInit() {
    this.empSer.fetchEmpresas();
    this.regSer.fetchEncuestas().then(() => {
      this.regSer.getEncuestas().subscribe(resData => this.encuestas = resData);
      this.dataSource = new MatTableDataSource(this.encuestas);
      this.cargarNumPersonas();
    });
    this.encuestaActual = null;
  }

  doSomething(folio: string) {
    let empresa: EmpresaModel;
    let nomEmp: string;
    this.empSer.getEmpresa(folio).subscribe(resData => {
      empresa = resData as EmpresaModel;
      nomEmp = empresa.razonSocial;
    });

    return nomEmp;
  }

  cargarNumPersonas() {
    let numPer = 0;
    this.encuestas.forEach(encuesta => {
      this.regSer.personasFolio(encuesta.id).then( () => {
        this.regSer.getPersonas().subscribe( resData => {
          numPer = resData.length;
        });
        this.numPer.push({id : encuesta.id, text : numPer + '/' + encuesta.numPersonas });
      });
    });
  }

  obtenNumPer(folio: string) {
    let res = '';
    const per = this.numPer.find(x => x.id === folio);
    if (per !== undefined) {
      res = per.text;
    }
    return res;
  }

  deleteEncuesta(id: string) {
    this.regSer.deleteEncuesta(id).subscribe();
  }

  openConfirmationDialog(id: string) {
    this.confirmationDialogService.confirm('Eliminar Empresa', 'Estas seguro de eliminar la empresa?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.deleteEncuesta(id);
          this.regSer.fetchEncuestas().then(() => {
            this.regSer.getEncuestas().subscribe(resData => this.encuestas = resData);
            this.dataSource = new MatTableDataSource(this.encuestas);
            this.cargarNumPersonas();
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  seeEncuesta(encuesta: EncuestaModel) {
    this.encuestaActual = encuesta;
    this.regSer.personasFolio(encuesta.id).then(() => {
      this.regSer.getPersonas().subscribe( resData => {
        this.personasEncuesta = resData;
      });
    });
  }

}
