import { TruthService } from './../service.service';
import { Component, OnInit } from '@angular/core';
import { Truth } from '../truth';

@Component({
  selector: 'app-create-truth',
  templateUrl: './create-truth.page.html',
  styleUrls: ['./create-truth.page.scss'],
})
export class CreateTruthPage implements OnInit {
  author: string;
  truth: string;
  truthList: Truth[];
  constructor(private DBService: TruthService) {}

  submit() {
    const author = this.author;
    const truth = this.truth;
    const seen = false;
    if (window.cordova) {
      this.DBService.getDbState().subscribe(ready => {
        if (ready) {
          this.DBService.addTruth({ author, truth, seen, id: 0 })
            .then(() => {
              alert('Saved');
              return true;
            })
            .catch(err => {
              console.log(`Error: ${err}`);
              return false;
            });
        } else {
          alert(
            'Database not ready Please wait a moment and  try again.'
          );
          return false;
        }
      });
    } else {
      // fetch data from firestore
    }
  }

  ngOnInit(): void {
    if (window.cordova) {
      this.DBService.getDbState().subscribe(ready => {
        if (ready) {
          this.DBService.getTruths().subscribe(data => {
            this.truthList = data;
          });
        }
      });
    } else {
      // fetch from firestore
    }
  }
}
