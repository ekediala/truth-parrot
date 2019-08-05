import { FirestoreService } from './../firestore.service';
import { Truth } from './../truth';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panda-component',
  templateUrl: './panda-component.component.html',
  styleUrls: ['./panda-component.component.scss'],
})
export class PandaComponent {
  @Input() truth: Truth;
  constructor(private fireService: FirestoreService) {}
  deleteTruth() {
    if (confirm('This is an irreversible action')) {
      this.fireService.remove(this.truth);
    }
  }
}
