import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Public variables
  public loading = true;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.HandsetPortrait]).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id: 1, title: 'Card 1', cols: 2, rows: 1 },
          { id: 2, title: 'Card 2', cols: 2, rows: 1 },
          { id: 3, title: 'Card 3', cols: 2, rows: 1 },
          { id: 4, title: 'Card 4', cols: 2, rows: 1 }
        ];
      }

      return [
        { id: 1, title: 'Card 1', cols: 2, rows: 1 },
        { id: 2, title: 'Card 2', cols: 1, rows: 1 },
        { id: 3, title: 'Card 3', cols: 1, rows: 2 },
        { id: 4, title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  /**
   * Constructor
   * 
   * @param {BreakpointObserver} breakpointObserver 
   */
  constructor(private breakpointObserver: BreakpointObserver) {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {

  }

}
