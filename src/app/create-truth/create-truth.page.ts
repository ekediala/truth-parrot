import { TruthService } from './../service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-truth',
  templateUrl: './create-truth.page.html',
  styleUrls: ['./create-truth.page.scss'],
})
export class CreateTruthPage {
  author: string;
  truth: string;
  constructor(private service: TruthService) {
  }

  submit() {
    const author = this.author;
    const truth = this.truth;
    const seen = false;
    this.service.save({ author, truth, seen }).then((result) => {
      alert('Saved');
      console.log(result);
    }).catch(err => {
      alert(err);
    });
  }

  get() {
    this.service.get();
  }

}
