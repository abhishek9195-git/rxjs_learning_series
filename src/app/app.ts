import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  stream = new ReplaySubject<number>(3)

  ngOnInit() {
    let i = 0;
    setInterval(() => {
      this.stream.next(i++);
    }, 1000);
  }

  printStream() {
    this.stream.subscribe({
      next: (v) => console.log('==> v', v)
    })
  }
}
