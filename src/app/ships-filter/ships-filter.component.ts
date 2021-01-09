import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FilterState } from '../reducers/filter/fiter.reducer';
import { selectRadio } from '../reducers/filter/filter.selector';
import { Observable } from 'rxjs';
import { FilterRadioAction } from '../reducers/filter/filter.actions';

interface TypeShip {
  title: string;
  checked?: boolean;
}

@Component({
  selector: 'app-ships-filter',
  templateUrl: './ships-filter.component.html',
  styleUrls: ['./ships-filter.component.scss']
})
export class ShipsFilterComponent implements OnInit {

  radio$: Observable<string> = this.store$.pipe(select(selectRadio));

  formFilter: FormGroup;
  activeCheckboxes: number;
  activatedCheckbox: boolean;
  typeShips: TypeShip[] = [
    {title: 'Barge'},
    {title: 'Cargo'},
    {title: 'High Speed Craft'},
    {title: 'Tug'}
  ];

  constructor(private store$: Store<FilterState>) { }

  ngOnInit(): void {
    this.radio$.subscribe(title => {
      this.typeShips.map(item => item.title === title ? item.checked = true : false);
      this.generateForm(this.typeShips);
    }).unsubscribe();


    this.onChangeCheckbox();
  }

  generateForm(typeShips: TypeShip[]): void {
    const typeShipChecked = typeShips.find(item => item.checked);
    console.log(typeShipChecked);
    this.formFilter = new FormGroup({
      checkboxGroup: new FormGroup({
        'Port Canaveral': new FormControl(true),
        'Port of Los Angeles': new FormControl(true),
        'Fort Lauderdale': new FormControl(false)
      }),
      'radio-type': new FormControl(typeShipChecked.title)
    });
  }

  onChangeCheckbox(): void {
    this.activeCheckboxes = Object.values(this.formFilter.get('checkboxGroup').value).filter(item => item === true).length;
    this.activatedCheckbox = this.activeCheckboxes !== 0;
  }

  onChangeRadio(): void {
    const textRadio = this.formFilter.get('radio-type').value;
    console.log(textRadio);
    // this.store$.dispatch(new FilterRadioAction(textRadio));
  }

}
