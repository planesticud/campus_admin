import { DependenciaPadreRoutingModule, routedComponents } from './dependencia_padre-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudDependenciaPadreComponent } from './crud-dependencia_padre/crud-dependencia_padre.component';

@NgModule({
  imports: [
    ThemeModule,
    DependenciaPadreRoutingModule,
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
    CrudDependenciaPadreComponent,
  ],
})
export class DependenciaPadreModule { }