import { TipoDescuento } from './tipo_descuento';

export class DescuentosDependencia {
  Id: number;
  TipoDescuentoId: TipoDescuento;
  PeriodoId: any;
  DependenciaId: any;
  PorcentajeDescuento: number;
  Activo: boolean;
}
