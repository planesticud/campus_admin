import { AsignarEntrevistaRoutingModule, routedComponents } from './asignar_entrevista-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EntrevistaService } from '../../@core/data/entrevista.service';
import { CoreService } from '../../@core/data/core.service';
import { PersonaService } from '../../@core/data/persona.service';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudAsignarEntrevistaComponent } from './crud-asignar_entrevista/crud-asignar_entrevista.component';

@NgModule({
  imports: [
    ThemeModule,
    AsignarEntrevistaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
    EntrevistaService,
    PersonaService,
    InscripcionService,
    ProgramaAcademicoService,
  ],
  exports: [
    CrudAsignarEntrevistaComponent,
  ],
})
export class AsignarEntrevistaModule { }
