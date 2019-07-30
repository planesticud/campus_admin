import { Inscripcion } from './inscripcion';
import { TipoProyecto } from './tipo_proyecto';
import { LineaInvestigacionGrupoInvestigacion } from './linea_investigacion_grupo_investigacion';

export class Propuesta {
  Id: number;
  Nombre: string;
  Resumen: string;
  DocumentoId: number;
  LineaInvestigacionGrupoInvestigacionId: LineaInvestigacionGrupoInvestigacion;
  Activo: boolean;
  InscripcionId: Inscripcion;
  TipoProyectoId: TipoProyecto;
}
