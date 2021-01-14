import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filterActionsType } from './reducers/filter/filter.actions';
import { PaginatorOptionsAction } from './reducers/paginator/paginator.actions';



@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}

  // @Effect()
  // updatedAt(): Observable<any> {
  //   return this.actions$.pipe(
  //     ofType(countActionsType.increase, countActionsType.decrease, countActionsType.clear),
  //     map(() => {
  //       return new CountUpdatedAtAction({
  //         updatedAt: Date.now()
  //       });
  //     })
  //   );
  // }

  @Effect()
  updatedFilter(): Observable<any> {
    return this.actions$.pipe(
      ofType(filterActionsType.checkbox, filterActionsType.radio, filterActionsType.text),
      map(() => {
        return new PaginatorOptionsAction({offset: 0, limit: 5});
      })
    );
  }

}
