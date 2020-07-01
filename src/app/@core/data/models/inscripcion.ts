import { EstadoInscripcion } from './estado_inscripcion';
import { TipoInscripcion } from './tipo_inscripcion';
import { Periodo } from './periodo';

export class Inscripcion {
  Id: number;
  PersonaId: number;
  ProgramaAcademicoId: number;
  ReciboMatriculaId: number;
  ReciboInscripcionId: number;
  PeriodoId: Periodo;
  AceptaTerminos: boolean;
  FechaAceptaTerminos: Date;
  TipoInscripcionId: TipoInscripcion;
  EstadoInscripcionId: EstadoInscripcion;
  Activo: boolean;
  PuntajeTotal: number;
}
