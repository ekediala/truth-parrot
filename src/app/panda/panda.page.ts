import { Truth } from './../truth';
import { TruthService } from './../service.service';
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
  seen = false;
  id = this.truthToEdit.id;
  show = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private DBService: TruthService
  ) {}
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (window.cordova) {
      this.DBService.getDbState().subscribe(ready => {
        if (ready) {
          this.DBService.editTruth(id)
            .then(result => {
              this.show = true;
              this.truthToEdit = result;
              return true;
            })
            .catch(() => {
              this.show = false;
              this.truthToEdit = {
                author: 'Disappointment Panda',
                truth:
                  'Nothing here and that is quite weird. Go back and try again',
                seen: false,
                id: '',
              };
            });
        }
      });
    } else {
      // go to firestore
    }
  }

  update() {
    if (window.cordova) {
      this.DBService.getDbState().subscribe(ready => {
        if (ready) {
        } else {
          alert(
            'Database not ready Please wait a moment and  try again.'
          );
          return false;
        }
      });
    } else {
      // firestore
    }
  }
}
