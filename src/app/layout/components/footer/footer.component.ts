import { Component } from '@angular/core';
import { menuOptions } from '../../data/menu';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  navOptions = menuOptions.Admin;
}
