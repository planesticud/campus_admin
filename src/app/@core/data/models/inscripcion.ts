import { EstadoInscripcion } from './estado_inscripcion';
import { TipoInscripcion } from './tipo_inscripcion';
import { Enfasis } from './enfasis';
import { Periodo } from './periodo';

export class Inscripcion {
  Id: number;
  PersonaId: number;
  ProgramaAcademicoId: number;
  ReciboMatriculaId: number;
  ReciboInscripcionId: number;
  PeriodoId: Periodo;
  EnfasisId: Enfasis;
  AceptaTerminos: boolean;
  FechaAceptaTerminos: Date;
  TipoInscripcionId: TipoInscripcion;
  EstadoInscripcionId: EstadoInscripcion;
  Activo: boolean;
}
