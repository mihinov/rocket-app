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
  constructor(private shipListService: ShipsListService) {}

  subs: Subscription;
  ships: Ship[];
  quantity: number;
  optionsPaginator: OptionsPaginator;

  ngOnInit(): void {
    const optionsShips: OptionsShips = { offset: 0, limit: 5 };
    this.getRecords(optionsShips);
  }

  getRecords(options: OptionsShips): void {
    this.subs = this.shipListService
      .getShipsAndQuantity(options)
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
          options,
          currentPage: Math.floor(
            (options.limit + options.offset) / options.limit
          ),
          maxPage: Math.ceil(this.quantity / options.limit),
        };
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
