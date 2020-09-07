import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {MatSort, Sort} from '@angular/material/sort';
import {Quest3Model} from '../model/quest3.model';
import {Quest2Model} from '../model/quest2.model';

export class PerQuest {
  constructor(public nombre: string,
              public departamento: string,
              public calificacion: number,
              public ambienteTrabajo: number,
              public factoresActividad: number,
              public organizacionTiempo: number,
              public lideranzoRelaciones: number,
              public entornoOrganizacional: number,
              public condicionesTrabajo: number,
              public cargaTrabajo: number,
              public faltaControl: number,
              public jornadaTrabajo: number,
              public interferenciaRelacion: number,
              public liderazgo: number,
              public relacionesTrabajo: number,
              public violencia: number,
              public reconocimientoDesemp: number,
              public insuficientePertenencia: number) {
  }
}

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
  displayedColumns: string[] = ['empresa', 'folio', 'personas', 'encuesta1', 'encuesta2',
    'encuesta3', 'encuesta4', 'encuesta5', 'acciones'];
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

  chart3Prom: Array<any> = null;
  chart3PromDom: Array<any> = null;
  chartColors2: Array<any> = null;
  chartColors3: Array<any> = null;

  chart1: Array<any> = null;

  chart2Prom: Array<any> = null;
  chart2PromDom: Array<any> = null;
  chartColors22: Array<any> = null;
  chartColors32: Array<any> = null;

  promedioQ3 = 0;
  promedioQ3C1 = 0;
  promedioQ3C2 = 0;
  promedioQ3C3 = 0;
  promedioQ3C4 = 0;
  promedioQ3C5 = 0;
  promedioQ3D1 = 0;
  promedioQ3D2 = 0;
  promedioQ3D3 = 0;
  promedioQ3D4 = 0;
  promedioQ3D5 = 0;
  promedioQ3D6 = 0;
  promedioQ3D7 = 0;
  promedioQ3D8 = 0;
  promedioQ3D9 = 0;
  promedioQ3D10 = 0;

  promedioQ2 = 0;
  promedioQ2C1 = 0;
  promedioQ2C2 = 0;
  promedioQ2C3 = 0;
  promedioQ2C4 = 0;
  promedioQ2D1 = 0;
  promedioQ2D2 = 0;
  promedioQ2D3 = 0;
  promedioQ2D4 = 0;
  promedioQ2D5 = 0;
  promedioQ2D6 = 0;
  promedioQ2D7 = 0;
  promedioQ2D8 = 0;

  q1Class = 'cuerpoQuest';
  q11Class = 'noPrint';
  q12Class = 'noPrint';
  q21Class = 'noPrint';
  q22Class = 'noPrint';
  q23Class = 'noPrint';
  q24Class = 'noPrint';
  q25Class = 'noPrint';
  q26Class = 'noPrint';
  q27Class = 'noPrint';
  q31Class = 'noPrint';
  q32Class = 'noPrint';
  q33Class = 'noPrint';
  q34Class = 'noPrint';
  q35Class = 'noPrint';
  q36Class = 'noPrint';
  q37Class = 'noPrint';
  checked: boolean;
  imagen = 'imagen2';

  countTotal = 0;
  countHom = 0;
  countMuj = 0;
  countAtencion = 0 ;
  countNoAtencion = 0;
  countAtencionM = 0 ;
  countNoAtencionM = 0;
  countAtencionH = 0 ;
  countNoAtencionH = 0;
  displayedColumns2: string[] = ['nombre', 'sexo', 'edad', 'departamento'];
  dataSource2;
  displayedColumns3: string[] = ['nombre', 'departamento', 'ambienteTrabajo', 'factoresActividad', 'organizacionTiempo',
                                'lideranzoRelaciones', 'entornoOrganizacional'];
  displayedColumns4: string[] = ['nombre', 'departamento', 'condicionesTrabajo', 'cargaTrabajo', 'faltaControl',
                                'jornadaTrabajo', 'interferenciaRelacion', 'liderazgo', 'relacionesTrabajo', 'violencia',
                                'reconocimientoDesemp', 'insuficientePertenencia'];
  displayedColumns5: string[] = ['nombre', 'departamento', 'ambienteTrabajo', 'factoresActividad', 'organizacionTiempo',
                                'lideranzoRelaciones'];
  displayedColumns6: string[] = ['nombre', 'departamento', 'condicionesTrabajo', 'cargaTrabajo', 'faltaControl',
                                'jornadaTrabajo', 'interferenciaRelacion', 'liderazgo', 'relacionesTrabajo', 'violencia'];
  dataSource3;
  dataSource4;

  quest2: Quest2Model[];
  quest3: Quest3Model[];
  perQuests: PerQuest[] = [];
  perQuests2: PerQuest[] = [];

  sort;
  sort2;
  sort3;
  // @ts-ignore
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      if (!this.dataSource2) {
        return;
      }
      this.dataSource2.sort = this.sort;
    }
  }
  // @ts-ignore
  @ViewChild(MatSort) set content2(content2: ElementRef) {
    this.sort2 = content2;
    if (this.sort2) {
      if (!this.dataSource3) {
        return;
      }
      this.dataSource3.sort = this.sort2;

    }
  }
  // @ts-ignore
  @ViewChild(MatSort) set content3(content3: ElementRef) {
    this.sort3 = content3;
    if (this.sort3) {
      if (!this.dataSource4) {
        return;
      }
      this.dataSource4.sort = this.sort3;

    }
  }

  chartLabels: Array<any> = ['Nulo o despreciable', 'Bajo', 'Medio', 'Alto', 'Muy alto'];
  chartLabels2: Array<any> = ['1', '2', '3', '4', '5'];
  chartLabels3: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  chartLabels22: Array<any> = ['1', '2', '3', '4'];
  chartLabels32: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8'];
  chartLabels1: Array<any> = ['No requieren atención', 'Requieren atención'];

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

  chartColors1: Array<any> = [
    {
      backgroundColor: [
        '#6BF56E',
        '#FF0000'
      ],
      borderColor: [
        '#6BF56E',
        '#FF0000'
      ],
      borderWidth: 2,
    }
  ];



  chartOptions: any = {
    responsive: true
  };

  applyFilter(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(filterValue: string) {
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  applyFilter3(filterValue: string) {
    this.dataSource4.filter = filterValue.trim().toLowerCase();
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
    this.personasEncuesta = [];
    this.regSer.personasFolio(encuesta.id).then(() => {
      this.regSer.getPersonas().subscribe(resData => {
        this.personasEncuesta = resData;
      });
      if (encuesta.quest2) {
        this.cargarQuest2();
      }
      if (encuesta.quest3) {
        this.cargarQuest3();
      }
      if (encuesta.quest1) {
        this.cargarQuest1();
        this.dataSource2 = new MatTableDataSource(this.personasEncuesta);
        this.dataSource2.sort = this.sort;
      }
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

  cargarQuest1() {
    this.countTotal = this.personasEncuesta.length;
    this.countAtencion = 0;
    this.countNoAtencion = 0;
    this.countMuj = 0;
    this.countAtencionM = 0;
    this.countNoAtencionM = 0;
    this.countHom = 0;
    this.countAtencionH = 0;
    this.countNoAtencionH = 0;
    this.personasEncuesta.forEach(p => {
      if (p.atencionQ1) {
        this.countAtencion++;
        if (p.sexo === 'M') {
          this.countHom++;
          this.countAtencionH++;
        } else {
          this.countMuj++;
          this.countAtencionM++;
        }
      } else {
        this.countNoAtencion++;
        if (p.sexo === 'M') {
          this.countHom++;
          this.countNoAtencionH++;
        } else {
          this.countMuj++;
          this.countNoAtencionM++;
        }
      }
    });

    this.chart1 = [
      {data: [this.countNoAtencion, this.countAtencion], label: 'Tota de Trabajadores'}
    ];

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
    let longitud = 0;
    this.promedioQ2 = 0;
    this.promedioQ2C1 = 0;
    this.promedioQ2C2 = 0;
    this.promedioQ2C3 = 0;
    this.promedioQ2C4 = 0;
    this.promedioQ2D1 = 0;
    this.promedioQ2D2 = 0;
    this.promedioQ2D3 = 0;
    this.promedioQ2D4 = 0;
    this.promedioQ2D5 = 0;
    this.promedioQ2D6 = 0;
    this.promedioQ2D7 = 0;
    this.promedioQ2D8 = 0;
    this.quest2 = [];

    this.personasEncuesta.forEach(p => ids.push(p.id));
    this.regSer.quest2Personas(ids).then(() => {
      this.regSer.getQuest2().subscribe(resData => {
        this.quest2 = resData;
        // console.log(this.quest2);
        longitud = this.quest2.length;
      });
      this.quest2.forEach(q => {
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
        this.promedioQ2 += q.calificacion;
        this.promedioQ2C1 += q.ambienteTrabajo;
        this.promedioQ2C2 += q.factoresActividad;
        this.promedioQ2C3 += q.organizacionTiempo;
        this.promedioQ2C4 += q.lideranzoRelaciones;
        this.promedioQ2D1 += q.condicionesTrabajo;
        this.promedioQ2D2 += q.cargaTrabajo;
        this.promedioQ2D3 += q.faltaControl;
        this.promedioQ2D4 += q.jornadaTrabajo;
        this.promedioQ2D5 += q.interferenciaRelacion;
        this.promedioQ2D6 += q.liderazgo;
        this.promedioQ2D7 += q.relacionesTrabajo;
        this.promedioQ2D8 += q.violencia;
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

      this.promedioQ2 = this.promedioQ2 / longitud;
      this.promedioQ2C1 = this.promedioQ2C1 / longitud;
      this.promedioQ2C2 = this.promedioQ2C2 / longitud;
      this.promedioQ2C3 = this.promedioQ2C3 / longitud;
      this.promedioQ2C4 = this.promedioQ2C4 / longitud;
      this.promedioQ2D1 = this.promedioQ2D1 / longitud;
      this.promedioQ2D2 = this.promedioQ2D2 / longitud;
      this.promedioQ2D3 = this.promedioQ2D3 / longitud;
      this.promedioQ2D4 = this.promedioQ2D4 / longitud;
      this.promedioQ2D5 = this.promedioQ2D5 / longitud;
      this.promedioQ2D6 = this.promedioQ2D6 / longitud;
      this.promedioQ2D7 = this.promedioQ2D7 / longitud;
      this.promedioQ2D8 = this.promedioQ2D8 / longitud;

      this.chart2Prom = [
        {data: [this.promedioQ2C1, this.promedioQ2C2, this.promedioQ2C3, this.promedioQ2C4], label: 'Promedio Categoría'}
      ];
      this.chart2PromDom = [
        {data: [this.promedioQ2D1, this.promedioQ2D2, this.promedioQ2D3, this.promedioQ2D4, this.promedioQ2D5,
            this.promedioQ2D6, this.promedioQ2D7, this.promedioQ2D8], label: 'Promedio Dominio'}
      ];

      this.chartColors22 = [
        {
          backgroundColor: [
            this.getColor(this.getPromedioQ2(2)),
            this.getColor(this.getPromedioQ2(3)),
            this.getColor(this.getPromedioQ2(4)),
            this.getColor(this.getPromedioQ2(5))
          ],
          borderColor: [
            this.getColor(this.getPromedioQ2(2)),
            this.getColor(this.getPromedioQ2(3)),
            this.getColor(this.getPromedioQ2(4)),
            this.getColor(this.getPromedioQ2(5))
          ],
          borderWidth: 2,
        }
      ];
      this.chartColors32 = [
        {
          backgroundColor: [
            this.getColor(this.getPromedioQ2(6)),
            this.getColor(this.getPromedioQ2(7)),
            this.getColor(this.getPromedioQ2(8)),
            this.getColor(this.getPromedioQ2(9)),
            this.getColor(this.getPromedioQ2(10)),
            this.getColor(this.getPromedioQ2(11)),
            this.getColor(this.getPromedioQ2(12)),
            this.getColor(this.getPromedioQ2(13))
          ],
          borderColor: [
            this.getColor(this.getPromedioQ2(6)),
            this.getColor(this.getPromedioQ2(7)),
            this.getColor(this.getPromedioQ2(8)),
            this.getColor(this.getPromedioQ2(9)),
            this.getColor(this.getPromedioQ2(10)),
            this.getColor(this.getPromedioQ2(11)),
            this.getColor(this.getPromedioQ2(12)),
            this.getColor(this.getPromedioQ2(13))
          ],
          borderWidth: 2,
        }
      ];
      this.acomodarQuest2();
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
    let longitud = 0;
    this.quest3 = [];

    this.personasEncuesta.forEach(p => ids.push(p.id));
    this.regSer.quest3Personas(ids).then(() => {
      this.regSer.getQuest3().subscribe(resData => {
        this.quest3 = resData;
        // console.log(this.quest3);
        longitud = this.quest3.length;
      });
      this.quest3.forEach(q => {
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
        if (q.insuficientePertenencia < 4) {
          n16++;
        } else if (q.insuficientePertenencia < 6) {
          b16++;
        } else if (q.insuficientePertenencia < 8) {
          m16++;
        } else if (q.insuficientePertenencia < 10) {
          a16++;
        } else {
          mA16++;
        }
        this.promedioQ3 += q.calificacion;
        this.promedioQ3C1 += q.ambienteTrabajo;
        this.promedioQ3C2 += q.factoresActividad;
        this.promedioQ3C3 += q.organizacionTiempo;
        this.promedioQ3C4 += q.lideranzoRelaciones;
        this.promedioQ3C5 += q.entornoOrganizacional;
        this.promedioQ3D1 += q.condicionesTrabajo;
        this.promedioQ3D2 += q.cargaTrabajo;
        this.promedioQ3D3 += q.faltaControl;
        this.promedioQ3D4 += q.jornadaTrabajo;
        this.promedioQ3D5 += q.interferenciaRelacion;
        this.promedioQ3D6 += q.liderazgo;
        this.promedioQ3D7 += q.relacionesTrabajo;
        this.promedioQ3D8 += q.violencia;
        this.promedioQ3D9 += q.reconocimientoDesemp;
        this.promedioQ3D10 += q.insuficientePertenencia;
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

      this.promedioQ3 = this.promedioQ3 / longitud;
      this.promedioQ3C1 = this.promedioQ3C1 / longitud;
      this.promedioQ3C2 = this.promedioQ3C2 / longitud;
      this.promedioQ3C3 = this.promedioQ3C3 / longitud;
      this.promedioQ3C4 = this.promedioQ3C4 / longitud;
      this.promedioQ3C5 = this.promedioQ3C5 / longitud;
      this.promedioQ3D1 = this.promedioQ3D1 / longitud;
      this.promedioQ3D2 = this.promedioQ3D2 / longitud;
      this.promedioQ3D3 = this.promedioQ3D3 / longitud;
      this.promedioQ3D4 = this.promedioQ3D4 / longitud;
      this.promedioQ3D5 = this.promedioQ3D5 / longitud;
      this.promedioQ3D6 = this.promedioQ3D6 / longitud;
      this.promedioQ3D7 = this.promedioQ3D7 / longitud;
      this.promedioQ3D8 = this.promedioQ3D8 / longitud;
      this.promedioQ3D9 = this.promedioQ3D9 / longitud;
      this.promedioQ3D10 = this.promedioQ3D10 / longitud;

      this.chart3Prom = [
        {data: [this.promedioQ3C1, this.promedioQ3C2, this.promedioQ3C3, this.promedioQ3C4, this.promedioQ3C5], label: 'Promedio Categoría'}
      ];
      this.chart3PromDom = [
        {data: [this.promedioQ3D1, this.promedioQ3D2, this.promedioQ3D3, this.promedioQ3D4, this.promedioQ3D5,
            this.promedioQ3D6, this.promedioQ3D7, this.promedioQ3D8, this.promedioQ3D9, this.promedioQ3D10], label: 'Promedio Dominio'}
      ];

      this.chartColors2 = [
        {
          backgroundColor: [
            this.getColor(this.getPromedioQ3(2)),
            this.getColor(this.getPromedioQ3(3)),
            this.getColor(this.getPromedioQ3(4)),
            this.getColor(this.getPromedioQ3(5)),
            this.getColor(this.getPromedioQ3(6))
          ],
          borderColor: [
            this.getColor(this.getPromedioQ3(2)),
            this.getColor(this.getPromedioQ3(3)),
            this.getColor(this.getPromedioQ3(4)),
            this.getColor(this.getPromedioQ3(5)),
            this.getColor(this.getPromedioQ3(6))
          ],
          borderWidth: 2,
        }
      ];
      this.chartColors3 = [
        {
          backgroundColor: [
            this.getColor(this.getPromedioQ3(7)),
            this.getColor(this.getPromedioQ3(8)),
            this.getColor(this.getPromedioQ3(9)),
            this.getColor(this.getPromedioQ3(10)),
            this.getColor(this.getPromedioQ3(11)),
            this.getColor(this.getPromedioQ3(12)),
            this.getColor(this.getPromedioQ3(13)),
            this.getColor(this.getPromedioQ3(14)),
            this.getColor(this.getPromedioQ3(15)),
            this.getColor(this.getPromedioQ3(16))
          ],
          borderColor: [
            this.getColor(this.getPromedioQ3(7)),
            this.getColor(this.getPromedioQ3(8)),
            this.getColor(this.getPromedioQ3(9)),
            this.getColor(this.getPromedioQ3(10)),
            this.getColor(this.getPromedioQ3(11)),
            this.getColor(this.getPromedioQ3(12)),
            this.getColor(this.getPromedioQ3(13)),
            this.getColor(this.getPromedioQ3(14)),
            this.getColor(this.getPromedioQ3(15)),
            this.getColor(this.getPromedioQ3(16))
          ],
          borderWidth: 2,
        }
      ];
      this.acomodarQuest3();
    });
  }

  print(num: number) {
    this.imagen = 'imagen2Print';
    switch (num) {
      case 1:
        this.q1Class = 'print';
        this.q11Class = 'print';
        setTimeout( () => {
          window.print();
          this.q1Class = 'cuerpoQuest';
          this.q11Class = 'noPrint';
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
      case 8:
        this.q1Class = 'print';
        this.q34Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q34Class = 'noPrint';
        }, 1);
        break;
      case 9:
        this.q1Class = 'print';
        this.q35Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q35Class = 'noPrint';
        }, 1);
        break;
      case 10:
        this.q1Class = 'print';
        this.q12Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q12Class = 'noPrint';
        }, 1);
        break;
      case 11:
        this.q1Class = 'print';
        this.q24Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q24Class = 'noPrint';
        }, 1);
        break;
      case 12:
        this.q1Class = 'print';
        this.q25Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q25Class = 'noPrint';
        }, 1);
        break;
      case 13:
        this.q1Class = 'print';
        this.q36Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q36Class = 'noPrint';
        }, 1);
        break;
      case 14:
        this.q1Class = 'print';
        this.q37Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q37Class = 'noPrint';
        }, 1);
        break;
      case 15:
        this.q1Class = 'print';
        this.q26Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q26Class = 'noPrint';
        }, 1);
        break;
      case 16:
        this.q1Class = 'print';
        this.q27Class = 'print';
        setTimeout( () => {
          window.print();
          this.imagen = 'imagen2';
          this.q1Class = 'cuerpoQuest';
          this.q27Class = 'noPrint';
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

  getPromedioQ2(tipo: number) {

    switch (tipo) {
      case 1:
        if (this.promedioQ2 < 20) {
          return 0;
        } else if (this.promedioQ2 < 45) {
          return 1;
        } else if (this.promedioQ2 < 70) {
          return 2;
        } else if (this.promedioQ2 < 90) {
          return 3;
        } else {
          return 4;
        }

      case 2:
        if (this.promedioQ2C1 < 3) {
          return 0;
        } else if (this.promedioQ2C1 < 5) {
          return 1;
        } else if (this.promedioQ2C1 < 7) {
          return 2;
        } else if (this.promedioQ2C1 < 9) {
          return 3;
        } else {
          return 4;
        }

      case 3:
        if (this.promedioQ2C2 < 10) {
          return 0;
        } else if (this.promedioQ2C2 < 20) {
          return 1;
        } else if (this.promedioQ2C2 < 30) {
          return 2;
        } else if (this.promedioQ2C2 < 40) {
          return 3;
        } else {
          return 4;
        }

      case 4:
        if (this.promedioQ2C3 < 4) {
          return 0;
        } else if (this.promedioQ2C3 < 6) {
          return 1;
        } else if (this.promedioQ2C3 < 9) {
          return 2;
        } else if (this.promedioQ2C3 < 12) {
          return 3;
        } else {
          return 4;
        }

      case 5:
        if (this.promedioQ2C4 < 10) {
          return 0;
        } else if (this.promedioQ2C4 < 18) {
          return 1;
        } else if (this.promedioQ2C4 < 28) {
          return 2;
        } else if (this.promedioQ2C4 < 38) {
          return 3;
        } else {
          return 4;
        }

      case 6:
        if (this.promedioQ2D1 < 3) {
          return 0;
        } else if (this.promedioQ2D1 < 5) {
          return 1;
        } else if (this.promedioQ2D1 < 7) {
          return 2;
        } else if (this.promedioQ2D1 < 9) {
          return 3;
        } else {
          return 4;
        }

      case 7:
        if (this.promedioQ2D2 < 12) {
          return 0;
        } else if (this.promedioQ2D2 < 16) {
          return 1;
        } else if (this.promedioQ2D2 < 20) {
          return 2;
        } else if (this.promedioQ2D2 < 24) {
          return 3;
        } else {
          return 4;
        }

      case 8:
        if (this.promedioQ2D3 < 5) {
          return 0;
        } else if (this.promedioQ2D3 < 8) {
          return 1;
        } else if (this.promedioQ2D3 < 11) {
          return 2;
        } else if (this.promedioQ2D3 < 14) {
          return 3;
        } else {
          return 4;
        }

      case 9:
        if (this.promedioQ2D4 < 1) {
          return 0;
        } else if (this.promedioQ2D4 < 2) {
          return 1;
        } else if (this.promedioQ2D4 < 4) {
          return 2;
        } else if (this.promedioQ2D4 < 6) {
          return 3;
        } else {
          return 4;
        }

      case 10:
        if (this.promedioQ2D5 < 1) {
          return 0;
        } else if (this.promedioQ2D5 < 2) {
          return 1;
        } else if (this.promedioQ2D5 < 4) {
          return 2;
        } else if (this.promedioQ2D5 < 6) {
          return 3;
        } else {
          return 4;
        }

      case 11:
        if (this.promedioQ2D6 < 1) {
          return 0;
        } else if (this.promedioQ2D6 < 2) {
          return 1;
        } else if (this.promedioQ2D6 < 4) {
          return 2;
        } else if (this.promedioQ2D6 < 6) {
          return 3;
        } else {
          return 4;
        }

      case 12:
        if (this.promedioQ2D7 < 5) {
          return 0;
        } else if (this.promedioQ2D7 < 8) {
          return 1;
        } else if (this.promedioQ2D7 < 11) {
          return 2;
        } else if (this.promedioQ2D7 < 14) {
          return 3;
        } else {
          return 4;
        }

      case 13:
        if (this.promedioQ2D8 < 7) {
          return 0;
        } else if (this.promedioQ2D8 < 10) {
          return 1;
        } else if (this.promedioQ2D8 < 13) {
          return 2;
        } else if (this.promedioQ2D8 < 16) {
          return 3;
        } else {
          return 4;
        }
    }
  }

  getPromedioQ3(tipo: number) {

    switch (tipo) {
      case 1:
        if (this.promedioQ3 < 20) {
          return 0;
        } else if (this.promedioQ3 < 45) {
          return 1;
        } else if (this.promedioQ3 < 70) {
          return 2;
        } else if (this.promedioQ3 < 90) {
          return 3;
        } else {
          return 4;
        }

      case 2:
        if (this.promedioQ3C1 < 3) {
          return 0;
        } else if (this.promedioQ3C1 < 5) {
          return 1;
        } else if (this.promedioQ3C1 < 7) {
          return 2;
        } else if (this.promedioQ3C1 < 9) {
          return 3;
        } else {
          return 4;
        }

      case 3:
        if (this.promedioQ3C2 < 10) {
          return 0;
        } else if (this.promedioQ3C2 < 20) {
          return 1;
        } else if (this.promedioQ3C2 < 30) {
          return 2;
        } else if (this.promedioQ3C2 < 40) {
          return 3;
        } else {
          return 4;
        }

      case 4:
        if (this.promedioQ3C3 < 4) {
          return 0;
        } else if (this.promedioQ3C3 < 6) {
          return 1;
        } else if (this.promedioQ3C3 < 9) {
          return 2;
        } else if (this.promedioQ3C3 < 12) {
          return 3;
        } else {
          return 4;
        }

      case 5:
        if (this.promedioQ3C4 < 10) {
          return 0;
        } else if (this.promedioQ3C4 < 18) {
          return 1;
        } else if (this.promedioQ3C4 < 28) {
          return 2;
        } else if (this.promedioQ3C4 < 38) {
          return 3;
        } else {
          return 4;
        }

      case 6:
        if (this.promedioQ3C5 < 10) {
          return 0;
        } else if (this.promedioQ3C5 < 14) {
          return 1;
        } else if (this.promedioQ3C5 < 18) {
          return 2;
        } else if (this.promedioQ3C5 < 23) {
          return 3;
        } else {
          return 4;
        }

      case 7:
        if (this.promedioQ3D1 < 3) {
          return 0;
        } else if (this.promedioQ3D1 < 5) {
          return 1;
        } else if (this.promedioQ3D1 < 7) {
          return 2;
        } else if (this.promedioQ3D1 < 9) {
          return 3;
        } else {
          return 4;
        }

      case 8:
        if (this.promedioQ3D2 < 12) {
          return 0;
        } else if (this.promedioQ3D2 < 16) {
          return 1;
        } else if (this.promedioQ3D2 < 20) {
          return 2;
        } else if (this.promedioQ3D2 < 24) {
          return 3;
        } else {
          return 4;
        }

      case 9:
        if (this.promedioQ3D3 < 5) {
          return 0;
        } else if (this.promedioQ3D3 < 8) {
          return 1;
        } else if (this.promedioQ3D3 < 11) {
          return 2;
        } else if (this.promedioQ3D3 < 14) {
          return 3;
        } else {
          return 4;
        }

      case 10:
        if (this.promedioQ3D4 < 1) {
          return 0;
        } else if (this.promedioQ3D4 < 2) {
          return 1;
        } else if (this.promedioQ3D4 < 4) {
          return 2;
        } else if (this.promedioQ3D4 < 6) {
          return 3;
        } else {
          return 4;
        }

      case 11:
        if (this.promedioQ3D5 < 1) {
          return 0;
        } else if (this.promedioQ3D5 < 2) {
          return 1;
        } else if (this.promedioQ3D5 < 4) {
          return 2;
        } else if (this.promedioQ3D5 < 6) {
          return 3;
        } else {
          return 4;
        }

      case 12:
        if (this.promedioQ3D6 < 1) {
          return 0;
        } else if (this.promedioQ3D6 < 2) {
          return 1;
        } else if (this.promedioQ3D6 < 4) {
          return 2;
        } else if (this.promedioQ3D6 < 6) {
          return 3;
        } else {
          return 4;
        }

      case 13:
        if (this.promedioQ3D7 < 5) {
          return 0;
        } else if (this.promedioQ3D7 < 8) {
          return 1;
        } else if (this.promedioQ3D7 < 11) {
          return 2;
        } else if (this.promedioQ3D7 < 14) {
          return 3;
        } else {
          return 4;
        }

      case 14:
        if (this.promedioQ3D8 < 7) {
          return 0;
        } else if (this.promedioQ3D8 < 10) {
          return 1;
        } else if (this.promedioQ3D8 < 13) {
          return 2;
        } else if (this.promedioQ3D8 < 16) {
          return 3;
        } else {
          return 4;
        }

      case 15:
        if (this.promedioQ3D9 < 6) {
          return 0;
        } else if (this.promedioQ3D9 < 10) {
          return 1;
        } else if (this.promedioQ3D9 < 14) {
          return 2;
        } else if (this.promedioQ3D9 < 18) {
          return 3;
        } else {
          return 4;
        }

      case 16:
        if (this.promedioQ3D10 < 4) {
          return 0;
        } else if (this.promedioQ3D10 < 6) {
          return 1;
        } else if (this.promedioQ3D10 < 8) {
          return 2;
        } else if (this.promedioQ3D10 < 10) {
          return 3;
        } else {
          return 4;
        }

    }
  }

  getNombre(num: number) {
    switch (num) {
      case 0:
        return 'Nulo o despreciable';
      case 1:
        return 'Bajo';
      case 2:
        return 'Medio';
      case 3:
        return 'Alto';
      case 4:
        return 'Muy Alto';
      default:
        break;
    }
  }

  getColor(num: number) {
    switch (num) {
      case 0:
        return '#9BE5F7';
      case 1:
        return '#6BF56E';
      case 2:
        return '#FFFF00';
      case 3:
        return '#FFC000';
      case 4:
        return '#FF0000';
      default:
        break;
    }
  }

  getTexto(num: number) {
    switch (num) {
      case 0:
        return 'El riesgo resulta despreciable por lo que no se requiere medidas adicionales.';
      case 1:
        return 'Es necesario una mayor difusión de la política de prevención de riesgos psicosociales y programas para: ' +
          'la prevención de los factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la ' +
          'prevención de la violencia laboral.';
      case 2:
        return 'Se requiere revisar la política de prevención de riesgos psicosociales y programas para la prevención de ' +
          'los factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la prevención de la ' +
          'violencia laboral, así como reforzar su aplicación y difusión, mediante un Programa de intervención.';
      case 3:
        return 'Se requiere realizar un análisis de cada categoría y dominio, de manera que se puedan determinar las acciones ' +
          'de intervención apropiadas a través de un Programa de intervención, que podrá incluir una evaluación específica1 y ' +
          'deberá incluir una campaña de sensibilización, revisar la política de prevención de riesgos psicosociales y programas ' +
          'para la prevención de los factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la ' +
          'prevención de la violencia laboral, así como reforzar su aplicación y difusión.';
      case 4:
        return 'Se requiere realizar el análisis de cada categoría y dominio para establecer las acciones de intervención ' +
          'apropiadas, mediante un Programa de intervención que deberá incluir evaluaciones específicas1, y contemplar campañas ' +
          'de sensibilización, revisar la política de prevención de riesgos psicosociales y programas para la prevención de los ' +
          'factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la prevención de la violencia ' +
          'laboral, así como reforzar su aplicación y difusión.';
      default:
        break;
    }
  }

  acomodarQuest2() {
    let quest2Temp: Quest2Model = null;
    this.perQuests2 = [];
    // console.log(this.quest2);
    this.personasEncuesta.forEach(p => {
      // console.log(p);
      if (this.quest2 !== undefined) {
        quest2Temp = this.quest2.find(q => q.idPersona === p.id);
        // console.log(quest2Temp);
      }
      this.perQuests2.push(new PerQuest(p.nombre, p.departamento, quest2Temp.calificacion, quest2Temp.ambienteTrabajo,
        quest2Temp.factoresActividad, quest2Temp.organizacionTiempo, quest2Temp.lideranzoRelaciones, null,
        quest2Temp.condicionesTrabajo, quest2Temp.cargaTrabajo, quest2Temp.faltaControl, quest2Temp.jornadaTrabajo,
        quest2Temp.interferenciaRelacion, quest2Temp.liderazgo, quest2Temp.relacionesTrabajo, quest2Temp.violencia,
        null, null));
    });
    console.log(this.perQuests2);
    this.dataSource4 = new MatTableDataSource(this.perQuests2);
    this.dataSource4.sort = this.sort3;
    const sortState: Sort = {active: 'departamento', direction: 'asc'};
    this.sort3.active = sortState.active;
    this.sort3.direction = sortState.direction;
    this.sort3.sortChange.emit(sortState);
  }

  acomodarQuest3() {
    let quest3Temp: Quest3Model = null;
    this.perQuests = [];
    this.personasEncuesta.forEach(p => {
      // console.log(p);
      if (this.quest3 !== undefined) {
        quest3Temp = this.quest3.find(q => q.idPersona === p.id);
        // console.log(quest3Temp);
      }
      this.perQuests.push(new PerQuest(p.nombre, p.departamento, quest3Temp.calificacion, quest3Temp.ambienteTrabajo,
        quest3Temp.factoresActividad, quest3Temp.organizacionTiempo, quest3Temp.lideranzoRelaciones, quest3Temp.entornoOrganizacional,
        quest3Temp.condicionesTrabajo, quest3Temp.cargaTrabajo, quest3Temp.faltaControl, quest3Temp.jornadaTrabajo,
        quest3Temp.interferenciaRelacion, quest3Temp.liderazgo, quest3Temp.relacionesTrabajo, quest3Temp.violencia,
        quest3Temp.reconocimientoDesemp, quest3Temp.insuficientePertenencia));
    });
    // console.log(this.perQuests);
    this.dataSource3 = new MatTableDataSource(this.perQuests);
    this.dataSource3.sort = this.sort2;
    const sortState: Sort = {active: 'departamento', direction: 'asc'};
    this.sort2.active = sortState.active;
    this.sort2.direction = sortState.direction;
    this.sort2.sortChange.emit(sortState);
  }

  getValorQ3(valor: number, tipo: number) {

    switch (tipo) {
      case 1:
        if (valor < 20) {
          return 0;
        } else if (valor < 45) {
          return 1;
        } else if (valor < 70) {
          return 2;
        } else if (valor < 90) {
          return 3;
        } else {
          return 4;
        }

      case 2:
        if (valor < 3) {
          return 0;
        } else if (valor < 5) {
          return 1;
        } else if (valor < 7) {
          return 2;
        } else if (valor < 9) {
          return 3;
        } else {
          return 4;
        }

      case 3:
        if (valor < 10) {
          return 0;
        } else if (valor < 20) {
          return 1;
        } else if (valor < 30) {
          return 2;
        } else if (valor < 40) {
          return 3;
        } else {
          return 4;
        }

      case 4:
        if (valor < 4) {
          return 0;
        } else if (valor < 6) {
          return 1;
        } else if (valor < 9) {
          return 2;
        } else if (valor < 12) {
          return 3;
        } else {
          return 4;
        }

      case 5:
        if (valor < 10) {
          return 0;
        } else if (valor < 18) {
          return 1;
        } else if (valor < 28) {
          return 2;
        } else if (valor < 38) {
          return 3;
        } else {
          return 4;
        }

      case 6:
        if (valor < 10) {
          return 0;
        } else if (valor < 14) {
          return 1;
        } else if (valor < 18) {
          return 2;
        } else if (valor < 23) {
          return 3;
        } else {
          return 4;
        }

      case 7:
        if (valor < 3) {
          return 0;
        } else if (valor < 5) {
          return 1;
        } else if (valor < 7) {
          return 2;
        } else if (valor < 9) {
          return 3;
        } else {
          return 4;
        }

      case 8:
        if (valor < 12) {
          return 0;
        } else if (valor < 16) {
          return 1;
        } else if (valor < 20) {
          return 2;
        } else if (valor < 24) {
          return 3;
        } else {
          return 4;
        }

      case 9:
        if (valor < 5) {
          return 0;
        } else if (valor < 8) {
          return 1;
        } else if (valor < 11) {
          return 2;
        } else if (valor < 14) {
          return 3;
        } else {
          return 4;
        }

      case 10:
        if (valor < 1) {
          return 0;
        } else if (valor < 2) {
          return 1;
        } else if (valor < 4) {
          return 2;
        } else if (valor < 6) {
          return 3;
        } else {
          return 4;
        }

      case 11:
        if (valor < 1) {
          return 0;
        } else if (valor < 2) {
          return 1;
        } else if (valor < 4) {
          return 2;
        } else if (valor < 6) {
          return 3;
        } else {
          return 4;
        }

      case 12:
        if (valor < 1) {
          return 0;
        } else if (valor < 2) {
          return 1;
        } else if (valor < 4) {
          return 2;
        } else if (valor < 6) {
          return 3;
        } else {
          return 4;
        }

      case 13:
        if (valor < 5) {
          return 0;
        } else if (valor < 8) {
          return 1;
        } else if (valor < 11) {
          return 2;
        } else if (valor < 14) {
          return 3;
        } else {
          return 4;
        }

      case 14:
        if (valor < 7) {
          return 0;
        } else if (valor < 10) {
          return 1;
        } else if (valor < 13) {
          return 2;
        } else if (valor < 16) {
          return 3;
        } else {
          return 4;
        }

      case 15:
        if (valor < 6) {
          return 0;
        } else if (valor < 10) {
          return 1;
        } else if (valor < 14) {
          return 2;
        } else if (valor < 18) {
          return 3;
        } else {
          return 4;
        }

      case 16:
        if (valor < 4) {
          return 0;
        } else if (valor < 6) {
          return 1;
        } else if (valor < 8) {
          return 2;
        } else if (valor < 10) {
          return 3;
        } else {
          return 4;
        }

    }
  }

}
