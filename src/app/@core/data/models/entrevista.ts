
import { TipoEntrevista } from './tipo_entrevista';
import { EstadoEntrevista } from './estado_entrevista';
export class Entrevista {
  Id: number;
  InscripcionId: number;
  FechaEntrevista: string;
  EstadoEntrevistaId: EstadoEntrevista;
  TipoEntrevistaId: TipoEntrevista;
  Activo: boolean;
}
