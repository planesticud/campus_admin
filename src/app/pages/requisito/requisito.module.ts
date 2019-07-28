import { RequisitoRoutingModule, routedComponents } from './requisito-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DescuentoAcademicoService } from '../../@core/data/descuento_academico.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRequisitoComponent } from './crud-requisito/crud-requisito.component';

@NgModule({
  imports: [
    ThemeModule,
    RequisitoRoutingModule,
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
    CrudRequisitoComponent,
  ],
})
export class RequisitoModule { }
