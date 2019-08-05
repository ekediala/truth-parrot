import { Truth } from './truth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot, DocumentChangeAction } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  truths: Observable<DocumentChangeAction<Truth>[]>;
  truthsCollectionRef: AngularFirestoreCollection<Truth>;
  truth: Truth;
  truthDoc: AngularFirestoreDocument<Truth>;
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.truthsCollectionRef = this.firestore.collection('truths');
    this.truths = this.truthsCollectionRef.snapshotChanges();
  }

  add(truth: Truth) {
    this.truthsCollectionRef
      .add(truth)
      .then(() => {
        console.log('Created.');
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  update(truth: Truth) {
    this.truthsCollectionRef
      .doc(truth.id)
      .update(truth)
      .then(() => {
        console.log('Updated.');
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  remove(truth: Truth) {
    this.truthsCollectionRef
      .doc(truth.id)
      .delete()
      .then(() => {
        console.log('Deleted.');
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  getTruth(id: string) {
    this.truthDoc = this.firestore.doc<Truth>(`truth/${id}`);
    const response = this.truthDoc.snapshotChanges();
    return response;
  }
}
