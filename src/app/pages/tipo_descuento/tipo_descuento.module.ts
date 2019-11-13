import { TipoDescuentoRoutingModule, routedComponents } from './tipo_descuento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { DescuentoAcademicoService } from '../../@core/data/descuento_academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDescuentoComponent } from './crud-tipo_descuento/crud-tipo_descuento.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDescuentoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
    DescuentoAcademicoService,
  ],
  exports: [
    CrudTipoDescuentoComponent,
  ],
})
export class TipoDescuentoModule { }
