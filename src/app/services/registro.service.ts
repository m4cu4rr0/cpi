import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EncuestaModel} from '../model/encuesta.model';
import {switchMap, take, tap, map} from 'rxjs/internal/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {PersonaModel} from '../model/persona.model';
import { Quest2Model } from '../model/quest2.model';
import { Quest3Model } from '../model/quest3.model';

interface EncuestaData {
  id: string;
  idEmpresa: string;
  numPersonas: number;
  quest1: boolean;
  quest2: boolean;
  quest3: boolean;
}

interface PersonaData {
  nombre: string;
  edad: string;
  sexo: string;
  edoCivil: string;
  estudios: string;
  ocupacion: string;
  departamento: string;
  puesto: string;
  contratacion: string;
  personal: string;
  jornada: string;
  rotacion: string;
  expActual: string;
  expTotal: string;
  folio: string;
  quest1: string;
  quest2: string;
  quest3: string;
  atencionQ1: boolean;
  id: string;
}

interface Quest2Data {
  id: string;
  idPersona: string;
  calificacion: number;
  ambienteTrabajo: number;
  factoresActividad: number;
  organizacionTiempo: number;
  lideranzoRelaciones: number;
  condicionesTrabajo: number;
  cargaTrabajo: number;
  faltaControl: number;
  jornadaTrabajo: number;
  interferenciaRelacion: number;
  liderazgo: number;
  relacionesTrabajo: number;
  violencia: number;
}

interface Quest3Data {
  id: string;
  idPersona: string;
  calificacion: number;
  ambienteTrabajo: number;
  factoresActividad: number;
  organizacionTiempo: number;
  lideranzoRelaciones: number;
  entornoOrganizacional: number;
  condicionesTrabajo: number;
  cargaTrabajo: number;
  faltaControl: number;
  jornadaTrabajo: number;
  interferenciaRelacion: number;
  liderazgo: number;
  relacionesTrabajo: number;
  violencia: number;
  reconocimientoDesemp: number;
  insuficientePertenencia: number;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  uniqueId: string;

  private encuestas = new BehaviorSubject<EncuestaModel[]>([]);
  private personas = new BehaviorSubject<PersonaModel[]>([]);
  private quest2 = new BehaviorSubject<Quest2Model[]>([]);
  private quest3 = new BehaviorSubject<Quest3Model[]>([]);

  getEncuestas(): Observable<EncuestaModel[]> {
    return this.encuestas.asObservable();
  }

  getPersonas(): Observable<PersonaModel[]> {
    return this.personas.asObservable();
  }

  getEncuesta(id: string) {
    return this.encuestas.pipe(
      take(1),
      map(encuestas => {
        return {...encuestas.find(p => p.id === id)};
      })
    );
  }

  async agregarEncuesta(encuesta: EncuestaModel) {
    // console.log(encuesta);
    return await this.http.post<{ name: string }>('https://consultoriacpi.firebaseio.com/encuestas.json', {
      ...encuesta,
      id: null
    })
      .pipe(
        switchMap(resData => {
          this.uniqueId = resData.name as string;
          // console.log(this.uniqueId);
          return this.uniqueId;
        })
      ).toPromise();
  }

