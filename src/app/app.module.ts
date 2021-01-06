import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipsPaginatorComponent } from './ships-list/ships-paginator/ships-paginator.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ShipsFilterComponent } from './ships-filter/ships-filter.component';
import { PageShipsComponent } from './page-ships/page-ships.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    ShipsListComponent,
    ShipsPaginatorComponent,
    LoaderComponent,
    ShipsFilterComponent,
    PageShipsComponent,
    ShipDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
