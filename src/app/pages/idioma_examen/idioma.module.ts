import { IdiomaRoutingModule, routedComponents } from './idioma-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { IdiomaService } from '../../@core/data/idioma.service';
import { CoreService } from '../../@core/data/core.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { InscripcionService } from '../../@core/data/inscripcion.service';
import { ProgramaOikosService } from '../../@core/data/programa_oikos.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudIdiomaComponent } from './crud-idioma/crud-idioma.component';

@NgModule({
  imports: [
    ThemeModule,
    IdiomaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    IdiomaService,
    CoreService,
    CampusMidService,
    InscripcionService,
    ProgramaOikosService,
  ],
  exports: [
    CrudIdiomaComponent,
  ],
})
export class IdiomaModule { }
