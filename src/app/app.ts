import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { debounceTime, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly http = inject(HttpClient)
  private readonly BASE_URL = 'https://jsonplaceholder.typicode.com'

  _form_model = signal({searchTerm: ''})
  searchForm = form(this._form_model)

  userList$ = toObservable(this._form_model).pipe(
    debounceTime(1000),
    mergeMap(({searchTerm}) => this.http.get(`${this.BASE_URL}/users?q=${searchTerm}`))
  )

  ngOnInit() {
    this.userList$.subscribe({
      next: (v) => {
        console.log('==> value', v)
      }
    })

  }
}
