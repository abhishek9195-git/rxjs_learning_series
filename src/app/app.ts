import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

const observer = {
  next: (value: number) => {console.log('==> Value: ', value)},
  error: (err: any) => {console.log(err)},
  complete: () => {console.log('Completed')}
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  subscription!: Subscription
  counter = signal(0)

  obs$ = new Observable<number>(observer => {
    let i = 0
    const interval = setInterval(() => {
      observer.next(i++)
    }, 1000);

    return {
      unsubscribe: () => {
        clearInterval(interval)
      }
    }
  })

  start() {
    this.subscription = this.obs$.subscribe(observer)
  }

  stop() {
    this.subscription.unsubscribe()
  }
}
