import { MetadatoSubtipoProduccionRoutingModule, routedComponents } from './metadato_subtipo_produccion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudMetadatoSubtipoProduccionComponent } from './crud-metadato_subtipo_produccion/crud-metadato_subtipo_produccion.component';

@NgModule({
  imports: [
    ThemeModule,
    MetadatoSubtipoProduccionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProduccionAcademicaService,
  ],
  exports: [
    CrudMetadatoSubtipoProduccionComponent,
  ],
})
export class MetadatoSubtipoProduccionModule { }
