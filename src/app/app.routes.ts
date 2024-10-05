import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':documentType/:documentNumber',
    loadChildren: () => import('./pages/details/details.module')
      .then(mod => mod.DetailsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
