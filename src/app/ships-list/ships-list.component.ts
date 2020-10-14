import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface Ship {
  __typename: string;
  name: string;
  type: string;
  home_port: string;
}

interface ShipsCollection {
  ships: Ship[];
}

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss']
})
export class ShipsListComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  ships$: Observable<Ship[]>;

  ngOnInit(): void {

    const query = gql`
      query getShips {
        ships {
          name
          type
          home_port
        }
      }
    `;

    this.ships$ = this.apollo.watchQuery<ShipsCollection>({
      query
    }).valueChanges.pipe(
      map((item: {data: ShipsCollection}) => item.data.ships)
    );
  }

}
