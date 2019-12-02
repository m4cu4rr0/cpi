import {Injectable} from '@angular/core';
import {EmpresaModel} from "../model/empresa.model";
import {take, tap, map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";

interface EmpresaData {
  contacto: string;
  mail: string;
  razonSocial: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  uniqueId: string;

  private empresas = new BehaviorSubject<EmpresaModel[]>([]);

  getEmpresas(): Observable<EmpresaModel[]> {
    return this.empresas.asObservable();
  }

  async fetchEmpresas() {
    return await this.http
      .get<{ [key: string]: EmpresaData }>('https://consultoriacpi.firebaseio.com/empresas.json')
      .pipe(map(resData => {
          const empresas = [];

          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              empresas.push(new EmpresaModel(
                key,
                resData[key].razonSocial,
                resData[key].telefono,
                resData[key].contacto,
                resData[key].mail))
            }
          }

          return empresas;
        }),
        tap(empresas => {
          this.empresas.next(empresas);
        })
      ).toPromise();
  }

  getEmpresa(id: string) {
    return this.empresas.pipe(
      take(1),
      map(empresas => {
        return {...empresas.find(p => p.id === id)};
      })
    );
  }

  agregarEmpresa(empresa: EmpresaModel) {
    // console.log(empresa);
    return this.http.post<{ name: string }>('https://consultoriacpi.firebaseio.com/empresas.json', {
      ...empresa,
      id: null
    })
      .pipe(
        switchMap(resData => {
          this.uniqueId = resData.name;
          return this.empresas;
        }),
        take(1),
        tap(empresas => {
          empresa.id = this.uniqueId;
          this.empresas.next(empresas.concat([empresa]));
        })
      );
  }

  updateEmpresa(empresa: EmpresaModel) {
    console.log('Entrando a update');
    let empresasUpdated: EmpresaModel[];
    return this.empresas.pipe(
      take(1),
      switchMap(empresas => {
        const updatedEmpresaIndex = empresas.findIndex(emp => emp.id === empresa.id);
        empresasUpdated = [...empresas];
        empresasUpdated[updatedEmpresaIndex] = empresa;
        return this.http
          .put(`https://consultoriacpi.firebaseio.com/empresas/${empresa.id}.json`,
            {...empresa, id: null}
            );
      }),
      tap(() => {
        this.empresas.next(empresasUpdated);
      })
    );
  }

  deleteEmpresa(id: string){
    console.log('Entrando a delete');
    let empresasUpdated: EmpresaModel[];
    return this.empresas.pipe(
      take(1),
      switchMap(empresas => {
        const updatedEmpresaIndex = empresas.findIndex(emp => emp.id === id);
        empresasUpdated = [...empresas];
        empresasUpdated.splice(updatedEmpresaIndex, 1);
        return this.http
          .delete(`https://consultoriacpi.firebaseio.com/empresas/${id}.json`);
      }),
      tap(() => {
        this.empresas.next(empresasUpdated);
      })
    );

  }

  constructor(private http: HttpClient) {
  }
}
