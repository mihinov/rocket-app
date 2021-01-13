import { Observable } from 'rxjs';
import { Ship } from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShipDetailsService {
  constructor(private apollo: Apollo) {}

  getShipById(id: string): Observable<Ship[]> {
    const query = gql`
      query getShipById($findStr: ID!) {
        ships(find: {id: $findStr}) {
          id
          home_port
          missions {
            name
          }
          type
          year_built
        }
      }
    `;

    return this.apollo.watchQuery<{ships: Ship[]}>({
      query,
      variables: {
        findStr: id
      }
    }).valueChanges.pipe(
      map(item => item.data.ships)
    );
  }
}
