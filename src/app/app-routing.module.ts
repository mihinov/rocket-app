import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ShipsListComponent
  // },
  {
    path: '',
    component: LoaderComponent
  },
  {
    path: ':id',
    component: ShipDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
