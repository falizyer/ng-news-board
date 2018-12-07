import { Component, Input, OnInit } from '@angular/core';
import { NewsBoard } from '../..';

@Component({
  selector: 'nb-source-container',
  templateUrl: './source-container.component.html',
  styleUrls: ['./source-container.component.scss']
})
export class SourceContainerComponent implements OnInit {

  @Input() source: NewsBoard.SourceItemObject;

  constructor() { }

  ngOnInit() {
  }

}
