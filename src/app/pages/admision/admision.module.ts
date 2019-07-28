import { AdmisionRoutingModule, routedComponents } from './admision-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudAdmisionComponent } from './crud-admision/crud-admision.component';
import { PersonaService } from '../../@core/data/persona.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';


@NgModule({
  imports: [
    ThemeModule,
    AdmisionRoutingModule,
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
    ProgramaAcademicoService,
  ],
  exports: [
    CrudAdmisionComponent,
  ],
})
export class AdmisionModule { }
