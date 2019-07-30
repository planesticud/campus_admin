import { TipoPeriodo } from './tipo_periodo';

export class Periodo {
  Id: number;
  Nombre: string;
  Descripcion: string;
  CodigoAbreviacion: string;
  NumeroOrden: number;
  Activo: boolean;
  TipoPeriodoId: TipoPeriodo;
}
