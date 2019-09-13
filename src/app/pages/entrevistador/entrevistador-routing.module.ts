import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrevistadorComponent } from './entrevistador.component';
import { ListEntrevistadorComponent } from './list-entrevistador/list-entrevistador.component';
import { CrudEntrevistadorComponent } from './crud-entrevistador/crud-entrevistador.component';



const routes: Routes = [{
  path: '',
  component: EntrevistadorComponent,
  children: [{
    path: 'list-entrevistador',
    component: ListEntrevistadorComponent,
  }, {
    path: 'crud-entrevistador',
    component: CrudEntrevistadorComponent,
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

export class EntrevistadorRoutingModule { }

export const routedComponents = [
  EntrevistadorComponent,
  ListEntrevistadorComponent,
  CrudEntrevistadorComponent,
];
