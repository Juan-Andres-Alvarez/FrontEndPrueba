import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { Users } from '../../interfaces/users';
import { Albums } from '../../interfaces/albums';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [ApiService],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent {

  myControl = new FormControl();
  options: Users[] = [];
  filteredOptions!: Observable<Users[]>;
  albums: Albums[] = [];
  dataSource = new MatTableDataSource<Albums>();

  displayedColumns: string[] = [
    'userId',
    'id',
    'title'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAutocomplete) autocomplete!: MatAutocomplete;

  constructor(private _api: ApiService) { }

  ngOnInit() {
    this._api.apiGet('users').subscribe((data: any) => {
      this.options = data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: string): Users[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  trackById(index: number, option: Users): number {
    return option.id; // Suponiendo que tienes una propiedad `id` en tu interfaz `Users`
  }

  onOptionSelected(event: any) {
    const selectedUser = this.options.find(user => user.name === event.option.value);
    if (selectedUser) {
      this.getAlbums(selectedUser.id);
    }
  }

  getAlbums(userId: number) {
    this._api.apiGet('albums', `userId=${userId}`)
      .subscribe({
        next: (data: any) => {
          this.albums = data;
          this.dataSource = new MatTableDataSource(this.albums);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 1);
        },
        error: (err) => {
          console.log('Hubo un error al obtener los albumes', err);
        }
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
