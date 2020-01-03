import { ValorAtributoLugarRoutingModule, routedComponents } from './valor_atributo_lugar-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UbicacionService } from '../../@core/data/ubicacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudValorAtributoLugarComponent } from './crud-valor_atributo_lugar/crud-valor_atributo_lugar.component';

@NgModule({
  imports: [
    ThemeModule,
    ValorAtributoLugarRoutingModule,
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
    CrudValorAtributoLugarComponent,
  ],
})
export class ValorAtributoLugarModule { }
