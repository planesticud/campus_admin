import { Periodo } from '../models/periodo';

export class CuposPorDepedencia {
  Id: number;
  DependenciaId: number;
  CuposHabilitados: number;
  CuposOpcionados: number;
  Activo: boolean;
  PeriodoId: Periodo;
  }
