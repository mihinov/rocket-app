import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShipDetailsService } from './ship-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent implements OnInit, OnDestroy {

  subs: Subscription;
  constructor(private shipDetailsService: ShipDetailsService) { }

  ngOnInit(): void {
    this.subs = this.shipDetailsService.getShipById('GOMSTREE').subscribe(item => {
      console.log(item);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
