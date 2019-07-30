import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdiomaComponent } from './idioma.component';
import { ListIdiomaComponent } from './list-idioma/list-idioma.component';
import { CrudIdiomaComponent } from './crud-idioma/crud-idioma.component';

const routes: Routes = [{
  path: '',
  component: IdiomaComponent,
  children: [{
    path: 'list-idioma',
    component: ListIdiomaComponent,
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
