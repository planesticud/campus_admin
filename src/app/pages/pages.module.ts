import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/shared.module';
import { MenuService } from '../@core/data/menu.service';
import { CampusMidService } from '../@core/data/campus_mid.service';
import { ExperienciaService } from '../@core/data/experiencia.service';
import { OrganizacionService } from '../@core/data/organizacion.service';
import { IdiomaService } from '../@core/data/idioma.service';
import { NuxeoService } from '../@core/utils/nuxeo.service';
import { AdmisionesService } from '../@core/data/admisiones.service';
import { DocumentoService } from '../@core/data/documento.service';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    SharedModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    MenuService,
    CampusMidService,
    ExperienciaService,
    OrganizacionService,
    IdiomaService,
    NuxeoService,
    AdmisionesService,
    DocumentoService,
  ],
})
export class PagesModule {jj
}
