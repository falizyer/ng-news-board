import { Component, Input, OnInit } from '@angular/core';
import { NewsBoard } from '../../index';

export type SCButtonsTypeObject = {
  toggle: (source: NewsBoard.SourceItemObject) => void;
  classList: (source: NewsBoard.SourceItemObject) => string[];
};

@Component({
  selector: 'nb-source-container',
  templateUrl: './source-container.component.html',
  styleUrls: ['./source-container.component.scss']
})
export class SourceContainerComponent implements OnInit {

  @Input() source: NewsBoard.SourceItemObject;
  @Input() buttons: SCButtonsTypeObject[] = [];

  constructor() {
    this.source = {} as NewsBoard.SourceItemObject;
  }

  ngOnInit() {
  }

}
