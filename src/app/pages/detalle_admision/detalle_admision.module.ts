import { DetalleAdmisionRoutingModule, routedComponents } from './detalle_admision-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';
import { InscripcionService } from './../../@core/data/inscripcion.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { OrganizacionService } from '../../@core/data/organizacion.service';
import { IdiomaService } from '../../@core/data/idioma.service';
import { DocumentoService } from '../../@core/data/documento.service';
import { NuxeoService } from '../../@core/utils/nuxeo.service';



@NgModule({
  imports: [
    ThemeModule,
    DetalleAdmisionRoutingModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    InscripcionService,
    CampusMidService,
    ExperienciaService,
    OrganizacionService,
    IdiomaService,
    DocumentoService,
    NuxeoService,
  ],
  exports: [
  ],
})
export class DetalleAdmisionModule { }
