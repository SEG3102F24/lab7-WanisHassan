import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  authorId: number = 0;
  author: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}


  onSearchAuthor() {
    this.http.get(`http://localhost:8080/books-api/authors/${this.authorId}`)
      .pipe(
        catchError(error => {
          this.author = null;
          this.errorMessage = 'Author not found';
          return of(null);
        })
      )
      .subscribe(
        (data) => {
          if (data) {
            this.author = data;
            this.errorMessage = '';
          } else {
            this.author = null;
            this.errorMessage = 'Author not found';
          }
        }
      );
  }
}

