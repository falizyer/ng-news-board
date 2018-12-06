import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nb-source-container',
  templateUrl: './source-container.component.html',
  styleUrls: ['./source-container.component.scss']
})
export class SourceContainerComponent implements OnInit {

  @Input() source;

  constructor() { }

  ngOnInit() {
  }

}
