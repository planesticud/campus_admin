import { EstadoInscripcionRoutingModule, routedComponents } from './estado_inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEstadoInscripcionComponent } from './crud-estado_inscripcion/crud-estado_inscripcion.component';

@NgModule({
  imports: [
    ThemeModule,
    EstadoInscripcionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    InscripcionService,
  ],
  exports: [
    CrudEstadoInscripcionComponent,
  ],
})
export class EstadoInscripcionModule { }
