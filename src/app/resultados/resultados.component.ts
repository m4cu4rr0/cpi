import {Component, OnInit} from '@angular/core';
import {RegistroService} from '../services/registro.service';
import {EncuestaModel} from '../model/encuesta.model';
import {MatTableDataSource} from '@angular/material';
import {EmpresasService} from '../services/empresas.service';
import {EmpresaModel} from '../model/empresa.model';
import {ConfirmationDialogService} from '../modal/confirmation-dialog/confirmation-dialog.service';
import {PersonaModel} from '../model/persona.model';
import {MatDialog} from '@angular/material/dialog';
import {DatosPersonaComponent} from '../modal/datos-persona/datos-persona.component';
import {Quest2Model} from '../model/quest2.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public regSer: RegistroService,
              public empSer: EmpresasService,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  chartType = 'bar';
  displayedColumns: string[] = ['empresa', 'folio', 'personas', 'encuesta1', 'encuesta2', 'encuesta3', 'acciones'];
  dataSource;
  encuestas: EncuestaModel[];
  numPer: Array<{ id: string, text: string }> = [];
  encuestaActual: EncuestaModel;
  personasEncuesta: PersonaModel[];

  chartCalFinal: Array<any> = null;

  chartLabels: Array<any> = ['Nulo o despreciable', 'Bajo', 'Medio', 'Alto', 'Muy alto'];

  chartColors: Array<any> = [
    {
      backgroundColor: [
        '#9BE5F7',
        '#6BF56E',
        '#FFFF00',
        '#FFC000',
        '#FF0000'
      ],
      borderColor: [
        '#9BE5F7',
        '#6BF56E',
        '#FFFF00',
        '#FFC000',
        '#FF0000'
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
    this.cargarEncuesta();
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
    if (this.encuestas !== undefined) {
      this.encuestas.forEach(encuesta => {
        this.regSer.personasFolio(encuesta.id).then(() => {
          this.regSer.getPersonas().subscribe(resData => {
            numPer = resData.length;
          });
          this.numPer.push({id: encuesta.id, text: numPer + '/' + encuesta.numPersonas});
        });
      });
    }
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
          this.regSer.fetchEncuestas().then(() => this.cargarEncuesta());
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  seeEncuesta(encuesta: EncuestaModel) {
    this.encuestaActual = encuesta;
    this.regSer.personasFolio(encuesta.id).then(() => {
      this.regSer.getPersonas().subscribe(resData => {
        this.personasEncuesta = resData;
      });
      this.cargarQuest2();
    });
  }

  openDialog(persona: PersonaModel): void {
    const dialogRef = this.dialog.open(DatosPersonaComponent, {
      width: '600px',
      data: {persona},
      disableClose: true
    });
  }

  cargarEncuesta() {
    this.regSer.fetchEncuestas().then(() => {
      this.regSer.getEncuestas().subscribe(resData => {
        this.encuestas = resData;
      });
      this.cargarNumPersonas();
      this.dataSource = new MatTableDataSource(this.encuestas);
    });
  }

  cargarQuest2() {
    const ids: string[] = [];
    let nulo = 0;
    let bajo = 0;
    let medio = 0;
    let alto = 0;
    let muyAlto = 0;
    let quest2;
    this.personasEncuesta.forEach(p => ids.push(p.id));
    this.regSer.quest2Personas(ids).then(() => {
      this.regSer.getQuest2().subscribe(resData => {
        quest2 = resData;
        console.log(quest2);
      });
      quest2.forEach(q => {
        if (q.calificacion < 20) {
          nulo++;
        } else if (q.calificacion < 45) {
          bajo++;
        } else if (q.calificacion < 70) {
          medio++;
        } else if (q.calificacion < 90) {
          alto++;
        } else {
          muyAlto++;
        }
      });
      this.chartCalFinal = [
        {data: [nulo, bajo, medio, alto, muyAlto], label: 'Calificación Final'}
      ];
    });
  }

}
