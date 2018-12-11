import { Component, Input, OnInit } from '@angular/core';
import { NewsBoard } from '../../index';

@Component({
  selector: 'nb-source-container',
  templateUrl: './source-container.component.html',
  styleUrls: ['./source-container.component.scss']
})
export class SourceContainerComponent implements OnInit {

  @Input() source: NewsBoard.SourceItemObject;
  @Input() onSubscribeCb: (source) => void;

  constructor() {
    this.source = {} as NewsBoard.SourceItemObject;
  }

  ngOnInit() {
  }

}
