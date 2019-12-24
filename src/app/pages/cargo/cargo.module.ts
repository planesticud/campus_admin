import { CargoRoutingModule, routedComponents } from './cargo-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudCargoComponent } from './crud-cargo/crud-cargo.component';

@NgModule({
  imports: [
    ThemeModule,
    CargoRoutingModule,
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
    CrudCargoComponent,
  ],
})
export class CargoModule { }
