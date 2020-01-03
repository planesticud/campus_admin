import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NucleoBasicoConocimientoComponent } from './nucleo_basico_conocimiento.component';
import { ListNucleoBasicoConocimientoComponent } from './list-nucleo_basico_conocimiento/list-nucleo_basico_conocimiento.component';
import { CrudNucleoBasicoConocimientoComponent } from './crud-nucleo_basico_conocimiento/crud-nucleo_basico_conocimiento.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: NucleoBasicoConocimientoComponent,
  children: [{
    path: 'list-nucleo_basico_conocimiento',
    component: ListNucleoBasicoConocimientoComponent,
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

export class NucleoBasicoConocimientoRoutingModule { }

export const routedComponents = [
  NucleoBasicoConocimientoComponent,
  ListNucleoBasicoConocimientoComponent,
  CrudNucleoBasicoConocimientoComponent,
];
