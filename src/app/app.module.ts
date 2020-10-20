import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { ShipsFilterComponent } from './ships-list/ships-filter/ships-filter.component';
import { ShipsPaginatorComponent } from './ships-list/ships-paginator/ships-paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipsListComponent,
    ShipDetailsComponent,
    ShipsFilterComponent,
    ShipsPaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
