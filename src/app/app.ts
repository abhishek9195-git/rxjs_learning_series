import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';

interface Message {
  message: string 
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  stream$ = new Subject<string>()
  _fm1 = signal<Message>({'message': ''})
  _fm2 = signal<Message>({'message': ''})
  _fm3 = signal<Message>({'message': ''})


  user1MessageForm = form(this._fm1)
  user2MessageForm = form(this._fm2)
  user3MessageForm = form(this._fm3)
  
  user1sendMessage() {
    const message = `John: ${this.user1MessageForm.message().value()}`
    this.stream$.next(message)
  }

  user2sendMessage() {
    const message = `James: ${this.user2MessageForm.message().value()}`
    this.stream$.next(message)  
  }

  user3sendMessage() {
    const message = `Karl: ${this.user3MessageForm.message().value()}`
    this.stream$.next(message)  
  }
}
