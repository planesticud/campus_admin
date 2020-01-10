import { ProgramaAcademicoRoutingModule, routedComponents } from './programa_academico-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OrganizacionService } from '../../@core/data/organizacion.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudProgramaAcademicoComponent } from './crud-programa_academico/crud-programa_academico.component';

@NgModule({
  imports: [
    ThemeModule,
    ProgramaAcademicoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    OrganizacionService,
    ProgramaAcademicoService,
    CoreService,
  ],
  exports: [
    CrudProgramaAcademicoComponent,
  ],
})
export class ProgramaAcademicoModule { }
