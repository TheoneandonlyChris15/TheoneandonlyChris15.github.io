import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-searchterm',
  templateUrl: './searchterm.component.html',
  styleUrls: ['./searchterm.component.scss']
})
export class SearchtermComponent {
  searchTerm: string = "";
  @Output() searchEvent = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      this.searchEvent.emit(value);
    });
  }

  onSearchTermChange(value: string): void {
    this.searchSubject.next(value);
  }
}
