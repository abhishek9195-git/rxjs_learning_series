import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { concatMap, from } from 'rxjs';

const BASE_URL = 'https://jsonplaceholder.typicode.com'
type IUser = {
  id: string,
  name: string 
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private readonly http = inject(HttpClient)

  ngOnInit() {
    from([1, 2, 3, 4, 5]).pipe(
      concatMap((userId: number) => this.http.get<IUser>(`${BASE_URL}/users/${userId}`))
    ).subscribe({
      next: v => console.log(v.name)
    })
  }
}
