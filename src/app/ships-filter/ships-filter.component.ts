import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ships-filter',
  templateUrl: './ships-filter.component.html',
  styleUrls: ['./ships-filter.component.scss']
})
export class ShipsFilterComponent implements OnInit {

  formFilter: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formFilter = new FormGroup({
      checkboxGroup: new FormGroup({
        'checkbox-port-canaveral': new FormControl(true),
        'checkbox-port-of-los-angeles': new FormControl(true),
        'checkbox-fort-lauderdale': new FormControl(false)
      })
    });
  }

  onChangeCheckbox(): void {
    console.log(Object.values(this.formFilter.controls.checkboxGroup.controls).map(item => item.value));
  }

}
