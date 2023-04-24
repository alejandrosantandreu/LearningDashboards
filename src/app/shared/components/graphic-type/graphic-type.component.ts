import { Component, Input, OnInit, Output,  EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-graphic-type',
  templateUrl: './graphic-type.component.html',
  styleUrls: ['./graphic-type.component.css']
})
export class GraphicTypeComponent implements OnInit {

  @Input() name: '' = '';
  graph: string = ''
  @Output() newItemEvent = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.setGraph('Pie')
  }

  setGraph(g: string): void {
    this.graph = g
    this.getGraph(this.graph)
}

getGraph(value: string) {
  this.newItemEvent.emit(value);
}

}
