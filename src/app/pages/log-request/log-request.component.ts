import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LogRequest } from '../../interfaces/log-request';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../services/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-log-request',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ApiService],
  templateUrl: './log-request.component.html',
  styleUrl: './log-request.component.scss'
})
export class LogRequestComponent {

  displayedColumns: string[] = [
    'date',
    'method',
    'responseData',
    'actions'
  ];
  dataSource: MatTableDataSource<LogRequest>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _api: ApiService
  ) {
    const users: LogRequest[] = [];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    this.getLogsRequest();
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

  getLogsRequest() {
    this._api.apiGet('LogRequest').subscribe({
      next: (logsRequest: any) => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(logsRequest);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('Hubo un error:', err);
      }
    })
  }

  deleteItem(id:number){
    if(confirm('Está seguro que desea eliminar el registro?')){
      this._api.apiDelete('LogRequest',id)
      .subscribe({
        next: (data:any) => {
          if(data?.msg == "Log record deleted successfully"){
            this.getLogsRequest();
          }
        },
        error: (err) => {
          console.log('Hubo un error al elimiar el registro', err);
        }
      })
    }
  }

}
