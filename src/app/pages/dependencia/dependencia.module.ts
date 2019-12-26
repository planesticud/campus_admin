import { DependenciaRoutingModule, routedComponents } from './dependencia-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudDependenciaComponent } from './crud-dependencia/crud-dependencia.component';

@NgModule({
  imports: [
    ThemeModule,
    DependenciaRoutingModule,
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
    CrudDependenciaComponent,
  ],
})
export class DependenciaModule { }
