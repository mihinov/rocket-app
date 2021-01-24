import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShipsListService } from './ships-list.service';
import { Ship, OptionsShips, OptionsPaginator, OptionsShipsAndFilter, FilterOptions } from '../shared/interfaces';
import { map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { PaginatorState } from '../reducers/paginator/paginator.reducer';
import { selectOptionsPaginator } from '../reducers/paginator/paginator.selector';
import { FilterState } from '../reducers/filter/fiter.reducer';
import { selectAllFilterState } from '../reducers/filter/filter.selector';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss'],
})
export class ShipsListComponent implements OnInit, OnDestroy {

  optionsPaginatorState$: Observable<OptionsShips> = this.storePaginator$.pipe(select(selectOptionsPaginator));
  selectAllFilterState$: Observable<FilterState> = this.storeFilter$.pipe(select(selectAllFilterState));
  subs: Subscription;
  ships: Ship[];
  quantity: number;
  optionsPaginator: OptionsPaginator;

  constructor(private shipListService: ShipsListService,
              private storePaginator$: Store<PaginatorState>,
              private storeFilter$: Store<FilterState>) {}

  ngOnInit(): void {
    this.optionsPaginatorState$.subscribe(options => {

      this.selectAllFilterState$.subscribe(
        filterState => {
          const optionsShipsAndFilter = Object.assign({filter: filterState}, options);
          this.getRecords(optionsShipsAndFilter);
        }
      ).unsubscribe();

    });
  }

  getRecords(options: OptionsShipsAndFilter): void {
    this.ships = [];
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
