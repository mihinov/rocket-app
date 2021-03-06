import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionsShips, OptionsPaginator } from '../../shared/interfaces';
import { Store } from '@ngrx/store';
import { PaginatorState } from '../../reducers/paginator/paginator.reducer';
import { PaginatorOptionsAction } from '../../reducers/paginator/paginator.actions';

@Component({
  selector: 'app-ships-paginator',
  templateUrl: './ships-paginator.component.html',
  styleUrls: ['./ships-paginator.component.scss']
})
export class ShipsPaginatorComponent implements OnInit {

  constructor(private store$: Store<PaginatorState>) { }

  optionsPaginator: OptionsPaginator;
  isEnabledBack = false;
  isEnabledForward = false;

  @Output() flipping = new EventEmitter<OptionsShips>();

  @Input() set options(optionsPaginator: OptionsPaginator) {
    if (optionsPaginator) {
      this.optionsPaginator = optionsPaginator;
      this.isEnabledBack = this.optionsPaginator && this.optionsPaginator.currentPage !== 1;
      this.isEnabledForward = this.optionsPaginator && (this.optionsPaginator.currentPage + 1) <= this.optionsPaginator.maxPage;
    }
  }

  ngOnInit(): void {
  }


  backClick(): void {
    if (this.optionsPaginator && this.optionsPaginator.currentPage !== 1) {
      const optionsShips = Object.assign({}, this.optionsPaginator.options);
      optionsShips.offset -= optionsShips.limit;
      this.isEnabledBack = false;
      this.isEnabledForward = false;
      this.updateOptionsInState(optionsShips);
      this.flipping.emit(optionsShips);

    }
  }

  forwardClick(): void {
    if (this.optionsPaginator && (this.optionsPaginator.currentPage + 1) <= this.optionsPaginator.maxPage) {
      const optionsShips = Object.assign({}, this.optionsPaginator.options);
      optionsShips.offset += optionsShips.limit;
      this.isEnabledBack = false;
      this.isEnabledForward = false;
      this.updateOptionsInState(optionsShips);
      this.flipping.emit(optionsShips);
    }
  }

  updateOptionsInState(options: OptionsShips): void {
    this.store$.dispatch(new PaginatorOptionsAction(options));
  }

}
