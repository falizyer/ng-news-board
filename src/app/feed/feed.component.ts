import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nb-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  private feeds;

  constructor(private route: ActivatedRoute) {

  }

  public ngOnInit() {
    const { feeds = [] } = this.route.snapshot.data;
    this.feeds = feeds;
  }

}
