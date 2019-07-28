import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitoComponent } from './requisito.component';
import { ListRequisitoComponent } from './list-requisito/list-requisito.component';
import { CrudRequisitoComponent } from './crud-requisito/crud-requisito.component';

const routes: Routes = [{
  path: '',
  component: RequisitoComponent,
  children: [{
    path: 'list-requisito',
    component: ListRequisitoComponent,
  }, {
    path: 'crud-requisito',
    component: CrudRequisitoComponent,
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

export class RequisitoRoutingModule { }

export const routedComponents = [
  RequisitoComponent,
  ListRequisitoComponent,
  CrudRequisitoComponent,
];
