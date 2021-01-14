import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShipDetailsService } from './ship-details.service';
import { Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Ship } from '../shared/interfaces';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent implements OnInit, OnDestroy {

  subs: Subscription;
  idPage: string;
  ship: Ship;
  constructor(private shipDetailsService: ShipDetailsService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.idPage = params.id;
      this.getShip(this.idPage);
    }).unsubscribe();
  }

  getShip(id: string): void {
    this.subs = this.shipDetailsService.getShipById(id).pipe(
      mergeMap(item => item),
      tap(item => {
        this.ship = item;
      })
    )
    .subscribe(item => {
      console.log(item);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
