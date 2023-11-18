/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 19:17:50                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-18 22:32:09                               *
 * @FilePath              : feely/client/src/app/views/home/home.view.ts      *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { Component } from '@angular/core';

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
  link: string,
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
      title: "Zen",
      description: "Abscence de stress",
      img: "d",
      link: "",
      isShow: false
    },
    {
      valueMin: 10,
      valueMax: 20,
      title: "Neutre",
      description: "Votre niveau de stress ressenti est plutôt faible, vous vous adaptez.",
      img: "d",
      link: "",
      isShow: false
    },
    {
      valueMin: 21,
      valueMax: 26,
      title: "Plus",
      description: "Vous savez en général faire face au stress mais vous pouvez parfois être animé d'un sentiment d'impuissance entraînant des perturbations émotionnelles. ",
      img: "d",
      link: "",
      isShow: false
    },
    {
      valueMin: 27,
      valueMax: 50,
      title: "Majeur",
      description: "Vous entrez en zone rouge. L'impression de subir la plupart des situations est forte et la vie est perçue comme une menace. Il devient urgent de prendre soin de vous.",
      img: "d",
      link: "",
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

    console.log(raw);


    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
    };

    fetch("http://localhost:3000/api/users", requestOptions)
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
}
