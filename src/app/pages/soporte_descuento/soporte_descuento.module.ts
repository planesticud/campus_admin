import { SoporteDescuentoRoutingModule, routedComponents } from './soporte_descuento-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PersonaService } from '../../@core/data/persona.service';
import { DescuentoAcademicoService } from '../../@core/data/descuento_academico.service';
import { ProgramaAcademicoService } from '../../@core/data/programa_academico.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudSoporteDescuentoComponent } from './crud-soporte_descuento/crud-soporte_descuento.component';

@NgModule({
  imports: [
    ThemeModule,
    SoporteDescuentoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DescuentoAcademicoService,
    ProgramaAcademicoService,
    ProgramaOikosService,
    PersonaService,
  ],
  exports: [
    CrudSoporteDescuentoComponent,
  ],
})
export class SoporteDescuentoModule { }
