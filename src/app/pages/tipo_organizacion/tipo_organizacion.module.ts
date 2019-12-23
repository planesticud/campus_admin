import { TipoOrganizacionRoutingModule, routedComponents } from './tipo_organizacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OrganizacionService } from '../../@core/data/organizacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoOrganizacionComponent } from './crud-tipo_organizacion/crud-tipo_organizacion.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoOrganizacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    OrganizacionService,
  ],
  exports: [
    CrudTipoOrganizacionComponent,
  ],
})
export class TipoOrganizacionModule { }
