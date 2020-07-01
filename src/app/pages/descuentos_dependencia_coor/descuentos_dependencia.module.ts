import { DescuentosDependenciaRoutingModule, routedComponents } from './descuentos_dependencia-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreService } from '../../@core/data/core.service';
import { DescuentoAcademicoService } from '../../@core/data/descuento_academico.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudDescuentosDependenciaComponent } from './crud-descuentos_dependencia/crud-descuentos_dependencia.component';

@NgModule({
  imports: [
    ThemeModule,
    DescuentosDependenciaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CoreService,
    DescuentoAcademicoService,
    ProgramaOikosService,
  ],
  exports: [
    CrudDescuentosDependenciaComponent,
  ],
})
export class DescuentosDependenciaModule { }
