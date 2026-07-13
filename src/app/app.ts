import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';

interface IUser {
  id: number,
  name: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  stream = new Subject();
  private readonly http = inject(HttpClient);
  BASE_URL = 'https://jsonplaceholder.typicode.com'

  ngOnInit() {

    const user$ = this.http.get(`${this.BASE_URL}/users/1`)
    const todo$ = this.http.get(`${this.BASE_URL}/todos/1`)

    forkJoin({
      user: user$,
      todo: todo$
    })
    .subscribe({
      next: ({user, todo}) => {
        console.log(user);
        console.log(todo);
      }
    })
  }
}
