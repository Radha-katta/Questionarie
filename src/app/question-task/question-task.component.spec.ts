import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTaskComponent } from './question-task.component';

describe('QuestionTaskComponent', () => {
  let component: QuestionTaskComponent;
  let fixture: ComponentFixture<QuestionTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
