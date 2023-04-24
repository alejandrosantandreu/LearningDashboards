import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-option',
  templateUrl: './home-option.component.html',
  styleUrls: ['./home-option.component.css']
})
export class HomeOptionComponent implements OnInit {

  @Input() name: '' = '';
  @Input() description: '' = '';

  constructor() { }

  ngOnInit(): void {
  }

}
