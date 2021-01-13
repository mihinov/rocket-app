import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FilterState } from '../reducers/filter/fiter.reducer';
import { selectRadio, selectCheckbox, selectText } from '../reducers/filter/filter.selector';
import { Observable } from 'rxjs';
import { FilterRadioAction, FilterTextAction, FilterCheckboxAction } from '../reducers/filter/filter.actions';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-ships-filter',
  templateUrl: './ships-filter.component.html',
  styleUrls: ['./ships-filter.component.scss']
})
export class ShipsFilterComponent implements OnInit {

  radio$: Observable<string> = this.store$.pipe(select(selectRadio));
  checkbox$: Observable<string[]> = this.store$.pipe(select(selectCheckbox));
  text$: Observable<string> = this.store$.pipe(select(selectText));

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
      this.addCheckboxFormGroup(item);
    }).unsubscribe();

    this.text$.subscribe(item => {
      this.addTextFormControl(item);
    }).unsubscribe();

    this.onChangeCheckbox();
  }

  generateRadioForm(typeShipChecked: string): void {

    this.formFilter = new FormGroup({
      'radio-type': new FormControl(typeShipChecked)
    });
  }

  addCheckboxFormGroup(checkboxes: string[]): void {

    function generateObj(portShips: string[], checkboxesLocal: string[]): {[key: string]: AbstractControl} {
      const objLocal = {};

      for (const item of portShips) {
        const findPort = (checkboxesLocal.find(el => el === item)) ? true : false;
        objLocal[item] = new FormControl(findPort);
      }
      return objLocal;
    }

    const obj = generateObj(this.portShips, checkboxes);

    this.formFilter.addControl('checkboxGroup', new FormGroup(obj));
  }

  addTextFormControl(text: string): void {
    this.formFilter.addControl('text', new FormControl(text));
  }

  onChangeCheckbox(): void {

    function generateStringArr(checkboxGroupValueLocal: {[key: string]: boolean}): string[] {
      const stringArr = [];
      for (const item in checkboxGroupValueLocal) {
        if (checkboxGroupValueLocal[item] === true) {
          stringArr.push(item);
        }
      }
      return stringArr;
    }

    const checkboxGroupValue = this.formFilter.get('checkboxGroup').value;
    this.activeCheckboxes = Object.values(checkboxGroupValue).filter(item => item === true).length;
    this.activatedCheckbox = this.activeCheckboxes !== 0;

    const arrString = generateStringArr(checkboxGroupValue);
    this.store$.dispatch(new FilterCheckboxAction(arrString));
  }

  onChangeRadio($event: MatRadioChange): void {
    const textRadio = $event.value;
    this.store$.dispatch(new FilterRadioAction(textRadio));
  }

  onChangeText($event: InputEvent): void {
    const valueText = this.formFilter.get('text').value;
    this.store$.dispatch(new FilterTextAction(valueText));
  }

}
