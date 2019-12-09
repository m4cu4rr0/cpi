import {Component, OnInit} from '@angular/core';
import {RegistroService} from '../services/registro.service';
import {EncuestaModel} from '../model/encuesta.model';
import {MatTableDataSource} from '@angular/material';
import {EmpresasService} from '../services/empresas.service';
import {EmpresaModel} from '../model/empresa.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  constructor(public regSer: RegistroService, public empSer: EmpresasService) {
  }

  chartType = 'bar';
  displayedColumns: string[] = ['empresa', 'folio', 'personas', 'encuesta1', 'encuesta2', 'encuesta3', 'acciones'];
  dataSource;
  encuestas: EncuestaModel[];

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
    });
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

  cargarNumPersonas(folio: string) {
    let numPer = 0;
    this.regSer.personasFolio(folio).then(() => {
      this.regSer.getPersonas().subscribe(resData => {
        console.log(resData);
        numPer = resData.length;
        console.log(numPer);
      });
    });
    return numPer;
  }

}
