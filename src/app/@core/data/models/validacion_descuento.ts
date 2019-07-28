import { SolicitudDescuento } from './solicitud_descuento';
import { TipoDuracion } from './tipo_duracion';

export class ValidacionDescuento {
  Id: number;
  SolicitudDescuentoId: SolicitudDescuento;
  TipoDuracionId: TipoDuracion;
  ReciboMatriculaId: number;
  Autorizado: boolean;
  ValorBase: number;
  ValorConDescuento: number;
  Activo: boolean;
}
