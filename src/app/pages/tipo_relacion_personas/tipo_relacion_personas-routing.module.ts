import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoRelacionPersonasComponent } from './tipo_relacion_personas.component';
import { ListTipoRelacionPersonasComponent } from './list-tipo_relacion_personas/list-tipo_relacion_personas.component';
import { CrudTipoRelacionPersonasComponent } from './crud-tipo_relacion_personas/crud-tipo_relacion_personas.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: TipoRelacionPersonasComponent,
  children: [{
    path: 'list-tipo_relacion_personas',
    component: ListTipoRelacionPersonasComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
      ],
    },
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class TipoRelacionPersonasRoutingModule { }

export const routedComponents = [
  TipoRelacionPersonasComponent,
  ListTipoRelacionPersonasComponent,
  CrudTipoRelacionPersonasComponent,
];
