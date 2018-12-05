import { Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MementoComponent } from './pages/memento';
import { HomeComponent } from './pages/home/home.component';

/**
 * App routing
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'memento',
    component: MementoComponent,
  },
];

const config: ExtraOptions = {
  useHash: true,
};


@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRouting {
}