  async fetchEncuestas() {
    return await this.http
      .get<{ [key: string]: EncuestaData }>('https://consultoriacpi.firebaseio.com/encuestas.json')
      .pipe(map(resData => {
          const encuestas = [];

          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              encuestas.push(new EncuestaModel(
                key,
                resData[key].idEmpresa,
                resData[key].numPersonas,
                resData[key].quest1,
                resData[key].quest2,
                resData[key].quest3));
            }
          }

          return encuestas;
        }),
        tap(encuestas => {
          this.encuestas.next(encuestas);
        })
      ).toPromise();
  }

  async agregarPersona(persona: PersonaModel, quest2: Quest2Model, quest3: Quest3Model) {
    return await this.http.post<{ name: string }>('https://consultoriacpi.firebaseio.com/personas.json', {
      ...persona,
      id: null
    })
      .pipe(
        switchMap(resData => {
          this.uniqueId = resData.name as string;
          console.log(this.uniqueId);
          if (quest2 != null) {
            quest2.idPersona = this.uniqueId;
            this.agregarQuest2(quest2);
          }
          if (quest3 != null) {
            quest3.idPersona = this.uniqueId;
            this.agregarQuest3(quest3);
          }
          return this.uniqueId;
        })
      ).toPromise();
  }

  async personasFolio(folio: string) {
    return await this.http
      .get<{ [key: string]: PersonaData }>('https://consultoriacpi.firebaseio.com/personas.json')
      .pipe(map(resData => {
          const personas = [];

          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              if (resData[key].folio === folio) {
                personas.push(new PersonaModel(
                  resData[key].nombre,
                  resData[key].edad,
                  resData[key].sexo,
                  resData[key].edoCivil,
                  resData[key].estudios,
                  resData[key].ocupacion,
                  resData[key].departamento,
                  resData[key].puesto,
                  resData[key].contratacion,
                  resData[key].personal,
                  resData[key].jornada,
                  resData[key].rotacion,
                  resData[key].expActual,
                  resData[key].expTotal,
                  resData[key].folio,
                  resData[key].quest1,
                  resData[key].quest2,
                  resData[key].quest3,
                  resData[key].atencionQ1,
                  key));
              }
            }
          }

          return personas;
        }),
        tap(personas => {
          this.personas.next(personas);
        })
      ).toPromise();
  }

  async agregarQuest2(quest2: Quest2Model) {
    console.log(quest2);
    return await this.http.post<{ name: string }>('https://consultoriacpi.firebaseio.com/quest2.json', {
      ...quest2,
      id: null
    })
      .pipe(
        switchMap(resData => {
          this.uniqueId = resData.name as string;
          // console.log(this.uniqueId);
          return this.uniqueId;
        })
      ).toPromise();
  }

  async agregarQuest3(quest3: Quest2Model) {
    console.log(quest3);
    return await this.http.post<{ name: string }>('https://consultoriacpi.firebaseio.com/quest3.json', {
      ...quest3,
      id: null
    })
      .pipe(
        switchMap(resData => {
          this.uniqueId = resData.name as string;
          // console.log(this.uniqueId);
          return this.uniqueId;
        })
      ).toPromise();
  }

  deleteEncuesta(id: string) {
    let encuestaUpdated: EncuestaModel[];
    return this.encuestas.pipe(
      take(1),
      switchMap(encuestas => {
        const updatedEmpresaIndex = encuestas.findIndex(en => en.id === id);
        encuestaUpdated = [...encuestas];
        encuestaUpdated.splice(updatedEmpresaIndex, 1);
        return this.http
          .delete(`https://consultoriacpi.firebaseio.com/encuestas/${id}.json`);
      }),
      tap(() => {
        this.encuestas.next(encuestaUpdated);
      })
    );

  }

  async quest2Personas(ids: string[]) {
    return await this.http
      .get<{ [key: string]: Quest2Data }>('https://consultoriacpi.firebaseio.com/quest2.json')
      .pipe(map(resData => {
          const quest2 = [];

          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              if (ids.find(id => id === resData[key].idPersona)) {
                quest2.push(new Quest2Model(
                  key,
                  resData[key].idPersona,
                  resData[key].calificacion,
                  resData[key].ambienteTrabajo,
                  resData[key].factoresActividad,
                  resData[key].organizacionTiempo,
                  resData[key].lideranzoRelaciones,
                  resData[key].condicionesTrabajo,
                  resData[key].cargaTrabajo,
                  resData[key].faltaControl,
                  resData[key].jornadaTrabajo,
                  resData[key].interferenciaRelacion,
                  resData[key].liderazgo,
                  resData[key].relacionesTrabajo,
                  resData[key].violencia));
              }
            }
          }

          return quest2;
        }),
        tap(quest2 => {
          this.quest2.next(quest2);
        })
      ).toPromise();
  }

  getQuest2(): Observable<Quest2Model[]>  {
    return this.quest2.asObservable();
  }

  async quest3Personas(ids: string[]) {
    return await this.http
      .get<{ [key: string]: Quest3Data }>('https://consultoriacpi.firebaseio.com/quest3.json')
      .pipe(map(resData => {
          const quest3 = [];

          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              if (ids.find(id => id === resData[key].idPersona)) {
                quest3.push(new Quest3Model(
                  key,
                  resData[key].idPersona,
                  resData[key].calificacion,
                  resData[key].ambienteTrabajo,
                  resData[key].factoresActividad,
                  resData[key].organizacionTiempo,
                  resData[key].lideranzoRelaciones,
                  resData[key].entornoOrganizacional,
                  resData[key].condicionesTrabajo,
                  resData[key].cargaTrabajo,
                  resData[key].faltaControl,
                  resData[key].jornadaTrabajo,
                  resData[key].interferenciaRelacion,
                  resData[key].liderazgo,
                  resData[key].relacionesTrabajo,
                  resData[key].violencia,
                  resData[key].reconocimientoDesemp,
                  resData[key].insuficientePertenencia));
              }
            }
          }

          return quest3;
        }),
        tap(quest3 => {
          this.quest3.next(quest3);
        })
      ).toPromise();
  }

  getQuest3(): Observable<Quest3Model[]>  {
    return this.quest3.asObservable();
  }

  updateEmpresa(encuesta: EncuestaModel) {
    let encuestasUpdated: EncuestaModel[];
    return this.encuestas.pipe(
      take(1),
      switchMap(encuestas => {
        const updatedEncuestaIndex = encuestas.findIndex(emp => emp.id === encuesta.id);
        encuestasUpdated = [...encuestas];
        encuestasUpdated[updatedEncuestaIndex] = encuesta;
        return this.http
          .put(`https://consultoriacpi.firebaseio.com/encuestas/${encuesta.id}.json`,
            {...encuesta, id: null}
          );
      }),
      tap(() => {
        this.encuestas.next(encuestasUpdated);
      })
    );
  }


  constructor(private http: HttpClient) { }
}
