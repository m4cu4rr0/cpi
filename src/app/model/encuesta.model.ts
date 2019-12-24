export class EncuestaModel {
  constructor(public id: string,
              public idEmpresa: string,
              public numPersonas: number,
              public quest1: boolean,
              public quest2: boolean,
              public quest3: boolean,
              public areas: string[]) {}

}
