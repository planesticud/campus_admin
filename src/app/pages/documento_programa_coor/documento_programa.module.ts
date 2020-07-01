import { DocumentoProgramaRoutingModule, routedComponents } from './documento_programa-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DocumentoProgramaService } from '../../@core/data/documento_programa.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudDocumentoProgramaComponent } from './crud-documento_programa/crud-documento_programa.component';

@NgModule({
  imports: [
    ThemeModule,
    DocumentoProgramaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DocumentoProgramaService,
    ProgramaOikosService,
    CoreService,
  ],
  exports: [
    CrudDocumentoProgramaComponent,
  ],
})
export class DocumentoProgramaModule { }
