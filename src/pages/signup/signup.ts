import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar } from 'ionic-angular';
import { User } from '../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password'

import { GlobalFunction } from '../../providers/global-function';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild(Navbar) navBar: Navbar;

  user: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: '이메일을 입력해 주세요.' },
      { type: 'email_check', message: '잘못된 이메일입니다.' },
      { type: 'validEmail', message: '이미 등록된 이메일입니다.' }
    ],
    'nickname': [
      { type: 'required', message: '닉네임을 입력해 주세요.' },
      { type: 'nickname_check', message: '4~12자로 입력해 주세요.' },
      { type: 'validEmail', message: '이미 사용중인 닉네임입니다.' }
    ],
    'password': [
      { type: 'required', message: '비밀번호를 입력해 주세요.' },
      { type: 'password_check', message: '영문 / 숫자 6~12자로 입력해 주세요.' }
    ],
    'password_confirm': [
      { type: 'required', message: '비밀번호 학인을 입력해 주세요.' }
    ],
    'isMatching': [
      { type: 'pw_mismatch', message: '비밀번호가 일치하지 않습니다.' }
    ]
  }

  constructor(
    private translate: TranslateService,
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private globalFunction: GlobalFunction
  ) {
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, this.email_check()]),
      nickname: new FormControl('', [Validators.required, this.nickname_check()]),
      password: new FormControl('', [Validators.required, this.password_check()]),
      password_confirm: new FormControl('', [Validators.required]),
      agreeTotal: new FormControl(false, [Validators.required, this.agreeTotal_check()]),
      agreeTermsOfUse: new FormControl(false, [Validators.required]),
      agreePrivacyPolicy: new FormControl(false, [Validators.required])
    }, (formGroup: FormGroup) => { return PasswordValidator.isMatching(formGroup); });
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

  view_agree() {
    console.log(this.user.errors);
  }

  onSubmit(info) {
    console.log("onSubmit", info);
    const email = info.get('email').value;
    const password = info.get('password').value;

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Success!', value);
      this.registerProfile(value);
    })
    .catch(err => {
      // code: "auth/email-already-in-use"
      console.log('Something went wrong:', err.message);
      console.log(err);
      if (err.code == "auth/email-already-in-use") {
        this.globalFunction.presentToast('이미 등록된 이메일입니다.', 3000);
      } else if (err.code == "auth/invalid-email") {
        this.globalFunction.presentToast('잘못된 이메일입니다.', 3000);
      } else {
        this.globalFunction.presentToast(err.message, 3000);
      }
    });
  }

  registerProfile(auth) {
    // let theItems = this.afDB.list('/profile' + '/' + auth.uid);
    // theItems.push({ nickname: this.user.get('nickname').value }).then((val) => {
    //   console.log('Item Saved.', val);
    //   this.globalFunction.moveRoot('WelcomePage',{});
    // });
    let user = this.afAuth.auth.currentUser;

    user.updateProfile({
      displayName: this.user.get('nickname').value,
      photoURL: null
    }).then((res) => {
      console.log('updateProfile', res);
      this.globalFunction.moveRoot('WelcomePage',{});
    }).catch((error) => {
      console.log('updateProfile error:', error);
    });
  }

  email_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
      let input = control.value;
      let pattern = re.test(input);
      if (!pattern)
        return { 'email_check': {pattern} };
      else
        return null;
    };
  }

  nickname_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var re = new RegExp("^[a-zA-Z가-힣@\\d]{4,12}$");
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
      var re = new RegExp("^[a-zA-Z\\d]{6,12}$");
      let input = control.value;
      let isValid = re.test(input);
      if (!isValid)
        return { 'password_check': {isValid} };
      else
        return null;
    };
  }

  agreeTotal_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let isValid : boolean = control.value;
      if (!isValid)
        return { 'agreeTotal_check': {isValid} };
      else
        return null;
    }
  }
}
