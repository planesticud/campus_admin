import { DetalleAdmisionRoutingModule, routedComponents } from './detalle_admision-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { AdmisionesService } from './../../@core/data/admisiones.service';


@NgModule({
  imports: [
    ThemeModule,
    DetalleAdmisionRoutingModule,
    // Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    AdmisionesService,
  ],
  exports: [
  ],
})
export class DetalleAdmisionModule { }
