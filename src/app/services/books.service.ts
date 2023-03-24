import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/interfaces/Book';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// invece di ri dichiarare interface simile  Book, c'era la keyword Omit <> come da tutorial
// riferimento anche qua: https://stackoverflow.com/questions/51063976/how-to-exclude-properties-from-interface-while-inheriting
interface newBook extends Omit<Book, 'id'>{}


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

  // observable from the previous http-branch
  getBook(id: number): Observable<Book | undefined>{
    // calling the getBookList and using map operators
    return this.getBooksList().pipe(map((books: Book[]) => books.find((book: Book) => book.id === id)))
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

  editBook(bookId:number, submission:Book){

    this.bookList = this.bookList.map(book => (
      book.id === bookId ?
       { ...submission, id: bookId}
       : book
    ))
  }

  constructor(private http: HttpClient) { }
}
