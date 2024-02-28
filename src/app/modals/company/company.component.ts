import { Component, Inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { company } from '../../interfaces/users';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    MatListModule
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {

  company!:company;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data:company
  ){
    this.company = data;
  }

}
