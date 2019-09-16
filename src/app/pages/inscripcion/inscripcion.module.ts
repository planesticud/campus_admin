import { InscripcionRoutingModule, routedComponents } from './inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SelecadmitidosService } from '../../@core/data/selecadmitidos.service';
import { CoreService } from '../../@core/data/core.service';
import { EnteCrudService } from '../../@core/data/ente.crud.service';
import { PersonaService } from '../../@core/data/persona.service';
import { EvaluacionService } from '../../@core/data/evaluacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudInscripcionComponent } from './crud-inscripcion/crud-inscripcion.component';

@NgModule({
  imports: [
    ThemeModule,
    InscripcionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SelecadmitidosService,
    CoreService,
    EnteCrudService,
    PersonaService,
    EvaluacionService,
  ],
  exports: [
    CrudInscripcionComponent,
  ],
})
export class InscripcionModule { }
