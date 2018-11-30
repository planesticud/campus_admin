import { TipoDescuentoMatriculaRoutingModule, routedComponents } from './tipo_descuento_matricula-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { MatriculaDescuentosService } from '../../@core/data/matricula_descuentos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDescuentoMatriculaComponent } from './crud-tipo_descuento_matricula/crud-tipo_descuento_matricula.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDescuentoMatriculaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    MatriculaDescuentosService,
  ],
  exports: [
    CrudTipoDescuentoMatriculaComponent,
  ],
})
export class TipoDescuentoMatriculaModule { }
