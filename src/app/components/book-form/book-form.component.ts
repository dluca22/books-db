import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit{
  bookForm!: FormGroup;

  constructor(private bookService: BooksService){}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      category: new FormControl('fantasy', Validators.required),
      pages: new FormControl(null, [Validators.required, Validators.max(1500), Validators.min(0)])
    })
  }

  onSubmit(){
    this.bookService.addBook(this.bookForm.value)
  }
}
