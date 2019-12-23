import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilProfesionalComponent } from './perfil_profesional.component';
import { ListPerfilProfesionalComponent } from './list-perfil_profesional/list-perfil_profesional.component';
import { CrudPerfilProfesionalComponent } from './crud-perfil_profesional/crud-perfil_profesional.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: PerfilProfesionalComponent,
  children: [{
    path: 'list-perfil_profesional',
    component: ListPerfilProfesionalComponent,
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

export class PerfilProfesionalRoutingModule { }

export const routedComponents = [
  PerfilProfesionalComponent,
  ListPerfilProfesionalComponent,
  CrudPerfilProfesionalComponent,
];
