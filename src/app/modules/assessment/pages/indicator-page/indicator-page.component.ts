import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-indicator-page',
  templateUrl: './indicator-page.component.html',
  styleUrls: ['./indicator-page.component.css']
})
export class IndicatorPageComponent implements OnInit {
  option1: any;
  option2: any;
  option3: any;
  menuOptions: Array<any> = []

  star: boolean = true;
  bar: boolean = false;

  type(name: string) {
    if(name == 'Star') {
      this.star = true;
      this.bar = false;
    }
    else if (name == 'Bar') {
      this.bar = true;
      this.star = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.menuOptions = [
      {
        name: 'Star',
      },
      {
        name: 'Bar',
      }
    ]

    this.option1 = {
      title: {
        text: 'Backlog management',
        subtext: 'Group 1',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 1048, name: 'Alumne 1' },
            { value: 735, name: 'Alumne 2' },
            { value: 580, name: 'Alumne 3' },
            { value: 484, name: 'Alumne 4' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    this.option2 = {
      title: {
        text: 'Multiple Radar',
        subtext: 'Group 2',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        left: 'left',
        data: [
          'A Software'
        ]
      },
      radar: [
        {
          indicator: [
            { text: 'Brand', max: 100 },
            { text: 'Content', max: 100 },
            { text: 'Usability', max: 100 },
            { text: 'Function', max: 100 }
          ],
          center: ['50%', '50%'],
          radius: 120
        }
      ],
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          areaStyle: {},
          data: [
            {
              value: [60, 73, 85, 40],
              name: 'A Software'
            }
          ]
        }
      ]
    };

    this.option3 = {
      title: {
        text: 'Repository contribution',
        subtext: 'Group 3',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
  }

}
