import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QuantityShips, OptionsShips, Ship, ShipsCollection } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShipsListService {
  constructor(private apollo: Apollo) {}

  // getQuantityShips(): Observable<number> {
  //   const query = gql`
  //     query quantityShips {
  //       shipsResult {
  //         result {
  //           totalCount
  //         }
  //       }
  //     }
  //   `;

  //   return this.apollo
  //     .watchQuery<QuantityShips>({
  //       query,
  //     })
  //     .valueChanges.pipe(
  //       map((item) => item.data.shipsResult.result.totalCount)
  //     );
  // }

  getShips(options: OptionsShips): Observable<ShipsCollection> {

    const query = gql`
      query getShips($findName: String, $findType: String) {
        ships(find: {name: $findName, type: $findType}) {
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
          findName: options.filter.text,
          findType: options.filter.radio
        }
      })
      .valueChanges.pipe(
        map((item) => {
          const obj: ShipsCollection = {
            ships: item.data.ships
          };
          return obj;
        })
      );
  }
}
