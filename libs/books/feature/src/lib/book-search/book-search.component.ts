import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder, FormControl } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  subscribtion: Subscription[] =[]

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) { }

  set searchTerm(term: string) {
    this.searchForm.setValue({ term })
  }

  get searchTerm(): string {
    return (this.searchForm.get('term') as FormControl).value;
  }

  ngOnInit(): void {
    const bookSubscribtion: Subscription = this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    this.subscribtion.push(bookSubscribtion)
    const searchSubscription: Subscription = this.searchForm.get('term').valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
      this.searchBooks()
    })
    this.subscribtion.push(searchSubscription)
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchTerm) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  trackByFn(book: Book) {
    return book.id
  }

  ngOnDestroy(): void {
    this.subscribtion.forEach(((subcription: Subscription) => subcription.unsubscribe()))
  }
}
