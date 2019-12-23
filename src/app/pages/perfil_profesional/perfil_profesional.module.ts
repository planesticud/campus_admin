import { PerfilProfesionalRoutingModule, routedComponents } from './perfil_profesional-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PersonaService } from '../../@core/data/persona.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudPerfilProfesionalComponent } from './crud-perfil_profesional/crud-perfil_profesional.component';

@NgModule({
  imports: [
    ThemeModule,
    PerfilProfesionalRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    PersonaService,
  ],
  exports: [
    CrudPerfilProfesionalComponent,
  ],
})
export class PerfilProfesionalModule { }
