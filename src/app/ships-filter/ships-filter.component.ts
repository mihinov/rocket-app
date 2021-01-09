import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FilterState } from '../reducers/filter/fiter.reducer';
import { selectRadio, selectCheckbox } from '../reducers/filter/filter.selector';
import { Observable } from 'rxjs';
import { FilterRadioAction } from '../reducers/filter/filter.actions';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-ships-filter',
  templateUrl: './ships-filter.component.html',
  styleUrls: ['./ships-filter.component.scss']
})
export class ShipsFilterComponent implements OnInit {

  radio$: Observable<string> = this.store$.pipe(select(selectRadio));
  checkbox$: Observable<string[]> = this.store$.pipe(select(selectCheckbox));

  formFilter: FormGroup;
  activeCheckboxes: number;
  activatedCheckbox: boolean;

  typeShips: string[] = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];

  portShips: string[] = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];

  constructor(private store$: Store<FilterState>) { }

  ngOnInit(): void {

    this.radio$.subscribe(title => {
      const typeShipChecked = this.typeShips.find(item => item === title);
      this.generateRadioForm(typeShipChecked);
    }).unsubscribe();

    this.checkbox$.subscribe(item => {
      this.generateCheckboxForm(item);
    }).unsubscribe();

    this.onChangeCheckbox();
  }

  generateRadioForm(typeShipChecked: string): void {

    this.formFilter = new FormGroup({
      // checkboxGroup: new FormGroup({
      //   'Port Canaveral': new FormControl(true),
      //   'Port of Los Angeles': new FormControl(true),
      //   'Fort Lauderdale': new FormControl(false)
      // }),
      'radio-type': new FormControl(typeShipChecked)
    });
  }

  generateCheckboxForm(checkboxes: string[]): void {

    function generateObj(portShips: string[], checkboxesLocal: string[]): object {
      const objLocal = {};

      for (const item of portShips) {
        const findPort = (checkboxesLocal.find(el => el === item)) ? true : false;
        objLocal[item] = new FormControl(findPort);
      }
      return objLocal;
    }

    const obj = generateObj(this.portShips, checkboxes);
    console.log(obj);
    console.log(Object.values(item => {
      console.log(item);
    }));

    this.formFilter.addControl('checkboxGroup', new FormGroup(obj));
  }

  onChangeCheckbox(): void {
    this.activeCheckboxes = Object.values(this.formFilter.get('checkboxGroup').value).filter(item => item === true).length;
    this.activatedCheckbox = this.activeCheckboxes !== 0;
  }

  onChangeRadio($event: MatRadioChange): void {
    const textRadio = $event.value;
    this.store$.dispatch(new FilterRadioAction(textRadio));
  }

}
