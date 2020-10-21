import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionsShips, OptionsPaginator } from '../../shared/interfaces';

@Component({
  selector: 'app-ships-paginator',
  templateUrl: './ships-paginator.component.html',
  styleUrls: ['./ships-paginator.component.scss']
})
export class ShipsPaginatorComponent implements OnInit {

  constructor() { }

  optionsPaginator: OptionsPaginator;
  @Output() flipping = new EventEmitter<OptionsShips>();

  @Input() set options(optionsPaginator: OptionsPaginator) {
    if (optionsPaginator) {
      this.optionsPaginator = optionsPaginator;
    }
  }

  ngOnInit(): void {
  }


  backClick(): void {
    if (this.optionsPaginator &&
      this.optionsPaginator.currentPage !== 1) {
      const optionsShips = Object.assign({}, this.optionsPaginator.options);
      optionsShips.offset -= optionsShips.limit;
      this.flipping.emit(optionsShips);
    }
  }

  forwardClick(): void {
    if (this.optionsPaginator &&
      (this.optionsPaginator.currentPage + 1) <= this.optionsPaginator.maxPage) {
      const optionsShips = Object.assign({}, this.optionsPaginator.options);
      optionsShips.offset += optionsShips.limit;
      this.flipping.emit(optionsShips);
    }
  }

}
