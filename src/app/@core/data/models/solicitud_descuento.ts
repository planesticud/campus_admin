import { DescuentosDependencia } from './descuentos_dependencia';

export class SolicitudDescuento {
  Id: number;
  DescuentosDependenciaId: DescuentosDependencia;
  PeriodoId: number;
  PersonaId: any;
  Estado: string;
  Activo: boolean;
}
