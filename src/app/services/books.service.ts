import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/interfaces/Book';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiURL = "../../assets/booksDB.json"
  private bookList: Book[] = []

  getBooksList(): Observable<Book[]> {
    if (this.bookList.length === 0) {
      return this.http.get<Book[]>(this.apiURL)
        .pipe(
          map(books => {
            this.bookList = books
            return books
          })
        )
    }
    return of(this.bookList)
  }

  getBook(id: number): Book | undefined {
    // calling the getBookList and using map operators
    return this.bookList.find((book: Book) => book.id === id)
  }


  constructor(private http: HttpClient) { }
}
