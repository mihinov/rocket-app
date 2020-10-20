import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShipsListService } from './ships-list.service';
import { Ship, OptionsShips } from '../shared/interfaces';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss'],
})
export class ShipsListComponent implements OnInit, OnDestroy {
  constructor(private service: ShipsListService) {}

  subs: Subscription;
  ships: Ship[];
  quantity: number;

  ngOnInit(): void {
    const optionsPaginator: OptionsShips = { offset: 0, limit: 5 };
    this.subs = this.service.getShipsAndQuantity(optionsPaginator).pipe(
      tap((item) => {
        this.quantity = item.quantity;
      }),
      map((item) => item.ships)
    ).subscribe((item) => {
      this.ships = item;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
