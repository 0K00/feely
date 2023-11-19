/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-18 22:35:46                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-19 04:05:17                               *
 * @FilePath              : feely/client/src/app/views/admin/admin.view.ts    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'view-admin',
  templateUrl: './admin.view.html',
  styleUrl: './admin.view.scss'
})
export class AdminView implements OnInit {

  constructor(
    private adminS: AdminService
  ) {}

  public users: any[] = [];
  public average: number = 0;
  public averageProfile: string = "";
  public average1: number = 0;
  public average2: number = 0;
  public average3: number = 0;
  public average4: number = 0;
  public app: number = 0;
  private yes: number = 0;
  private no: number = 0;

  public ngOnInit(): void {
    let headers = new Headers();

    headers.append("X-Token", this.adminS.getUser()!.token);

    let requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch(environment.apiUrl + "/api/users", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.users = result;
        this.getAverage();
        this.profilAverage();
        this.getVote();
      })
      .catch(error => console.log('error', error));
  }


  private getAverage(): void {
    let ret: number[] = [];
    this.users.forEach((user: any) => {
      ret.push(user.score)
    });
    this.average = Math.round(this.numAverage(ret));
    if(0 >= this.average && this.average <= 9) this.averageProfile = "T'es cool";
    if(10 >= this.average && this.average <= 20) this.averageProfile = "Tu gères";
    if(21 >= this.average && this.average <= 26) this.averageProfile = "C'est le coup de chaud";
    if(27 >= this.average && this.average <= 50) this.averageProfile = "Y'a le feu au lac";
  }

  private profilAverage(): void {
    let a1: number = 0;
    let a2: number = 0;
    let a3: number = 0;
    let a4: number = 0;
    this.users.forEach((user: any) => {
      if(0 >= user.score && user.score <= 9) a1 += 1;
      if(10 >= user.score && user.score <= 20) a2 += 1;
      if(21 >= user.score && user.score <= 26) a3 += 1;
      if(27 >= user.score && user.score <= 50) a4 += 1;
    });

    this.average1 = Math.round((a1 * 100) / this.users.length);
    this.average2 = Math.round((a2 * 100) / this.users.length);
    this.average3 = Math.round((a3 * 100) / this.users.length);
    this.average4 = Math.round((a4 * 100) / this.users.length);
  }

  private numAverage(numbers: number[]): number {
    let i = 0, summ = 0, ArrayLen = numbers.length;
    while (i < ArrayLen) {
      summ = summ + numbers[i++];
    }
    return summ / ArrayLen;
  }

  private getVote(): void {
    let headers = new Headers();

    headers.append("X-Token", this.adminS.getUser()!.token);

    let requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch(environment.apiUrl + "/api/app/1", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.nbVote(result);
      })
      .catch(error => console.log('error', error));
  }

  private nbVote(vote: any): void {
    this.yes = vote.yes;
    this.no = vote.no;
    this.app = Math.round((this.yes * 100) / (this.yes + this.no));
  }




}
