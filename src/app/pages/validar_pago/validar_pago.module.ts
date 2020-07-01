import { ValidarPagoRoutingModule, routedComponents } from './validar_pago-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { CoreService } from '../../@core/data/core.service';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { ReciboService } from '../../@core/data/recibo.service';
import { PagoService } from '../../@core/data/pago.service';
import { NuxeoService } from '../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../@core/data/documento.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudValidarPagoComponent } from './crud-validar_pago/crud-validar_pago.component';

@NgModule({
  imports: [
    ThemeModule,
    ValidarPagoRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CampusMidService,
    CoreService,
    InscripcionService,
    ProgramaOikosService,
    ReciboService,
    PagoService,
    NuxeoService,
    DocumentoService,
  ],
  exports: [
    CrudValidarPagoComponent,
  ],
})
export class ValidarPagoModule { }
