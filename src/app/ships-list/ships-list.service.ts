import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShipsAndQuantityResponse, ShipsAndQuantity, OptionsShipsAndFilter } from '../shared/interfaces';
import { QuantityShips, OptionsShips, Ship, ShipsCollection } from '../shared/interfaces';

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

  getShipsAndQuantity(options: OptionsShipsAndFilter): Observable<ShipsAndQuantity> {

    const query = gql`
      query getShipsAndQuantity($shipLimit: Int, $shipOffset: Int, $shipName: String, $shipType: String) {
        shipsResult(limit: $shipLimit, offset: $shipOffset, find: {name: $shipName, type: $shipType}) {
          data {
            id
            home_port
            name
            type
          }
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
          shipLimit: options.limit,
          shipOffset: options.offset,
          shipName: options.filter.text,
          shipType: options.filter.radio
        },
      })
      .valueChanges.pipe(
        map((item) => {
          const obj: ShipsAndQuantity = {
            quantity: item.data.shipsResult.result.totalCount,
            ships: item.data.shipsResult.data,
          };
          return obj;
        })
      );
  }
}
