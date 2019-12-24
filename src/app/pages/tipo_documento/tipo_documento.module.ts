import { TipoDocumentoRoutingModule, routedComponents } from './tipo_documento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DocumentoService } from '../../@core/data/documento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDocumentoComponent } from './crud-tipo_documento/crud-tipo_documento.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDocumentoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DocumentoService,
  ],
  exports: [
    CrudTipoDocumentoComponent,
  ],
})
export class TipoDocumentoModule { }
