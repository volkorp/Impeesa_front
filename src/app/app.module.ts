import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button'

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api

import {KnobModule} from 'primeng/knob';

import { FormsModule } from "@angular/forms";
import {AvatarModule} from 'primeng/avatar';

import { HttpClientModule } from '@angular/common/http';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AccordionModule,
    BrowserModule,
    BrowserAnimationsModule,    
    ButtonModule,
    CardModule,
    KnobModule,
    FormsModule,
    AvatarModule,
    HttpClientModule,
    InputNumberModule,
    DropdownModule,
    PasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
