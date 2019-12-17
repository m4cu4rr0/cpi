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
import {EncuestaComponent} from '../encuesta/encuesta.component';

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

  chartAmbienteTrabajo: Array<any> = null;
  chartFactoresActividad: Array<any> = null;
  chartOrganizacionTiempo: Array<any> = null;
  chartLideranzoRelaciones: Array<any> = null;

  chartCondicionesTrabajo: Array<any> = null;
  chartCargaTrabajo: Array<any> = null;
  chartFaltaControl: Array<any> = null;
  chartJornadaTrabajo: Array<any> = null;
  chartInterferenciaRelacion: Array<any> = null;
  chartLiderazgo: Array<any> = null;
  chartRelacionesTrabajo: Array<any> = null;
  chartViolencia: Array<any> = null;

  chart3CalFinal: Array<any> = null;

  chart3AmbienteTrabajo: Array<any> = null;
  chart3FactoresActividad: Array<any> = null;
  chart3OrganizacionTiempo: Array<any> = null;
  chart3LideranzoRelaciones: Array<any> = null;
  chart3EntornoOrganizacional: Array<any> = null;

  chart3CondicionesTrabajo: Array<any> = null;
  chart3CargaTrabajo: Array<any> = null;
  chart3FaltaControl: Array<any> = null;
  chart3JornadaTrabajo: Array<any> = null;
  chart3InterferenciaRelacion: Array<any> = null;
  chart3Liderazgo: Array<any> = null;
  chart3RelacionesTrabajo: Array<any> = null;
  chart3Violencia: Array<any> = null;
  chart3ReconocimientoDesemp: Array<any> = null;
  chart3InsuficientePertenencia: Array<any> = null;

  q1Class = 'cuerpoQuest';
  q21Class = 'noPrint';
  q22Class = 'noPrint';
  q23Class = 'noPrint';
  q31Class = 'noPrint';
  q32Class = 'noPrint';
  q33Class = 'noPrint';
  checked: boolean;
  imagen = 'imagen2';

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
    this.numPer = [];
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
      this.cargarQuest3();
    });
  }

  openDialog(persona: PersonaModel): void {
    const dialogRef = this.dialog.open(DatosPersonaComponent, {
      width: '300px',
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
    let n1 = 0;
    let b1 = 0;
    let m1 = 0;
    let a1 = 0;
    let mA1 = 0;
    let n2 = 0;
    let b2 = 0;
    let m2 = 0;
    let a2 = 0;
    let mA2 = 0;
    let n3 = 0;
    let b3 = 0;
    let m3 = 0;
    let a3 = 0;
    let mA3 = 0;
    let n4 = 0;
    let b4 = 0;
    let m4 = 0;
    let a4 = 0;
    let mA4 = 0;
    let n5 = 0;
    let b5 = 0;
    let m5 = 0;
    let a5 = 0;
    let mA5 = 0;
    let n6 = 0;
    let b6 = 0;
    let m6 = 0;
    let a6 = 0;
    let mA6 = 0;
    let n7 = 0;
    let b7 = 0;
    let m7 = 0;
    let a7 = 0;
    let mA7 = 0;
    let n8 = 0;
    let b8 = 0;
    let m8 = 0;
    let a8 = 0;
    let mA8 = 0;
    let n9 = 0;
    let b9 = 0;
    let m9 = 0;
    let a9 = 0;
    let mA9 = 0;
    let n10 = 0;
    let b10 = 0;
    let m10 = 0;
    let a10 = 0;
    let mA10 = 0;
    let n11 = 0;
    let b11 = 0;
    let m11 = 0;
    let a11 = 0;
    let mA11 = 0;
    let n12 = 0;
    let b12 = 0;
    let m12 = 0;
    let a12 = 0;
    let mA12 = 0;
    let n13 = 0;
    let b13 = 0;
    let m13 = 0;
    let a13 = 0;
    let mA13 = 0;
    let quest2;

    this.personasEncuesta.forEach(p => ids.push(p.id));
    this.regSer.quest2Personas(ids).then(() => {
      this.regSer.getQuest2().subscribe(resData => {
        quest2 = resData;
        // console.log(quest2);
      });
      quest2.forEach(q => {
        if (q.calificacion < 20) {
          n1++;
        } else if (q.calificacion < 45) {
          b1++;
        } else if (q.calificacion < 70) {
          m1++;
        } else if (q.calificacion < 90) {
          a1++;
        } else {
          mA1++;
        }
        if (q.ambienteTrabajo < 3) {
          n2++;
        } else if (q.ambienteTrabajo < 5) {
          b2++;
        } else if (q.ambienteTrabajo < 7) {
          m2++;
        } else if (q.ambienteTrabajo < 9) {
          a2++;
        } else {
          mA2++;
        }
        if (q.factoresActividad < 10) {
          n3++;
        } else if (q.factoresActividad < 20) {
          b3++;
        } else if (q.factoresActividad < 30) {
          m3++;
        } else if (q.factoresActividad < 40) {
          a3++;
        } else {
          mA3++;
        }
        if (q.organizacionTiempo < 4) {
          n4++;
        } else if (q.organizacionTiempo < 6) {
          b4++;
        } else if (q.organizacionTiempo < 9) {
          m4++;
        } else if (q.organizacionTiempo < 12) {
          a4++;
        } else {
          mA4++;
        }
        if (q.lideranzoRelaciones < 10) {
          n5++;
        } else if (q.lideranzoRelaciones < 18) {
          b5++;
        } else if (q.lideranzoRelaciones < 28) {
          m5++;
        } else if (q.lideranzoRelaciones < 38) {
          a5++;
        } else {
          mA5++;
        }
        if (q.condicionesTrabajo < 3) {
          n6++;
        } else if (q.condicionesTrabajo < 5) {
          b6++;
        } else if (q.condicionesTrabajo < 7) {
          m6++;
        } else if (q.condicionesTrabajo < 9) {
          a6++;
        } else {
          mA6++;
        }
        if (q.cargaTrabajo < 12) {
          n7++;
        } else if (q.cargaTrabajo < 16) {
          b7++;
        } else if (q.cargaTrabajo < 20) {
          m7++;
        } else if (q.cargaTrabajo < 24) {
          a7++;
        } else {
          mA7++;
        }
        if (q.faltaControl < 5) {
          n8++;
        } else if (q.faltaControl < 8) {
          b8++;
        } else if (q.faltaControl < 11) {
          m8++;
        } else if (q.faltaControl < 14) {
          a8++;
        } else {
          mA8++;
        }
        if (q.jornadaTrabajo < 1) {
          n9++;
        } else if (q.jornadaTrabajo < 2) {
          b9++;
        } else if (q.jornadaTrabajo < 4) {
          m9++;
        } else if (q.jornadaTrabajo < 6) {
          a9++;
        } else {
          mA9++;
        }
        if (q.interferenciaRelacion < 1) {
          n10++;
        } else if (q.interferenciaRelacion < 2) {
          b10++;
        } else if (q.interferenciaRelacion < 4) {
          m10++;
        } else if (q.interferenciaRelacion < 6) {
          a10++;
        } else {
          mA10++;
        }
        if (q.liderazgo < 1) {
          n11++;
        } else if (q.liderazgo < 2) {
          b11++;
        } else if (q.liderazgo < 4) {
          m11++;
        } else if (q.liderazgo < 6) {
          a11++;
        } else {
          mA11++;
        }
        if (q.relacionesTrabajo < 5) {
          n12++;
        } else if (q.relacionesTrabajo < 8) {
          b12++;
        } else if (q.relacionesTrabajo < 11) {
          m12++;
        } else if (q.relacionesTrabajo < 14) {
          a12++;
        } else {
          mA12++;
        }
        if (q.violencia < 7) {
          n13++;
        } else if (q.violencia < 10) {
          b13++;
        } else if (q.violencia < 13) {
          m13++;
        } else if (q.violencia < 16) {
          a13++;
        } else {
          mA13++;
        }
      });
      this.chartCalFinal = [
        {data: [n1, b1, m1, a1, mA1], label: 'Calificación Final'}
      ];
      this.chartAmbienteTrabajo = [
        {data: [n2, b2, m2, a2, mA2], label: 'Ambiente de Trabajo'}
      ];
      this.chartFactoresActividad = [
        {data: [n3, b3, m3, a3, mA3], label: 'Factores propios de la actividad'}
      ];
      this.chartOrganizacionTiempo = [
        {data: [n4, b4, m4, a4, mA4], label: 'Organización del tiempo de trabajo'}
      ];
      this.chartLideranzoRelaciones = [
        {data: [n5, b5, m5, a5, mA5], label: 'Liderazgo y relaciones en el trabajo'}
      ];
      this.chartCondicionesTrabajo = [
        {data: [n6, b6, m6, a6, mA6], label: 'Condiciones en el ambiente de trabajo'}
      ];
      this.chartCargaTrabajo = [
        {data: [n7, b7, m7, a7, mA7], label: 'Carga de trabajo'}
      ];
      this.chartFaltaControl = [
        {data: [n8, b8, m8, a8, mA8], label: 'Falta de control sobre el trabajo'}
      ];
      this.chartJornadaTrabajo = [
        {data: [n9, b9, m9, a9, mA9], label: 'Jornada de trabajo'}
      ];
      this.chartInterferenciaRelacion = [
        {data: [n10, b10, m10, a10, mA10], label: 'Interferencia en la relación trabajo-familia'}
      ];
      this.chartLiderazgo = [
        {data: [n11, b11, m11, a11, mA11], label: 'Liderazgo'}
      ];
      this.chartRelacionesTrabajo = [
        {data: [n12, b12, m12, a12, mA12], label: 'Relaciones en el trabajo'}
      ];
      this.chartViolencia = [
        {data: [n13, b13, m13, a13, mA13], label: 'Violencia'}
      ];
    });
  }

  cargarQuest3() {
    const ids: string[] = [];
    let n1 = 0;
    let b1 = 0;
    let m1 = 0;
    let a1 = 0;
    let mA1 = 0;
    let n2 = 0;
    let b2 = 0;
    let m2 = 0;
    let a2 = 0;
    let mA2 = 0;
    let n3 = 0;
    let b3 = 0;
    let m3 = 0;
    let a3 = 0;
    let mA3 = 0;
    let n4 = 0;
    let b4 = 0;
    let m4 = 0;
    let a4 = 0;
    let mA4 = 0;
    let n5 = 0;
    let b5 = 0;
    let m5 = 0;
    let a5 = 0;
    let mA5 = 0;
    let n6 = 0;
    let b6 = 0;
    let m6 = 0;
    let a6 = 0;
    let mA6 = 0;
    let n7 = 0;
    let b7 = 0;
    let m7 = 0;
    let a7 = 0;
    let mA7 = 0;
    let n8 = 0;
    let b8 = 0;
    let m8 = 0;
    let a8 = 0;
    let mA8 = 0;
    let n9 = 0;
    let b9 = 0;
    let m9 = 0;
    let a9 = 0;
    let mA9 = 0;
    let n10 = 0;
    let b10 = 0;
    let m10 = 0;
    let a10 = 0;
    let mA10 = 0;
    let n11 = 0;
    let b11 = 0;
    let m11 = 0;
    let a11 = 0;
    let mA11 = 0;
    let n12 = 0;
    let b12 = 0;
    let m12 = 0;
    let a12 = 0;
    let mA12 = 0;
    let n13 = 0;
    let b13 = 0;
    let m13 = 0;
    let a13 = 0;
    let mA13 = 0;
    let n14 = 0;
    let b14 = 0;
    let m14 = 0;
    let a14 = 0;
    let mA14 = 0;
    let n15 = 0;
    let b15 = 0;
    let m15 = 0;
    let a15 = 0;
    let mA15 = 0;
    let n16 = 0;
    let b16 = 0;
    let m16 = 0;
    let a16 = 0;
    let mA16 = 0;
    let quest3;

    this.personasEncuesta.forEach(p => ids.push(p.id));
    this.regSer.quest3Personas(ids).then(() => {
      this.regSer.getQuest3().subscribe(resData => {
        quest3 = resData;
        // console.log(quest3);
      });
      quest3.forEach(q => {
        if (q.calificacion < 20) {
          n1++;
        } else if (q.calificacion < 45) {
          b1++;
        } else if (q.calificacion < 70) {
          m1++;
        } else if (q.calificacion < 90) {
          a1++;
        } else {
          mA1++;
        }
        if (q.ambienteTrabajo < 3) {
          n2++;
        } else if (q.ambienteTrabajo < 5) {
          b2++;
        } else if (q.ambienteTrabajo < 7) {
          m2++;
        } else if (q.ambienteTrabajo < 9) {
          a2++;
        } else {
          mA2++;
        }
        if (q.factoresActividad < 10) {
          n3++;
        } else if (q.factoresActividad < 20) {
          b3++;
        } else if (q.factoresActividad < 30) {
          m3++;
        } else if (q.factoresActividad < 40) {
          a3++;
        } else {
          mA3++;
        }
        if (q.organizacionTiempo < 4) {
          n4++;
        } else if (q.organizacionTiempo < 6) {
          b4++;
        } else if (q.organizacionTiempo < 9) {
          m4++;
        } else if (q.organizacionTiempo < 12) {
          a4++;
        } else {
          mA4++;
        }
        if (q.lideranzoRelaciones < 10) {
          n5++;
        } else if (q.lideranzoRelaciones < 18) {
          b5++;
        } else if (q.lideranzoRelaciones < 28) {
          m5++;
        } else if (q.lideranzoRelaciones < 38) {
          a5++;
        } else {
          mA5++;
        }
        if (q.condicionesTrabajo < 3) {
          n6++;
        } else if (q.condicionesTrabajo < 5) {
          b6++;
        } else if (q.condicionesTrabajo < 7) {
          m6++;
        } else if (q.condicionesTrabajo < 9) {
          a6++;
        } else {
          mA6++;
        }
        if (q.cargaTrabajo < 12) {
          n7++;
        } else if (q.cargaTrabajo < 16) {
          b7++;
        } else if (q.cargaTrabajo < 20) {
          m7++;
        } else if (q.cargaTrabajo < 24) {
          a7++;
        } else {
          mA7++;
        }
        if (q.faltaControl < 5) {
          n8++;
        } else if (q.faltaControl < 8) {
          b8++;
        } else if (q.faltaControl < 11) {
          m8++;
        } else if (q.faltaControl < 14) {
          a8++;
        } else {
          mA8++;
        }
        if (q.jornadaTrabajo < 1) {
          n9++;
        } else if (q.jornadaTrabajo < 2) {
          b9++;
        } else if (q.jornadaTrabajo < 4) {
          m9++;
        } else if (q.jornadaTrabajo < 6) {
          a9++;
        } else {
          mA9++;
        }
        if (q.interferenciaRelacion < 1) {
          n10++;
        } else if (q.interferenciaRelacion < 2) {
          b10++;
        } else if (q.interferenciaRelacion < 4) {
          m10++;
        } else if (q.interferenciaRelacion < 6) {
          a10++;
        } else {
          mA10++;
        }
        if (q.liderazgo < 1) {
          n11++;
        } else if (q.liderazgo < 2) {
          b11++;
        } else if (q.liderazgo < 4) {
          m11++;
        } else if (q.liderazgo < 6) {
          a11++;
        } else {
          mA11++;
        }
        if (q.relacionesTrabajo < 5) {
          n12++;
        } else if (q.relacionesTrabajo < 8) {
          b12++;
        } else if (q.relacionesTrabajo < 11) {
          m12++;
        } else if (q.relacionesTrabajo < 14) {
          a12++;
        } else {
          mA12++;
        }
        if (q.violencia < 7) {
          n13++;
        } else if (q.violencia < 10) {
          b13++;
        } else if (q.violencia < 13) {
          m13++;
        } else if (q.violencia < 16) {
          a13++;
        } else {
          mA13++;
        }
        if (q.entornoOrganizacional < 10) {
          n14++;
        } else if (q.entornoOrganizacional < 14) {
          b14++;
        } else if (q.entornoOrganizacional < 18) {
          m14++;
        } else if (q.entornoOrganizacional < 23) {
          a14++;
        } else {
          mA14++;
        }
        if (q.reconocimientoDesemp < 6) {
          n15++;
        } else if (q.reconocimientoDesemp < 10) {
          b15++;
        } else if (q.reconocimientoDesemp < 14) {
          m15++;
        } else if (q.reconocimientoDesemp < 18) {
          a15++;
        } else {
          mA15++;
        }
        if (q.violencia < 4) {
          n16++;
        } else if (q.violencia < 6) {
          b16++;
        } else if (q.violencia < 8) {
          m16++;
        } else if (q.violencia < 10) {
          a16++;
        } else {
          mA16++;
        }
      });
      this.chart3CalFinal = [
        {data: [n1, b1, m1, a1, mA1], label: 'Calificación Final'}
      ];
      this.chart3AmbienteTrabajo = [
        {data: [n2, b2, m2, a2, mA2], label: 'Ambiente de Trabajo'}
      ];
      this.chart3FactoresActividad = [
        {data: [n3, b3, m3, a3, mA3], label: 'Factores propios de la actividad'}
      ];
      this.chart3OrganizacionTiempo = [
        {data: [n4, b4, m4, a4, mA4], label: 'Organización del tiempo de trabajo'}
      ];
      this.chart3LideranzoRelaciones = [
        {data: [n5, b5, m5, a5, mA5], label: 'Liderazgo y relaciones en el trabajo'}
      ];
      this.chart3CondicionesTrabajo = [
        {data: [n6, b6, m6, a6, mA6], label: 'Condiciones en el ambiente de trabajo'}
      ];
      this.chart3CargaTrabajo = [
        {data: [n7, b7, m7, a7, mA7], label: 'Carga de trabajo'}
      ];
      this.chart3FaltaControl = [
        {data: [n8, b8, m8, a8, mA8], label: 'Falta de control sobre el trabajo'}
      ];
      this.chart3JornadaTrabajo = [
        {data: [n9, b9, m9, a9, mA9], label: 'Jornada de trabajo'}
      ];
      this.chart3InterferenciaRelacion = [
        {data: [n10, b10, m10, a10, mA10], label: 'Interferencia en la relación trabajo-familia'}
      ];
      this.chart3Liderazgo = [
        {data: [n11, b11, m11, a11, mA11], label: 'Liderazgo'}
      ];
      this.chart3RelacionesTrabajo = [
        {data: [n12, b12, m12, a12, mA12], label: 'Relaciones en el trabajo'}
      ];
      this.chart3Violencia = [
        {data: [n13, b13, m13, a13, mA13], label: 'Violencia'}
      ];
      this.chart3EntornoOrganizacional = [
        {data: [n14, b14, m14, a14, mA14], label: 'Entorno organizacional'}
      ];
      this.chart3ReconocimientoDesemp = [
        {data: [n15, b15, m15, a15, mA15], label: 'Reconocimiento del desempeño'}
      ];
      this.chart3InsuficientePertenencia = [
        {data: [n16, b16, m16, a16, mA16], label: 'Insuficiente sentido de pertenencia e, inestabilidad'}
      ];
    });
  }

  print(num: number) {
    this.imagen = 'imagen2Print';
    switch (num) {
      case 1:
        this.q1Class = 'print';
        setTimeout( () => {
          window.print();
          this.q1Class = 'cuerpoQuest';
          this.imagen = 'imagen2';
        }, 1);
        break;
      case 2:
        this.q1Class = 'print';
        this.q21Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q21Class = 'noPrint';
        }, 1);
        break;
      case 3:
        this.q1Class = 'print';
        this.q22Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q22Class = 'noPrint';
        }, 1);
        break;
      case 4:
        this.q1Class = 'print';
        this.q23Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q23Class = 'noPrint';
        }, 1);
        break;
      case 5:
        this.q1Class = 'print';
        this.q31Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q31Class = 'noPrint';
        }, 1);
        break;
      case 6:
        this.q1Class = 'print';
        this.q32Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q32Class = 'noPrint';
        }, 1);
        break;
      case 7:
        this.q1Class = 'print';
        this.q33Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q33Class = 'noPrint';
        }, 1);
        break;
    }
  }

  cambio($event) {
    this.checked = $event.checked;
    if (this.checked) {
      this.chartType = 'pie';
    } else {
      this.chartType = 'bar';
    }
  }

  openDialogEn(encuesta: EncuestaModel): void {
    const dialogRef = this.dialog.open(EncuestaComponent, {
      width: '700px',
      data: {encuesta},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarEncuesta();
    });
  }

}
