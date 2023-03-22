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

  getBooksList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL)
  }

  getBook(id: number): Observable<Book | undefined>{
    // calling the getBookList and using map operators
    return this.getBooksList().pipe(map((books: Book[]) => books.find((book: Book) => book.id === id)))
  }


  constructor(private http: HttpClient) { }
}
