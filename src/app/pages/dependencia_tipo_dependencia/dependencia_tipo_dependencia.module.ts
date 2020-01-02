import { DependenciaTipoDependenciaRoutingModule, routedComponents } from './dependencia_tipo_dependencia-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudDependenciaTipoDependenciaComponent } from './crud-dependencia_tipo_dependencia/crud-dependencia_tipo_dependencia.component';

@NgModule({
  imports: [
    ThemeModule,
    DependenciaTipoDependenciaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProgramaOikosService,
  ],
  exports: [
    CrudDependenciaTipoDependenciaComponent,
  ],
})
export class DependenciaTipoDependenciaModule { }
