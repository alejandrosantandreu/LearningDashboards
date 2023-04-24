import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-graphic',
  templateUrl: './generic-graphic.component.html',
  styleUrls: ['./generic-graphic.component.css']
})
export class GenericGraphicComponent implements OnInit {

  @Input() title: string = ''
  @Input() mode: 'small' | 'big' = 'big'

  constructor() { }

  ngOnInit(): void {
  }

}
