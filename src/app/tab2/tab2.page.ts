import {Component, ViewChild} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tasks = [];
  currentDate: string;
  myTask = '';
  //Cette variable va servir de condition d'affichage dans le HTML
  addTask: boolean;
  today = new Date();

  constructor(public afDB: AngularFireDatabase) {
    this.today = new Date();
    this.currentDate = this.today.toLocaleDateString('fr-FR');
    this.getTasks();
  }
  //Permet de changer la valeur de la variable addTask
  showForm(): void {
    this.addTask = !this.addTask;
    //Réinitialisation de la variable addTask
    this.myTask = '';
  }

  //Ajout de la tâche à la base de données
  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: moment().format('DD/MM/YYYY'),
      checked: false
    });
    //La fonction showForm() permet d'afficher ou de cacher le formulaire d'envoi
    this.showForm();
  }

  //Permet de parcourir la base firebase Tasks/ et récupère les informations des tâches
  public getTasks(): void {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      console.log(actions);
      actions.forEach(action => {
        console.log(action.payload.exportVal());
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          date: action.payload.exportVal().date,
          checked: action.payload.exportVal().checked
        });
      });
    });
  }
  changeCheckState(ev: any): void {
    console.log('checked: ' + ev.checked);
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }
  deleteTask(task: any): void {
    this.afDB.list('Tasks/').remove(task.key);
  }
}

