import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './persona.component';
import { ListPersonaComponent } from './list-persona/list-persona.component';
import { CrudPersonaComponent } from './crud-persona/crud-persona.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: PersonaComponent,
  children: [{
    path: 'list-persona',
    component: ListPersonaComponent,
    canActivate: [AuthGuard],
  }, {
    path: 'crud-persona',
    component: CrudPersonaComponent,
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

export class PersonaRoutingModule { }

export const routedComponents = [
  PersonaComponent,
  ListPersonaComponent,
  CrudPersonaComponent,
];
