import { InscripcionRoutingModule, routedComponents } from './inscripcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudInscripcionComponent } from './crud-inscripcion/crud-inscripcion.component';
import { PersonaService } from '../../@core/data/persona.service';
import { CoreService } from '../../@core/data/core.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';

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
    InscripcionService,
    PersonaService,
    CoreService,
    ProgramaAcademicoService,
  ],
  exports: [
    CrudInscripcionComponent,
  ],
})
export class InscripcionModule { }
