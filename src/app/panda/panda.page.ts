import { FirestoreService } from './../firestore.service';
import { Truth } from './../truth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panda',
  templateUrl: './panda.page.html',
  styleUrls: ['./panda.page.scss'],
})
export class PandaPage implements OnInit {
  truthToEdit: Truth;
  author = this.truthToEdit.author;
  truth = this.truthToEdit.truth;
  seen = this.truthToEdit.seen;
  id = this.truthToEdit.id;
  show = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.firestore.getTruth(id).subscribe(response => {
      this.truthToEdit = response.payload.data();
    });

    if (this.truthToEdit) {
      this.show = true;
    } else {
      this.truthToEdit = {
        id: '',
        author: 'Truth Parrot',
        truth: `Nothing here. Go away`,
        seen: true,
      };
    }
  }

  update() {
    const id = this.id;
    const author = this.author;
    const truth = this.truth;
    const seen = this.seen;
    this.firestore.update({ id, author, truth, seen });
  }
}
