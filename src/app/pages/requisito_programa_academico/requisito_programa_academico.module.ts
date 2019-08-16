import { RequisitoProgramaAcademicoRoutingModule, routedComponents } from './requisito_programa_academico-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RequisitoService } from '../../@core/data/requisito.service';
import { CoreService } from '../../@core/data/core.service';
import { ProgramaAcademicoService } from '../../@core/data/programa.academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRequisitoProgramaAcademicoComponent } from './crud-requisito_programa_academico/crud-requisito_programa_academico.component';

@NgModule({
  imports: [
    ThemeModule,
    RequisitoProgramaAcademicoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    RequisitoService,
    CoreService,
    ProgramaAcademicoService,
  ],
  exports: [
    CrudRequisitoProgramaAcademicoComponent,
  ],
})
export class RequisitoProgramaAcademicoModule { }
