import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public imageObject: Array<object> = [
    {
      image: 'assets/img/brand/slider-1.jpg',
      thumbImage: 'assets/img/brand/slider-1.jpg',
      alt: 'alt',
      title: 'title of image'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
