import { DescuentoMatriculaRoutingModule, routedComponents } from './descuento_matricula-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { MatriculaDescuentosService } from '../../@core/data/matricula_descuentos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudDescuentoMatriculaComponent } from './crud-descuento_matricula/crud-descuento_matricula.component';

@NgModule({
  imports: [
    ThemeModule,
    DescuentoMatriculaRoutingModule,
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
    CrudDescuentoMatriculaComponent,
  ],
})
export class DescuentoMatriculaModule { }
