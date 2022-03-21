import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';

  const firebaseConfig = {
    apiKey: 'AIzaSyCZegcmmxDf_iZO0zSHEax5EXkBnLJcBpI',
    authDomain: 'todolist-68895.firebaseapp.com',
    databaseURL: 'https://todolist-68895-default-rtdb.firebaseio.com',
    projectId: 'todolist-68895',
    storageBucket: 'todolist-68895.appspot.com',
    messagingSenderId: '535640971003',
    appId: '1:535640971003:web:0fe46c657c13fe5775025e'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
