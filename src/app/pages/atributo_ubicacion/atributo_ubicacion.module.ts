import { AtributoUbicacionRoutingModule, routedComponents } from './atributo_ubicacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EnteService } from '../../@core/data/ente.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudAtributoUbicacionComponent } from './crud-atributo_ubicacion/crud-atributo_ubicacion.component';

@NgModule({
  imports: [
    ThemeModule,
    AtributoUbicacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    EnteService,
  ],
  exports: [
    CrudAtributoUbicacionComponent,
  ],
})
export class AtributoUbicacionModule { }
