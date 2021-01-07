import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ships-filter',
  templateUrl: './ships-filter.component.html',
  styleUrls: ['./ships-filter.component.scss']
})
export class ShipsFilterComponent implements OnInit {

  formFilter: FormGroup;
  activeCheckboxes: number;
  activatedCheckbox: boolean;
  typeShips: string[] = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];

  constructor() { }

  ngOnInit(): void {
    this.formFilter = new FormGroup({
      checkboxGroup: new FormGroup({
        'checkbox-port-canaveral': new FormControl(true),
        'checkbox-port-of-los-angeles': new FormControl(true),
        'checkbox-fort-lauderdale': new FormControl(false)
      })
    });
    this.onChangeCheckbox();
  }

  onChangeCheckbox(): void {
    this.activeCheckboxes = Object.values(this.formFilter.get('checkboxGroup').value).filter(item => item === true).length;
    this.activatedCheckbox = this.activeCheckboxes !== 0;
  }

}
