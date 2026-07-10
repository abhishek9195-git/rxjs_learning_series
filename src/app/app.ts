import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, reduce, take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  ngOnInit() {
    interval(1000).pipe(
      take(5),
      reduce((acc, e, i) => acc += e, 0)
    ).subscribe({next: v => console.log(v)})
  }
}
