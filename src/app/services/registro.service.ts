import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EncuestaModel} from '../model/encuesta.model';
import {switchMap, take, tap, map} from 'rxjs/internal/operators';
import {BehaviorSubject, Observable} from 'rxjs/index';

interface EncuestaData {
  id: string;
  idEmpresa: string;
  numPersonas: number;
  quest1: boolean;
  quest2: boolean;
  quest3: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  uniqueId: string;

  private encuestas = new BehaviorSubject<EncuestaModel[]>([]);

  getEncuestas(): Observable<EncuestaModel[]> {
    return this.encuestas.asObservable();
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


  constructor(private http: HttpClient) { }
}
