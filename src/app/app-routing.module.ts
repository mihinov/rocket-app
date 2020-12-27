import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { PageShipsComponent } from './page-ships/page-ships.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';

const routes: Routes = [
  { path: '', component: PageShipsComponent, children: [
    { path: '', redirectTo: '/ships', pathMatch: 'full' },
    { path: 'ships', component: ShipsListComponent }
  ] },
  { path: 'ships/:id', component: ShipDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
