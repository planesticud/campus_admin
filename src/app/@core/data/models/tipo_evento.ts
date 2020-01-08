import { TipoRecurrencia } from './tipo_recurrencia';

export class TipoEvento {
  Id: number;
  Nombre: string;
  Descripcion: string;
  CodigoAbreviacion: string;
  Activo: boolean;
  NumeroOrden: number;
  DependenciaId: any;
  TipoRecurrenciaId: TipoRecurrencia;
}
