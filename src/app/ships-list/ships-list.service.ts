import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface QuantityShips {
  shipsResult: {
    result: {
      totalCount: number;
    };
  };
}

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
}
