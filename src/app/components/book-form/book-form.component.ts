import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  // instance of reactive FormGroup
  bookForm!: FormGroup;
  errorMessage: boolean = false;
  submitted: boolean = false;

  // onInit sets the validation for this form (kinda like in django's modelForm??)
  // all fields required and pages have range 0-1500

  // ATTENZIONE - WEAK !! dom manipulation will allow disabled button to be re-enabled
  //
  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      category: new FormControl('fantasy', Validators.required),
      pages: new FormControl(null, [Validators.required, Validators.max(1500), Validators.min(0)])
    })
  }

  onSubmit() {
    if (this.bookForm.valid) {
        // submits the data to the service
        this.bookService.addBook(this.bookForm.value);
      // resets the form and makes the "back" button appear
      this.submitted = true
      this.bookForm.reset()
      this.errorMessage = false
    } else {
      this.errorMessage = true
    }
  }
  constructor(private bookService: BooksService) { }
}
