import { SubtipoDocumentoRoutingModule, routedComponents } from './subtipo_documento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DocumentoService } from '../../@core/data/documento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudSubtipoDocumentoComponent } from './crud-subtipo_documento/crud-subtipo_documento.component';

@NgModule({
  imports: [
    ThemeModule,
    SubtipoDocumentoRoutingModule,
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
    CrudSubtipoDocumentoComponent,
  ],
})
export class SubtipoDocumentoModule { }
