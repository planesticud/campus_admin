import { PeriodoAcademicoRoutingModule, routedComponents } from './periodo_academico-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudPeriodoAcademicoComponent } from './crud-periodo_academico/crud-periodo_academico.component';
import { InscripcionService } from '../../@core/data/inscripcion.service';


@NgModule({
  imports: [
    ThemeModule,
    PeriodoAcademicoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    InscripcionService,
  ],
  exports: [
    CrudPeriodoAcademicoComponent,
  ],
})
export class PeriodoAcademicoModule { }
