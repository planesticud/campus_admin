
import { Periodo } from './periodo';
import { Requisito } from './requisito';
import { ProgramaAcademico } from './programa.academico';
export class RequisitoProgramaAcademico {
  Id: number;
  Nombre: string;
  ProgramaAcademicoId: ProgramaAcademico;
  PeriodoId: Periodo;
  RequisitoId: Requisito;
  Porcentaje: number;
  Activo: boolean;
}
