import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShipsListService } from './ships-list.service';
import { Ship, OptionsShips, OptionsPaginator, FilterOptions } from '../shared/interfaces';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
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
  loading = true;

  constructor(private shipListService: ShipsListService,
              private storePaginator$: Store<PaginatorState>,
              private storeFilter$: Store<FilterState>) {}

  ngOnInit(): void {
    this.optionsPaginatorState$.
    pipe(
      tap(() => {
        this.loading = true;
      }),
      debounceTime(500)
    )
    .subscribe(options => {

      this.selectAllFilterState$.subscribe(
        filterState => {
          const optionsShipsAndFilter = Object.assign({filter: filterState}, options);
          // console.log(optionsShipsAndFilter);
          this.getRecords(optionsShipsAndFilter);
        }
      ).unsubscribe();

    });
  }

  getRecords(options: OptionsShips): void {
    this.ships = [];
    this.subs = this.shipListService
      .getShips(options)
      .pipe(
        tap((item) => {

          const filteredShipsByPort = item.ships.slice().filter(ship => {
            let findShipByPortBoolean = false;

            for (const port of options.filter.checkbox) {
              if (ship.home_port === port) {
                findShipByPortBoolean = true;
                break;
              }
            }
            if (options.filter.checkbox.length === 0) {
              findShipByPortBoolean = true;
            }

            return findShipByPortBoolean;
          });

          item.ships = filteredShipsByPort;

        }),
        map((item) => item.ships),
      )
      .subscribe((ships) => {

        this.quantity = ships.length;
        this.optionsPaginator = { // Опции для пагинатора
          quantity: this.quantity,
          options,
          currentPage: Math.floor(
            (options.limit + options.offset) / options.limit
          ),
          maxPage: Math.ceil(this.quantity / options.limit),
        };

        this.ships = ships.slice(options.offset, options.offset + options.limit);

        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
