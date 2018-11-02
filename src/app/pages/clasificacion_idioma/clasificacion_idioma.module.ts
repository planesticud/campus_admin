import { ClasificacionIdiomaRoutingModule, routedComponents } from './clasificacion_idioma-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { IdiomaService } from '../../@core/data/idioma.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudClasificacionIdiomaComponent } from './crud-clasificacion_idioma/crud-clasificacion_idioma.component';

@NgModule({
  imports: [
    ThemeModule,
    ClasificacionIdiomaRoutingModule,
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
    CrudClasificacionIdiomaComponent,
  ],
})
export class ClasificacionIdiomaModule { }
