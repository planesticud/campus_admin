import { TipoDependenciaDescuentoRoutingModule, routedComponents } from './tipo_dependencia_descuento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { DescuentoAcademicoService } from '../../@core/data/descuento_academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDependenciaDescuentoComponent } from './crud-tipo_dependencia_descuento/crud-tipo_dependencia_descuento.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDependenciaDescuentoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DescuentoAcademicoService,
    ProgramaOikosService,
  ],
  exports: [
    CrudTipoDependenciaDescuentoComponent,
  ],
})
export class TipoDependenciaDescuentoModule { }
