import { TipoMetadatoRoutingModule, routedComponents } from './tipo_metadato-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoMetadatoComponent } from './crud-tipo_metadato/crud-tipo_metadato.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoMetadatoRoutingModule,
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
    CrudTipoMetadatoComponent,
  ],
})
export class TipoMetadatoModule { }
