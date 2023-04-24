import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic-type',
  templateUrl: './graphic-type.component.html',
  styleUrls: ['./graphic-type.component.css']
})
export class GraphicTypeComponent implements OnInit {

  @Input() name: '' = '';

  constructor() { }

  ngOnInit(): void {
  }

}
