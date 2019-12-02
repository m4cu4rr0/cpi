import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quest1',
  templateUrl: './quest1.component.html',
  styleUrls: ['./quest1.component.scss']
})
export class Quest1Component implements OnInit {

  seccion = 1;

  constructor() { }

  ngOnInit() {
  }

  anterior() {
    window.scroll(0,0);
    this.seccion--;
  }

  siguiente() {
    window.scroll(0,0);
    this.seccion++;
  }

}
