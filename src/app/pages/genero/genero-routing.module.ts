import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneroComponent } from './genero.component';
import { ListGeneroComponent } from './list-genero/list-genero.component';
import { CrudGeneroComponent } from './crud-genero/crud-genero.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: GeneroComponent,
  children: [{
    path: 'list-genero',
    component: ListGeneroComponent,
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

export class GeneroRoutingModule { }

export const routedComponents = [
  GeneroComponent,
  ListGeneroComponent,
  CrudGeneroComponent,
];
