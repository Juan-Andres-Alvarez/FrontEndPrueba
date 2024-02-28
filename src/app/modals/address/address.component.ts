import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { address } from '../../interfaces/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {

  address!:address;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data:any
  ){
    this.address = data;
  }

}
