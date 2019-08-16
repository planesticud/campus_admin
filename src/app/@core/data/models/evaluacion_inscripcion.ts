
//import { Entrevista } from '../../data/models/entrevista';
import { RequisitoProgramaAcademico } from '../../data/models/requisito_programa_academico';

export class EvaluacionInscripcion {
  Id: number;
  InscripcionId: any;
  NotaFinal: number;
  RequisitoProgramaAcademicoId: RequisitoProgramaAcademico;
  EntrevistaId: any;
  Activo: boolean;
}
