import { TruthService } from './../service.service';
import { Truth } from './../truth';
import { Component, OnInit, NgModule } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  truth: Truth;
  constructor(private service: TruthService, private tts: TextToSpeech) { }

  ngOnInit(): void {
    this.truth = this.service.get();
  }

  speak() {
    document.addEventListener('deviceready', () => {
      this.tts.speak({
        text: this.truth.truth,
        locale: 'en-US',
        rate: 0.95
      }).then(() => {
        return true;
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  exit(): void {
    alert('Exiting');
  }

}
