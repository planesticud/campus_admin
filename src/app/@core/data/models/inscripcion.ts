import { Periodo } from '../models/periodo';
import { TipoInscripcion } from '../models/tipo_inscripcion';
import { EstadoInscripcion } from '../models/estado_inscripcion';
import { Persona } from '../models/persona';

export class Inscripcion {
  Id: number;
  PersonaId: Persona;
  ProgramaAcademicoId: number;
  ReciboMatriculaId: number;
  ReciboInscripcionId: number;
  PeriodoId: Periodo;
  EnfasisId: number;
  AceptaTerminos: boolean;
  FechaAceptaTerminos: string;
  Activo: boolean;
  EstadoInscripcionId: EstadoInscripcion;
  TipoInscripcionId: TipoInscripcion;
  PuntajeTotal: number;
}
