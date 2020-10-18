import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ShipsAndQuantityResponse,
  ShipsAndQuantity,
} from '../shared/interfaces';
import {
  QuantityShips,
  OptionsShips,
  Ship,
  ShipsCollection,
} from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShipsListService {
  constructor(private apollo: Apollo) {}

  getQuantityShips(): Observable<number> {
    const query = gql`
      query quantityShips {
        shipsResult {
          result {
            totalCount
          }
        }
      }
    `;

    return this.apollo
      .watchQuery<QuantityShips>({
        query,
      })
      .valueChanges.pipe(
        map((item) => item.data.shipsResult.result.totalCount)
      );
  }

  getShips(options: OptionsShips): Observable<Ship[]> {
    const query = gql`
      query getShips($limit: Int, $offset: Int) {
        ships(limit: $limit, offset: $offset) {
          home_port
          type
          name
          id
        }
      }
    `;

    return this.apollo
      .watchQuery<ShipsCollection>({
        query,
        variables: {
          limit: options.limit,
          offset: options.offset,
        },
      })
      .valueChanges.pipe(map((item) => item.data.ships));
  }

  getShipsAndQuantity(options: OptionsShips): Observable<ShipsAndQuantity> {
    const query = gql`
      query getShipsAndQuantity($limit: Int, $offset: Int) {
        ships(limit: $limit, offset: $offset) {
          home_port
          type
          name
          id
        }
        shipsResult {
          result {
            totalCount
          }
        }
      }
    `;

    return this.apollo
      .watchQuery<ShipsAndQuantityResponse>({
        query,
        variables: {
          limit: options.limit,
          offset: options.offset,
        },
      })
      .valueChanges.pipe(
        map((item) => {
          const obj: ShipsAndQuantity = {
            quantity: item.data.shipsResult.result.totalCount,
            ships: item.data.ships,
          };
          return obj;
        })
      );
  }
}
