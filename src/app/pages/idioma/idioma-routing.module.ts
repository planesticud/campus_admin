import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdiomaComponent } from './idioma.component';
import { ListIdiomaComponent } from './list-idioma/list-idioma.component';
import { CrudIdiomaComponent } from './crud-idioma/crud-idioma.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: IdiomaComponent,
  children: [{
    path: 'list-idioma',
    component: ListIdiomaComponent,
    canActivate: [AuthGuard],
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

export class IdiomaRoutingModule { }

export const routedComponents = [
  IdiomaComponent,
  ListIdiomaComponent,
  CrudIdiomaComponent,
];
