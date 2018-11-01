import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NivelIdiomaComponent } from './nivel_idioma.component';
import { ListNivelIdiomaComponent } from './list-nivel_idioma/list-nivel_idioma.component';
import { CrudNivelIdiomaComponent } from './crud-nivel_idioma/crud-nivel_idioma.component';

const routes: Routes = [{
  path: '',
  component: NivelIdiomaComponent,
  children: [{
    path: 'list-nivel_idioma',
    component: ListNivelIdiomaComponent,
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

export class NivelIdiomaRoutingModule { }

export const routedComponents = [
  NivelIdiomaComponent,
  ListNivelIdiomaComponent,
  CrudNivelIdiomaComponent,
];
