import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, ReactiveFormsModule, CommonModule, DragDropModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  todoTask!: FormGroup;
  required: any;
  touched: any;

  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  completed: ITask[] = [];

  editStatus: boolean = false;
  taskEditIndex!: any;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {

    this.todoTask = this.fb.group({
      'task_name': ['', Validators.required]
    })

  }

  addTask() {
    this.tasks.push({
      description: this.todoTask.value.task_name,
      status: false
    });
    this.todoTask.reset();

    console.log(this.todoTask.value.task_name);

  }

  // Delete

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteIPTask(i: number) {
    this.inProgress.splice(i, 1);
  }

  deleteCompletedTask(i: number) {
    this.completed.splice(i, 1);
  }

  // Edit

  editIPTask(item: ITask, i: number) {


    this.todoTask.controls['task_name'].setValue(item.description)
    this.taskEditIndex = i;
    this.editStatus = true

  }

  // updateTask
  updateTask() {
    this.tasks[this.taskEditIndex].description = this.todoTask.value.task_name;
    this.tasks[this.taskEditIndex].status = this.todoTask.value.task_name;
    this.todoTask.reset();
    this.editStatus = false;

    this.taskEditIndex = undefined;

  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  resetTodoTask() {
    this.todoTask.reset();
    this.editStatus = false;
  }


}
