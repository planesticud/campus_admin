import { LineaInvestigacion } from './linea_investigacion';
import { GrupoInvestigacion } from './grupo_investigacion';

export class LineaInvestigacionGrupoInvestigacion {
  Id: number;
  GrupoInvestigacionId: GrupoInvestigacion;
  LineaInvestigacionId: LineaInvestigacion;
  Activo: boolean;
}
