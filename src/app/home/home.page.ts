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
  error: Truth = {
    author: 'Disappointment Panda',
    // tslint:disable-next-line:quotemark
    truth: "Nothing for you mate. Get a life. I don't owe you one.",
    seen: false,
    id: '',
  };

  constructor(private service: TruthService, private tts: TextToSpeech) {}

  ngOnInit(): void {
    if (window.cordova) {
      this.service.getDbState().subscribe(ready => {
        if (ready) {
          this.service
            .getTruth()
            .then(truth => {
              this.truth = truth;
              return true;
            })
            .catch(err => {
              this.truth = this.error;
              console.log(`Error: ${err}`);
              return false;
            });
        }
      });
    } else {
      // fetch from firestore
    }
  }

  speak() {
    document.addEventListener('deviceready', () => {
      if (window.cordova) {
        this.tts
          .speak({
            text: this.truth.truth,
            locale: 'en-US',
            rate: 0.95,
          })
          .then(() => {
            return true;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        const textToSpeech = () => {
          // get all voices that browser offers
          const availableVoices = window.speechSynthesis.getVoices();

          // this will hold an english voice
          let englishVoice: any;

          // find voice by language locale "en-US"
          // if not then select the first voice
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < availableVoices.length; i++) {
            if (availableVoices[i].lang === 'en-US') {
              englishVoice = availableVoices[i];
              break;
            }
          }
          if (englishVoice === '') {
            englishVoice = availableVoices[0];
          }

          // new SpeechSynthesisUtterance object
          const utter = new SpeechSynthesisUtterance();
          utter.rate = 0.95;
          utter.pitch = 0.5;
          utter.text = this.truth.truth;
          utter.voice = englishVoice;

          // speak
          window.speechSynthesis.speak(utter);
        };

        // list of languages is probably not loaded, wait for it
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            textToSpeech();
          });
        } else {
          // languages list available, no need to wait
          textToSpeech();
        }
      }
    });
  }

  exit(): void {
    alert('Exiting');
  }
}
