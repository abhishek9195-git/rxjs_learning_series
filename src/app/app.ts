import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { debounceTime, EMPTY, map, of, switchMap, tap } from 'rxjs';

type IUser = {
  name: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private _form_model = signal({'searchText': ''})
  searchForm = form(this._form_model)
  private readonly http = inject(HttpClient)

  userList = toSignal(
    toObservable(this._form_model).pipe(
      map((model) => model.searchText),
      debounceTime(300),
      switchMap((searchText: string) => {
        if(!searchText) {
          return of([])
        }
        return this.http.get<IUser[]>(`https://jsonplaceholder.typicode.com/users/?q=${searchText}`)
      })
    )
  )

  onSubmit(form: Event) {

  }
}
