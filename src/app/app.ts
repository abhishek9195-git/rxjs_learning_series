import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncSubject, EMPTY, finalize, iif, interval, map, mergeMap, of, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  stream = new AsyncSubject<string>()

  ngOnInit() {
    const fruits = ['apple', 'banana', 'orange', 'guava', 'grapes']

    this.stream.subscribe({
      next: (v) => {
        console.log(v);
      },
      complete:() => {
        console.log('==> Completed');
      }
    })


    interval(1000).pipe(
      take(fruits.length),
      tap((i) => this.stream.next(fruits[i]))
    ).subscribe({
      complete: () => this.stream.complete()
    })
  }
}
