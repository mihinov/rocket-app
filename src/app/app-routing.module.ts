import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipsListComponent } from './ships-list/ships-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShipsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
