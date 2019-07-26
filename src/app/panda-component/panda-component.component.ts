import { TruthService } from './../service.service';
import { Truth } from './../truth';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panda-component',
  templateUrl: './panda-component.component.html',
  styleUrls: ['./panda-component.component.scss'],
})
export class PandaComponent {
  @Input() truth: Truth;
  constructor(private DBService: TruthService) {}
  deleteTruth() {
    if (confirm('This is an irreversible action')) {
      if (window.cordova) {
        this.DBService.getDbState().subscribe(ready => {
          if (ready) {
            this.DBService.deleteTruth(this.truth)
              .then(() => {
                alert('Deleted.');
                return true;
              })
              .catch(err => {
                console.log(`Error: ${err}`);
                return false;
              });
          }
        });
      } else {
        // delete from firestore
      }
    }
  }
}
