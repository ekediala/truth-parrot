import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { Truth } from './truth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

  /**
   * Truth service for cordova apps
   */
export class TruthService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  pandaTruths = new BehaviorSubject([]);
  adminPandaList = new BehaviorSubject([]);

  constructor(
    private platform: Platform,
    private porter: SQLitePorter,
    private sql: SQLite,
    private http: HttpClient
  ) {
    this.platform
      .ready()
      .then(() => {
        this.sql
          .create({
            name: 'panda.db',
            location: 'default',
          })
          .then((db: SQLiteObject) => {
            this.database = db;
            this.seedDatabase();
          })
          .catch(err => {
            console.log(`Error: ${err}`);
            return false;
          });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        return false;
      });
  }

  seedDatabase() {
    this.http
      .get('../assets/database/seed.sql', { responseType: 'text' })
      .subscribe(response => {
        this.porter
          .importSqlToDb(this.database, response)
          .then(_ => {
            this.loadPandaTruths();
            this.dbReady.next(true);
          })
          .catch(err => {
            console.log(`Error: ${err}`);
            return false;
          });
      });
  }

  getDbState() {
    return this.dbReady.asObservable();
  }

  getTruths(): Observable<Truth[]> {
    return this.adminPandaList.asObservable();
  }

  async loadAdminPandaTruths() {
    const pandaTruthsArray: Truth[] = [];
    const data = await this.database.executeSql('SELECT * FROM truthTable');
    if (data) {
      if (data.rows.length > 0) {
        for (const pandaTruth of data.rows) {
          pandaTruthsArray.push({
            author: pandaTruth.author,
            seen: pandaTruth.seen,
            truth: pandaTruth.truth,
            id: pandaTruth.id,
          });
        }
      }
    }
    this.adminPandaList.next(pandaTruthsArray);
  }

  async loadPandaTruths() {
    const pandaTruthsArray: Truth[] = [];
    const data = await this.database.executeSql(
      'SELECT * FROM truthTable WHERE seen = ?',
      [0]
    );
    if (data) {
      if (data.rows.length > 0) {
        for (const pandaTruth of data.rows) {
          pandaTruthsArray.push({
            author: pandaTruth.author,
            seen: pandaTruth.seen,
            truth: pandaTruth.truth,
            id: pandaTruth.id,
          });
        }
      }
    }
    this.pandaTruths.next(pandaTruthsArray);
  }

  async addTruth(truth: Truth) {
    const data = [truth.author, truth.truth, truth.seen];
    const result = await this.database.executeSql(
      'INSERT INTO truthTable(author, truth, seen)VALUES(?, ?, ?)',
      data
    );
    if (result) {
      this.loadPandaTruths();
      this.loadAdminPandaTruths();
    }
  }

  async editTruth(id: any): Promise<Truth> {
    const result = await this.database.executeSql(
      'SELECT * FROM truthTable WHERE id = ?',
      [id]
    );
    const pandaTruth: Truth = {
      author: result.rows.item(0).author,
      truth: result.rows.item(0).truth,
      seen: true,
      id,
    };
    return pandaTruth;
  }

  async getTruth(): Promise<Truth> {
    let limit: number;
    this.pandaTruths.subscribe(data => (limit = data.length));
    const id = Math.random() * limit;
    const result = await this.database.executeSql(
      'SELECT * FROM truthTable WHERE id = ?',
      [id]
    );
    const pandaTruth: Truth = {
      author: result.rows.item(0).author,
      truth: result.rows.item(0).truth,
      seen: true,
      id,
    };
    await this.updateTruth(pandaTruth);
    return pandaTruth;
  }

  async deleteTruth(truth: Truth) {
    this.database
      .executeSql('DELETE * FROM truthTable WHERE id = ?', [truth.id])
      .then(() => {
        this.loadPandaTruths();
        this.loadAdminPandaTruths();
        return true;
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        return false;
      });
  }

  async updateTruth(truth: Truth) {
    const data = [truth.author, truth.truth, truth.seen];
    this.database
      .executeSql(
        `UPDATE truthTable SET author = ?, truth = ?, seen = ? WHERE id = ${
          truth.id
        }`,
        data
      )
      .then(() => {
        this.loadPandaTruths();
        this.loadAdminPandaTruths();
        return true;
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        return false;
      });
  }
}
