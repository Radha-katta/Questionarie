import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TopModel } from '../models/top.model';
import { ApiService } from '../services/api-service.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit, OnDestroy {

   answers :any ;
   subscription: Subscription;


  constructor(private apiService:ApiService) {
    console.log("response is" + this.answers);
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

   this.subscription= this.apiService.response.subscribe(res =>{
      this.answers = res;
    })
  }

  public getStr(str){
  
    if(str && typeof(str) == 'string' && str.indexOf(':') != -1) {
      return  str.split(":")[1];
    }
    return str;
  }

}
