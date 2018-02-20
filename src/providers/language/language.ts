import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanguageProvider {

  mainTitle: string = '<br><br><br><br><center><h1>족보와 기출문제로<br>슬기로운 공부~~</h1></center>';

  constructor(public http: HttpClient) {
    console.log('Hello LanguageProvider Provider');
  }

}
