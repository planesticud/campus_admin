import { AdmitidosRoutingModule, routedComponents } from './admitidos-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdmisionesService } from '../../@core/data/admisiones.service';
import { PersonaService } from '../../@core/data/persona.service';
import { ExcelService } from '../../@core/data/excel.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudAdmitidosComponent } from './crud-admitidos/crud-admitidos.component';

@NgModule({
  imports: [
    ThemeModule,
    AdmitidosRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    AdmisionesService,
    ProgramaAcademicoService,
    PersonaService,
    ExcelService,
  ],
  exports: [
    CrudAdmitidosComponent,
  ],
})
export class AdmitidosModule { }