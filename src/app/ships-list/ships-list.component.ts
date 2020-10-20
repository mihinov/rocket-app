import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShipsListService } from './ships-list.service';
import { Ship, OptionsShips, OptionsPaginator } from '../shared/interfaces';
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
  optionsPaginator: OptionsPaginator;

  ngOnInit(): void {
    const optionsShips: OptionsShips = { offset: 0, limit: 5 };
    this.subs = this.service
      .getShipsAndQuantity(optionsShips)
      .pipe(
        tap((item) => {
          this.quantity = item.quantity;
        }),
        map((item) => item.ships)
      )
      .subscribe((item) => {
        this.ships = item;
        this.optionsPaginator = { // Опции для пагинатора
          quantity: this.quantity,
          options: optionsShips
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
