import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShipsListService } from './ships-list.service';

interface Ship {
  __typename: string;
  id: string;
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
  styleUrls: ['./ships-list.component.scss'],
})
export class ShipsListComponent implements OnInit {
  constructor(private apollo: Apollo, private service: ShipsListService) {}

  ships$: Observable<Ship[]>;

  ngOnInit(): void {
    const query = gql`
      query getShips {
        ships {
          id
          name
          type
          home_port
        }
      }
    `;

    this.ships$ = this.apollo
      .watchQuery<ShipsCollection>({
        query,
      })
      .valueChanges.pipe(
        map((item: { data: ShipsCollection }) => item.data.ships)
      );

    this.service.getQuantityShips().subscribe((res) => {
      console.log(res);
    });
  }
}
