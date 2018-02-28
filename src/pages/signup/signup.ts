import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar } from 'ionic-angular';
import { User } from '../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { GlobalFunction } from '../../providers/global-function';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild(Navbar) navBar: Navbar;

  user: FormGroup;

  constructor(
    private translate: TranslateService,
    private afAuth: AngularFireAuth,
    private globalFunction: GlobalFunction
  ) {
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, this.email_check()]),
      nickname: new FormControl('', [Validators.required, this.nickname_check()]),
      password: new FormControl('', [Validators.required, this.password_check()]),
      password_confirm: new FormControl('', [Validators.required, this.password_confirm_check()]),
      agreeTotal: new FormControl(undefined, [Validators.required]),
      agreeTermsOfUse: new FormControl(undefined, [Validators.required]),
      agreePrivacyPolicy: new FormControl(undefined, [Validators.required])
    }, {validator: this.checkCheckbox});
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {this.globalFunction.moveBack();}
  }

  updateAgree(item) {
    if (item == 1) {
      if (this.user.get('agreeTermsOfUse').value) {
        if (this.user.get('agreePrivacyPolicy').value)  this.user.get('agreeTotal').setValue(true);
      } else {
        this.user.get('agreeTotal').setValue(false);
      }
    } else if (item == 2) {
      if (this.user.get('agreePrivacyPolicy').value) {
        if (this.user.get('agreeTermsOfUse').value)  this.user.get('agreeTotal').setValue(true);
      } else {
        this.user.get('agreeTotal').setValue(false);
      }
    } else {
      if (this.user.get('agreeTotal').value) {
        this.user.get('agreeTermsOfUse').setValue(true);
        this.user.get('agreePrivacyPolicy').setValue(true);
      } else {
        this.user.get('agreeTermsOfUse').setValue(false);
        this.user.get('agreePrivacyPolicy').setValue(false);
      }
    }
  }

  checkCheckbox(c: AbstractControl){
    if(c.get('agreeTotal').value == false){
      return false;
    }
    else
      return true;
  }

  view_agree() {
  }

  onSubmit(info) {
    console.log("onSubmit", info);
  }

  email_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var re = new RegExp("^(\\d+)$");
      let input = control.value;
      let isValid = re.test(input);
      if (!isValid)
        return { 'email_check': {isValid} };
      else
        return null;
    };
  }

  nickname_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var re = new RegExp("^(\\d+)$");
      let input = control.value;
      let isValid = re.test(input);
      if (!isValid)
        return { 'nickname_check': {isValid} };
      else
        return null;
    };
  }

  password_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var re = new RegExp("^(\\d+)$");
      let input = control.value;
      let isValid = re.test(input);
      if (!isValid)
        return { 'password_check': {isValid} };
      else
        return null;
    };
  }

  password_confirm_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var re = new RegExp("^(\\d+)$");
      let input = control.value;
      let isValid = re.test(input);
      console.log(isValid);
      if (!isValid)
        return { 'password_confirm_check': {isValid} }
      else
        return null;
    };
  }
}
