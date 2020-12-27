import { Observable } from 'rxjs';
import { Ship } from '../shared/interfaces';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class shipDetailsService {
  constructor(private apollo: Apollo) {}

  getShipById(id: string): Observable<Ship> {
    const query = gql`
      query getShipById($findStr: string) {
        ships {
          find: {
            id: $findStr
          }
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

    return this.apollo.watchQuery<Ship>({
      query,
      variables: {
        findStr: id
      }
    }).valueChanges;
  }
}
