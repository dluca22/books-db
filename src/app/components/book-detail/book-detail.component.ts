import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'src/interfaces/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {

  book?: Book;

  ngOnInit(){
    const routeParam = this.route.snapshot.paramMap
    const bookId = Number(routeParam.get('id'))
    // this.booksService.getBook(bookId).subscribe(book => this.book = book)
    this.booksService.getBook(bookId).subscribe(book => this.book = book)
  }

  constructor(private booksService: BooksService,
    private route: ActivatedRoute){}
}
