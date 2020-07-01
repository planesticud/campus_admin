import { InscripcionRoutingModule, routedComponents } from './inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { CoreService } from '../../@core/data/core.service';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { UbicacionService } from '../../@core/data/ubicacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { ViewInscripcionComponent } from './view-inscripcion/view-inscripcion.component';
import { VistaInformacionModule } from '../vista_informacion/vista_informacion.module';

@NgModule({
  imports: [
    ThemeModule,
    InscripcionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
    VistaInformacionModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CampusMidService,
    CoreService,
    InscripcionService,
    ProgramaOikosService,
    UbicacionService,
  ],
  exports: [
    ViewInscripcionComponent,
  ],
})
export class InscripcionModule { }
