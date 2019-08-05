import { Component } from '@angular/core';
import { Truth } from '../truth';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-create-truth',
  templateUrl: './create-truth.page.html',
  styleUrls: ['./create-truth.page.scss'],
})
export class CreateTruthPage {
  author: string;
  truth: string;
  constructor(private firestore: FirestoreService) {}
  submit() {
    const author = this.author;
    const truth = this.truth;
    const seen = false;
    const id = '';
    const payload = { author, seen, truth, id };
    this.firestore.add(payload);
  }
}
