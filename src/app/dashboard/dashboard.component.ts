import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private sources = [];

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const { sources } = this.route.snapshot.data;
    this.route.params.subscribe(params => {
      const index: number = +params['index'];
      const start: number = (index - 1) * 10;
      this.sources = sources.sources.slice(start, index * 10);
    });
  }
}
