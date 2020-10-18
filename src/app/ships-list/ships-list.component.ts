import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipsListService } from './ships-list.service';
import { Ship } from '../shared/interfaces';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss'],
})
export class ShipsListComponent implements OnInit {
  constructor(private service: ShipsListService) {}

  ships$: Observable<Ship[]>;
  quantity: number;

  ngOnInit(): void {
    this.ships$ = this.service.getShipsAndQuantity({offset: 0, limit: 5})
      .pipe(
        tap(item => {
          this.quantity = item.quantity;
        }),
        map(item => item.ships)
      );
  }
}
