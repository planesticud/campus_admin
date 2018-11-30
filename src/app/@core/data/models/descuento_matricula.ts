import { TipoDescuentoMatricula } from './tipo_descuento_matricula';

export class DescuentoMatricula {
  Id: number;
  Metadatos: string;
  Enlace: string;
  Descuento: number;
  IdTipoDescuentoMatricula: TipoDescuentoMatricula;
  Ente: number;
}
