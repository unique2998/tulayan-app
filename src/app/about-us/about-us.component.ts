import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css','./about-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent {

}
