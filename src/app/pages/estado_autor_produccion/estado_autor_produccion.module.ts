import { EstadoAutorProduccionRoutingModule, routedComponents } from './estado_autor_produccion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProduccionAcademicaService } from '../../@core/data/produccion_academica.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudEstadoAutorProduccionComponent } from './crud-estado_autor_produccion/crud-estado_autor_produccion.component';

@NgModule({
  imports: [
    ThemeModule,
    EstadoAutorProduccionRoutingModule,
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
    CrudEstadoAutorProduccionComponent,
  ],
})
export class EstadoAutorProduccionModule { }
