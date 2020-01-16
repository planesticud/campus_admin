import { OrganizacionRoutingModule, routedComponents } from './organizacion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UbicacionService } from '../../@core/data/ubicacion.service';
import { OrganizacionService } from '../../@core/data/organizacion.service';
import { EnteService } from '../../@core/data/ente.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudOrganizacionComponent } from './crud-organizacion/crud-organizacion.component';

@NgModule({
  imports: [
    ThemeModule,
    OrganizacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UbicacionService,
    OrganizacionService,
    EnteService,
    CampusMidService,
  ],
  exports: [
    CrudOrganizacionComponent,
  ],
})
export class OrganizacionModule { }
