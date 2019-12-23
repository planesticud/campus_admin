import { ConceptoAcademicoRoutingModule, routedComponents } from './concepto_academico-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudConceptoAcademicoComponent } from './crud-concepto_academico/crud-concepto_academico.component';

@NgModule({
  imports: [
    ThemeModule,
    ConceptoAcademicoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
  ],
  exports: [
    CrudConceptoAcademicoComponent,
  ],
})
export class ConceptoAcademicoModule { }
