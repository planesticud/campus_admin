import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscripcionComponent } from './inscripcion.component';
import { ListInscripcionComponent } from './list-inscripcion/list-inscripcion.component';
import { ViewInscripcionComponent } from './view-inscripcion/view-inscripcion.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: InscripcionComponent,
  children: [{
    path: 'list-inscripcion',
    component: ListInscripcionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
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

export class InscripcionRoutingModule { }

export const routedComponents = [
  InscripcionComponent,
  ListInscripcionComponent,
  ViewInscripcionComponent,
];
