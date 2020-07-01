import { VistaInformacionRoutingModule, routedComponents } from './vista_informacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { ViewInfoPersonaComponent } from './view-info_persona/view-info-persona.component';
import { ViewInfoCaracteristicaComponent } from './view-info_caracteristica/view-info_caracteristica.component';
import { ViewInformacionContactoComponent } from './view-informacion_contacto/view-informacion_contacto.component';
import { ViewFormacionAcademicaComponent } from './view-formacion_academica/view-formacion_academica.component';
import { ViewIdiomasComponent } from './view-idiomas/view-idiomas.component';
import { ViewExperienciaLaboralComponent } from './view-experiencia_laboral/view-experiencia_laboral.component';
import { ViewDocumentoProgramaComponent } from './view-documento_programa/view-documento_programa.component';
import { ViewDescuentoAcademicoComponent } from './view-descuento_academico/view-descuento_academico.component';
import { ViewPropuestaGradoComponent } from './view-propuesta_grado/view-propuesta_grado.component';
import { ViewReciboComponent } from './view-recibo/view-recibo.component';
import { UserService } from '../../@core/data/users.service';
import { NuxeoService } from '../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../@core/data/documento.service';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { CoreService } from '../../@core/data/core.service';
import { IdiomaService } from '../../@core/data/idioma.service';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { DocumentoProgramaService } from '../../@core/data/documento_programa.service';
import { ReciboService } from '../../@core/data/recibo.service';

@NgModule({
  imports: [
    ThemeModule,
    VistaInformacionRoutingModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UserService,
    NuxeoService,
    DocumentoService,
    InscripcionService,
    CampusMidService,
    CoreService,
    IdiomaService,
    ExperienciaService,
    DocumentoProgramaService,
    ReciboService,
  ],
  exports: [
    ViewInfoPersonaComponent,
    ViewInfoCaracteristicaComponent,
    ViewInformacionContactoComponent,
    ViewFormacionAcademicaComponent,
    ViewIdiomasComponent,
    ViewExperienciaLaboralComponent,
    ViewDocumentoProgramaComponent,
    ViewDescuentoAcademicoComponent,
    ViewPropuestaGradoComponent,
    ViewReciboComponent,
  ],
})
export class VistaInformacionModule { }
