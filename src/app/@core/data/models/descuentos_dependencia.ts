import { TipoDescuento } from './tipo_descuento';

export class DescuentosDependencia {
  Id: number;
  TipoDescuentoId: TipoDescuento;
  PeriodoId: number;
  DependenciaId: any;
  PorcentajeDescuento: number;
  Activo: boolean;
}
