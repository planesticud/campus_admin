import { RelacionOrganizacionRoutingModule, routedComponents } from './relacion_organizacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OrganizacionService } from '../../@core/data/organizacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudRelacionOrganizacionComponent } from './crud-relacion_organizacion/crud-relacion_organizacion.component';

@NgModule({
  imports: [
    ThemeModule,
    RelacionOrganizacionRoutingModule,
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
    CrudRelacionOrganizacionComponent,
  ],
})
export class RelacionOrganizacionModule { }
