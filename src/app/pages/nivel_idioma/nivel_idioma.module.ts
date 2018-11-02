import { NivelIdiomaRoutingModule, routedComponents } from './nivel_idioma-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { IdiomaService } from '../../@core/data/idioma.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudNivelIdiomaComponent } from './crud-nivel_idioma/crud-nivel_idioma.component';

@NgModule({
  imports: [
    ThemeModule,
    NivelIdiomaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    IdiomaService,
  ],
  exports: [
    CrudNivelIdiomaComponent,
  ],
})
export class NivelIdiomaModule { }
