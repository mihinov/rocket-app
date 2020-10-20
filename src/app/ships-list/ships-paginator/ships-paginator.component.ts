import { Component, Input, OnInit } from '@angular/core';
import { OptionsShips, OptionsPaginator } from '../../shared/interfaces';

@Component({
  selector: 'app-ships-paginator',
  templateUrl: './ships-paginator.component.html',
  styleUrls: ['./ships-paginator.component.scss']
})
export class ShipsPaginatorComponent implements OnInit {

  constructor() { }

  @Input() set options(optionsPaginator: OptionsPaginator) {
    if (optionsPaginator) {
      console.log(optionsPaginator);
    }
  }

  ngOnInit(): void {
  }


  backClick(): void {

  }

  forwardClick(): void {

  }

}
