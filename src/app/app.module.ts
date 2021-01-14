import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment.prod';
import { reducers, metaReducers } from './reducers/index';
import { AppEffects } from './app.effects';

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
    ReactiveFormsModule,
    MatRadioModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forFeature([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
