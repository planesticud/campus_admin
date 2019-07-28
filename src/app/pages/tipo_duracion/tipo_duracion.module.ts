import { TipoDuracionRoutingModule, routedComponents } from './tipo_duracion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DescuentoAcademicoService } from '../../@core/data/descuento_academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDuracionComponent } from './crud-tipo_duracion/crud-tipo_duracion.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDuracionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DescuentoAcademicoService,
  ],
  exports: [
    CrudTipoDuracionComponent,
  ],
})
export class TipoDuracionModule { }
