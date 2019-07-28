import { RequisitoTipoDescuentoRoutingModule, routedComponents } from './requisito_tipo_descuento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DescuentoAcademicoService } from '../../@core/data/descuento_academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRequisitoTipoDescuentoComponent } from './crud-requisito_tipo_descuento/crud-requisito_tipo_descuento.component';

@NgModule({
  imports: [
    ThemeModule,
    RequisitoTipoDescuentoRoutingModule,
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
    CrudRequisitoTipoDescuentoComponent,
  ],
})
export class RequisitoTipoDescuentoModule { }
