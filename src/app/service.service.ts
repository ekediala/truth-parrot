import { Truths, display } from './data';
import { Truth } from './truth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TruthService {
  index: any;

  constructor() {

  }

  async save(truth: Truth) {
    Truths.push(truth);
    return true;
  }


  get() {
    if (display.show) {
      while (true) {
        const end: number = Truths.length - 1;
        const index = Math.random() * end;
        if (!Truths[index].seen) {
          return Truths[index];
        }
      }
    }
    return Truths[0];
  }
}
