import { TipoDescuento } from './tipo_descuento';
import { Requisito } from './requisito';

export class RequisitoTipoDescuento {
  Id: number;
  TipoDescuentoId: TipoDescuento;
  RequisitoId: Requisito;
  Activo: boolean;
}
