import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";


SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  
}
