import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaInformacionComponent} from './vista_informacion.component';
import { ViewInfoPersonaComponent } from './view-info_persona/view-info-persona.component';
import { ViewInfoCaracteristicaComponent } from './view-info_caracteristica/view-info_caracteristica.component';
import { ViewInformacionContactoComponent } from './view-informacion_contacto/view-informacion_contacto.component';
import { ViewFormacionAcademicaComponent } from './view-formacion_academica/view-formacion_academica.component';
import { ViewIdiomasComponent } from './view-idiomas/view-idiomas.component';
import { ViewExperienciaLaboralComponent } from './view-experiencia_laboral/view-experiencia_laboral.component';
import { ViewDocumentoProgramaComponent } from './view-documento_programa/view-documento_programa.component';
import { ViewDescuentoAcademicoComponent } from './view-descuento_academico/view-descuento_academico.component';
import { ViewPropuestaGradoComponent } from './view-propuesta_grado/view-propuesta_grado.component';
import { ViewReciboComponent } from './view-recibo/view-recibo.component';
import { AuthGuard } from '../../@core/_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: VistaInformacionComponent,
  children: [{
    path: 'view-info_persona',
    component: ViewInfoPersonaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-info_caracteristica',
    component: ViewInfoCaracteristicaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-informacion_contacto',
    component: ViewInformacionContactoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-formacion_academica',
    component: ViewFormacionAcademicaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-idiomas',
    component: ViewIdiomasComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-experiencia_laboral',
    component: ViewExperienciaLaboralComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-documento_programa',
    component: ViewDocumentoProgramaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-descuento_academico',
    component: ViewDescuentoAcademicoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-propuesta_grado',
    component: ViewPropuestaGradoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ADMIN_CAMPUS',
        'COORDINACION',
        'COORDINACION_PREGRADO',
        'COORDINACION_POSGRADO',
      ],
    },
  }, {
    path: 'view-recibo',
    component: ViewReciboComponent,
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

export class VistaInformacionRoutingModule { }

export const routedComponents = [
  VistaInformacionComponent,
  ViewInfoPersonaComponent,
  ViewInfoCaracteristicaComponent,
  ViewInformacionContactoComponent,
  ViewFormacionAcademicaComponent,
  ViewIdiomasComponent,
  ViewExperienciaLaboralComponent,
  ViewDocumentoProgramaComponent,
  ViewDescuentoAcademicoComponent,
  ViewPropuestaGradoComponent,
  ViewReciboComponent,
];
