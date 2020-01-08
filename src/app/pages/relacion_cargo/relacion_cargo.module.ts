import { RelacionCargoRoutingModule, routedComponents } from './relacion_cargo-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRelacionCargoComponent } from './crud-relacion_cargo/crud-relacion_cargo.component';

@NgModule({
  imports: [
    ThemeModule,
    RelacionCargoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ExperienciaService,
  ],
  exports: [
    CrudRelacionCargoComponent,
  ],
})
export class RelacionCargoModule { }
