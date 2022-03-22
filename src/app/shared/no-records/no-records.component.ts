import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-no-records',
  templateUrl: './no-records.component.html',
  styleUrls: ['./no-records.component.scss']
})
export class NoRecordsComponent implements OnInit, OnChanges {

  @Input() displayContent: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.displayContent = changes.displayContent.currentValue;
  }

}
