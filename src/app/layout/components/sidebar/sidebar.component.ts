import { Component } from '@angular/core';
import { menuOptions } from '../../data/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  navOptions = menuOptions.Teacher;

}
