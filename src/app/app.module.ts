import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { ShipsPaginatorComponent } from './ships-list/ships-paginator/ships-paginator.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ShipsFilterComponent } from './ships-filter/ships-filter.component';
import { PageShipsComponent } from './page-ships/page-ships.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';

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
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
