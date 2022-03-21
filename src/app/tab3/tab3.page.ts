import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import * as moment from 'moment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  currentDate: string;
  myTask = '';
  tasks = [];
  today = new Date();
  todoForm = new FormGroup({
    nametodo: new FormControl(''),
    datetodo: new FormControl((new Date()).toISOString().substring(0,10)),
  });

  constructor(public afDB: AngularFireDatabase) {
    this.today = new Date();
    this.currentDate = this.today.toLocaleDateString('fr-FR');

  }
  onSubmit() {
    this.afDB.list('Tasks/').push({
      text: this.todoForm.value.nametodo,
      date: moment(this.todoForm.value.datetodo).format('DD/MM/YYYY'),
      checked: false
    });
    console.log(this.todoForm.value);
  }
}
