import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CupoDependenciaComponent } from './cupo_dependencia.component';
import { ListCupoDependenciaComponent } from './list-cupo_dependencia/list-cupo_dependencia.component';
import { CrudCupoDependenciaComponent } from './crud-cupo_dependencia/crud-cupo_dependencia.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: CupoDependenciaComponent,
  children: [{
    path: 'list-cupo_dependencia',
    component: ListCupoDependenciaComponent,
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

export class CupoDependenciaRoutingModule { }

export const routedComponents = [
  CupoDependenciaComponent,
  ListCupoDependenciaComponent,
  CrudCupoDependenciaComponent,
];
