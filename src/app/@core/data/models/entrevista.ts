import { EstadoEntrevista } from './estado_entrevista';
import { TipoEntrevista } from './tipo_entrevista';

export class Entrevista {
  Id: number;
  InscripcionId: number;
  FechaEntrevista: string;
  Nota: number;
  EstadoEntrevistaId: EstadoEntrevista;
  TipoEntrevistaId: TipoEntrevista;
  Activo: boolean;
}
