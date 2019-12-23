import { TipoRelacionOrganizacionRoutingModule, routedComponents } from './tipo_relacion_organizacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OrganizacionService } from '../../@core/data/organizacion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoRelacionOrganizacionComponent } from './crud-tipo_relacion_organizacion/crud-tipo_relacion_organizacion.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoRelacionOrganizacionRoutingModule,
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
    CrudTipoRelacionOrganizacionComponent,
  ],
})
export class TipoRelacionOrganizacionModule { }
