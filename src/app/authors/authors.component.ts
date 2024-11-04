import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  authorId: number = 0;
  author: any;
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
      .subscribe(data => {
        this.author = data;
        this.errorMessage = '';
      });
  }
}
