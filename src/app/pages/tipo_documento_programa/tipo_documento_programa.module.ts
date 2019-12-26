import { TipoDocumentoProgramaRoutingModule, routedComponents } from './tipo_documento_programa-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DocumentoProgramaService } from '../../@core/data/documento_programa.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudTipoDocumentoProgramaComponent } from './crud-tipo_documento_programa/crud-tipo_documento_programa.component';

@NgModule({
  imports: [
    ThemeModule,
    TipoDocumentoProgramaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DocumentoProgramaService,
  ],
  exports: [
    CrudTipoDocumentoProgramaComponent,
  ],
})
export class TipoDocumentoProgramaModule { }
