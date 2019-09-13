import { EntrevistadorRoutingModule, routedComponents } from './entrevistador-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EntrevistaService } from '../../@core/data/entrevista.service';
import { PersonaService } from '../../@core/data/persona.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEntrevistadorComponent } from './crud-entrevistador/crud-entrevistador.component';

@NgModule({
  imports: [
    ThemeModule,
    EntrevistadorRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EntrevistaService,
    PersonaService,
    ProgramaAcademicoService,
    ProgramaOikosService,
  ],
  exports: [
    CrudEntrevistadorComponent,
  ],
})
export class EntrevistadorModule { }
