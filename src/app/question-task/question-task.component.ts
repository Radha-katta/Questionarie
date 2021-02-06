import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionsModel from '../../assets/questionnaire.json';
import { TopModel } from '../models/top.model';
import { ApiService } from '../services/api-service.service';
import { selectValidator } from '../shared/custom-validator.validator';

@Component({
  selector: 'app-question-task',
  templateUrl: './question-task.component.html',
  styleUrls: ['./question-task.component.scss']
})
export class QuestionTaskComponent implements OnInit {


  
  questionFormGroup: FormGroup;
  topModel: TopModel;
  response: any;
   genders: any [] =['Male', 'Female'];
   countries: any[] = ['US', 'UK'];
   maritalStatuses: any[] = ['Single', 'Married', 'Divorced'];

  
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.topModel  = this.apiService.getQuestions();
    this.questionFormGroup = this.fb.group({
      resourceType: this.topModel.resourceType,
      identifier: this.topModel.identifier,
      date: this.topModel.date,
      status: this.topModel.status,
      item : this.fb.array([])
     });
  }

  ngOnInit(): void {
    this.createQuestionForm(this.topModel, this.item);
    console.log(this.questionFormGroup);
  }

  get item() : FormArray {
    return this.questionFormGroup.get("item") as FormArray
  }

  public createQuestionForm(questionsModel, itemArray){

    questionsModel.item.forEach((question,index) => {
      //create answer
      let createAnswer = question.item? false :true;
      let formGroup = this.createQuestionControl(question, createAnswer);
     // itemArray.controls[question.linkId] = formGroup;
     itemArray.controls[index] = formGroup;
      if(question.item) {
        this.createQuestionForm(question,  formGroup.get("item"));
      }
    });
  }

  public createQuestionControl(question, createAnswer) {
    switch (question.type) {
      case "boolean":
        return this.fb.group({
          linkId : question.linkId,
          text: question.text,
          type : this.getType(question.type),
          answer: false
        });
      case "string":
        return  this.fb.group({
          linkId : question.linkId,
          text: question.text,
          type : this.getType(question.type),
          answer: ["-1", selectValidator]
        });;
      case "date": 
        return this.fb.group({
          linkId : question.linkId,
          text: question.text,
          type : this.getType(question.type),
          answer: ["", Validators.required]
        });
      default: 
        return this.fb.group({
          linkId : question.linkId,
          text: question.text,
          type : this.getType(question.type),
          item: this.fb.array([])
        });
    }
  }

  onchangeInput(event, control){
  
    if(event.target.type == 'checkbox') {
      event.target.value = event.target.checked;
      control.patchValue({answer: event.target.checked});
    }
    this.questionFormGroup.get("item").setValue((this.questionFormGroup.get("item") as FormArray).getRawValue());
  }

  public getOptions(linkId){
    switch (linkId) {
      case "2.1":
            return this.genders;
      case "2.3":
        return this.countries;
      case "2.4": 
          return this.maritalStatuses;
      default: 
         return '';
    }

  }

  onSubmit(event) {
    debugger;
    let output = this.questionFormGroup.getRawValue();
    this.response = JSON.stringify(output);
    console.log(this.questionFormGroup);
    console.log(JSON.stringify(output))
    this.apiService.response.next(output);
    
  }

  public getType(type){
    switch (type) {
        case "boolean":
              return 'checkbox';
        case "string":
          return 'text';
        case "date": 
            return 'date';
        default: 
           return type;
      }
  }

}
