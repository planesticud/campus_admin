import { AtributoLugarRoutingModule, routedComponents } from './atributo_lugar-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UbicacionService } from '../../@core/data/ubicacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudAtributoLugarComponent } from './crud-atributo_lugar/crud-atributo_lugar.component';

@NgModule({
  imports: [
    ThemeModule,
    AtributoLugarRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UbicacionService,
  ],
  exports: [
    CrudAtributoLugarComponent,
  ],
})
export class AtributoLugarModule { }