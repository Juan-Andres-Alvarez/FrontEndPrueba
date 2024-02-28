import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Users } from '../../interfaces/users';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PostsComponent } from '../../modals/posts/posts.component';
import { AddressComponent } from '../../modals/address/address.component';
import { CompanyComponent } from '../../modals/company/company.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'address',
    'phone',
    'website',
    'company',
    'posts'
  ];
  dataSource: MatTableDataSource<Users>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _api: ApiService,
    private _dialog: MatDialog
  ) {
    const users: Users[] = [];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this._api.apiGet('users').subscribe({
      next: (users: any) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('Hubo un error:', err);
      }
    })
  }

  openModal(typeModal: 'address' | 'company' | 'posts', data:any){
    let component:any;
    switch (typeModal) {
      case 'address':
        component = AddressComponent;
        break;
      case 'company':
        component = CompanyComponent;
        break;
      default:
        component = PostsComponent;
        break;
    }
    console.log(data)
    this._dialog.open(component, {data});
  }

}
