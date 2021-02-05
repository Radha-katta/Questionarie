import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import questionsModel from '../../assets/questionnaire.json';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  response = new Subject();

  constructor(
    private httpClient: HttpClient
  ) { }

  getQuestions() {
    return questionsModel;
  }
}


