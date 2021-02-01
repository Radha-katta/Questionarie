import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import questionsModel from '../../assets/questionnaire.json';
import { Answer } from './answer.model';
import { Questions } from './questions.model';
//import * as SampleJson from "../../assets/SampleJson.json";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit  {
  
  questions:Questions[] = questionsModel.item;
  questionFormGroup: FormGroup;

  questionsModel = questionsModel;
   questionsArray:Questions[] = questionsModel.item;
   questionControl: FormControl;
   submittedAnswers:any[];
   submittedQuestions:any[];
   
  
  constructor(private fb: FormBuilder) {
    this.questionFormGroup = this.fb.group({
      questionFormArray : this.fb.array([])
     });
  }

  

  ngOnInit(): void {
    this.createQuestionForm(this.questionFormArray, this.questionsArray);
    console.log(this.questionFormArray);
  }

  onSubmit(event) {
    let answers = [];
    let formGroup = this.questionFormGroup.getRawValue();
    this.submittedAnswers =  formGroup .questionFormArray.flat();
  }

  onchangeCheckBox(event, control){
    if(event.target.type == 'checkbox') {
      event.target.value = event.target.checked;
      control.patchValue({answer: event.target.checked});
    }else{
      control.patchValue({answer: event.target.value});
    }     
  }

  public createQuestionForm(formArray, questions){
    questions.forEach((question,index) => {
      question.type = this.getType(question.type);
      if(question.item) {
        //Construct Child array
        let childArray = this.newQuestionArray(question);
        formArray.push(childArray);
        this.createQuestionForm(childArray , question.item);
      }else{
        if(formArray && formArray.controls.length >=0) {
          formArray.controls.push(this.newQuestion(question));
        }else{
          formArray[question.text]= this.newQuestion(question);
        }  
      }
    })
    
  }

  get questionFormArray() : FormArray {
    return this.questionFormGroup.get("questionFormArray") as FormArray
  }

  public newQuestionArray(question){
     return this.fb.array([]);
   }
 public newQuestion(question){
  const validationsArray = [];
  let value= null;
  if (question.type != 'checkbox' && question.type != 'group') {
    validationsArray.push(Validators.required);
    
  }
  if (question.type == 'checkbox') {
    value = false;
  }
    return this.fb.group({
      answer : [value, validationsArray],
   
    })
  }

public subQuestionsAnswer(empIndex:number)  {
  return this.questionFormArray.at(empIndex).get("answer") ;
}

public getQuestion(index:number)  {
  return this.questionsModel.item[index] ;
}

public getSubQuestion(index:number, subIndex:number)  {
  return this.questionsModel.item[index].item[subIndex];
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
