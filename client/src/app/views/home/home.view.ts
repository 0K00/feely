/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 19:17:50                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-19 04:05:02                               *
 * @FilePath              : feely/client/src/app/views/home/home.view.ts      *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

interface IQuestion {
  title: string,
  value?: number,
  isShow: boolean
}

interface IProfile {
  valueMin: number,
  valueMax: number,
  title: string,
  description: string,
  img: string,
  isShow: boolean
}

@Component({
  selector: 'view-home',
  templateUrl: './home.view.html',
  styleUrl: './home.view.scss'
})
export class HomeView {
  public questions: IQuestion[] = [
    {
      title: "info",
      isShow: true
    },
    {
      title: "Avez-vous été dérangé par un événement inattendu ?",
      isShow: false,
      value: 0

    },
    {
      title: "Vous a-t-il semblé difficile de contrôler les choses importantes de votre vie ?",
      isShow: false,
      value: 0
    },
    {
      title: "Vous êtes-vous senti nerveux et stressé(e) ?",
      isShow: false,
    },
    {
      title: "Vous êtes-vous senti confiant dans vos capacités à prendre en main vos problèmes personnels ?",
      isShow: false,
      value: 0
    },
    {
      title: "Avez-vous senti que les choses allaient comme vous le vouliez ?",
      isShow: false,
      value: 0
    },
    {
      title: "Avez-vous pensé que vous ne pouviez pas assumer toutes les choses que vous deviez faire ?",
      isShow: false,
      value: 0
    },
    {
      title: "Avez-vous été capable de maîtriser votre énervement ?",
      isShow: false,
      value: 0
    },
    {
      title: "Avez-vous senti que vous dominiez la situation ?",
      isShow: false,
      value: 0
    },
    {
      title: "Vous êtes-vous senti irrité parce que les événements échappaient à votre contrôle ?",
      isShow: false,
      value: 0
    },
    {
      title: "Avez-vous trouvé que les difficultés s'accumulaient à un tel point que vous ne pouviez les surmonter ?",
      isShow: false,
      value: 0
    },
  ]

  public profiles: IProfile[] = [
    {
      valueMin: 0,
      valueMax: 9,
      title: "T'es cool",
      description: "Absence de stress. Les évènements glissent sur toi. T'es zen...",
      img: "1",
      isShow: false
    },
    {
      valueMin: 10,
      valueMax: 20,
      title: "Tu gères",
      description: "Ton niveau de stress ressenti est plutôt faible, tu t'adaptes bien aux situations qui se présentent !",
      img: "2",
      isShow: false
    },
    {
      valueMin: 21,
      valueMax: 26,
      title: "C'est le coup de chaud",
      description: "Tu sais en général faire face au stress, mais tu peux parfois être animé d'un sentiment d'impuissance face aux petits coups de chaud !",
      img: "3",
      isShow: false
    },
    {
      valueMin: 27,
      valueMax: 50,
      title: "Y'a le feu au lac",
      description: "Tu as l'impression de subir chaque situation stressante. Tu te sens dépassé par moment et tu ne sais plus comment réagir. Attention, il devient urgent de prendre soin de toi",
      img: "4",
      isShow: false
    },
  ]

  public name: string = "";
  public email: string = "";
  public age!: number;
  public gender: string = "";
  public score: number = 0;
  public stepper: number = 0;
  public isSubmit: boolean = false;
  public isVote: boolean = false;

  public next(): void {
    this.questions[this.stepper].isShow = false;
    this.stepper += 1;
    this.questions[this.stepper].isShow = true;
  }

  public before(): void {
    this.questions[this.stepper].isShow = false;
    this.stepper -= 1;
    this.questions[this.stepper].isShow = true;
  }

  public submit(): void {
    this.isSubmit = true;
    this.questions[this.questions.length - 1].isShow = false;
    this.getProfile();
  }

  private sendProfile(): void {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "name": this.name,
      "email": this.email,
      "gender": this.gender,
      "age": this.age,
      "score": this.score
    });

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
    };

    fetch(environment.apiUrl + "/api/users", requestOptions)
      .catch(error => console.log('error', error));
  }

  private putValue(index: number, value: number): void {
    this.questions[index].value = value;
  }

  public inputChange(event: any): void {
    let el = event.target;

    if(el && el.checked == true){
      let radioValue = parseInt(el.value);
      this.putValue(this.stepper, radioValue)
    }
  }

  private addValue(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      let count = 0;
      for (let i = 1; i < this.questions.length; i++) {
        const question = this.questions[i];
        count += question.value!;
      }
      return resolve(count);
    })
  }

  private getProfile(): void {
    this.addValue().then((res: number) => {
      this.score = res;
      this.profiles.forEach((profile) => {
        if(this.score >= profile.valueMin && this.score <= profile.valueMax)
          profile.isShow = true;
      });
      this.sendProfile();
    });
  }

  public voteYes(): void {
    this.isVote = true;
  }

  public voteNo(): void {
    this.isVote = true;
  }

  public editVote(vote: boolean) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "vote": vote
    });

    let requestOptions = {
      method: 'PUT',
      headers: headers,
      body: raw,
    };

    fetch("localhost:5000/api/projects/BMJEkKoQ", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }
}
