import { NucleoBasicoConocimientoRoutingModule, routedComponents } from './nucleo_basico_conocimiento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudNucleoBasicoConocimientoComponent } from './crud-nucleo_basico_conocimiento/crud-nucleo_basico_conocimiento.component';

@NgModule({
  imports: [
    ThemeModule,
    NucleoBasicoConocimientoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
  ],
  exports: [
    CrudNucleoBasicoConocimientoComponent,
  ],
})
export class NucleoBasicoConocimientoModule { }
