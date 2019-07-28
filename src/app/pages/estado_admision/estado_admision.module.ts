import { EstadoAdmisionRoutingModule, routedComponents } from './estado_admision-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEstadoAdmisionComponent } from './crud-estado_admision/crud-estado_admision.component';

@NgModule({
  imports: [
    ThemeModule,
    EstadoAdmisionRoutingModule,
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
    CrudEstadoAdmisionComponent,
  ],
})
export class EstadoAdmisionModule { }
