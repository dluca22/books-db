import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/interfaces/Book';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// inteface type for new book?
// like a Book but without an Id that will be assigned in the addBook() function
interface newBook {
  title: string,
  author: string,
  category: 'avventura' | 'saggio' | 'fantasy',
  pages: number
}


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

  deleteBook(id:number):void{
    this.bookList = this.bookList.filter(book => book.id !== id)
  }

  addBook(submission:newBook){
    const newbook : Book = {
      id: this.bookList.length +1,
      ...submission
    }

    this.bookList.push(newbook)
  }

  constructor(private http: HttpClient) { }
}
