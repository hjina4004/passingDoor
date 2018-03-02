import {FormGroup} from '@angular/forms';

export class PasswordValidator {
   static isMatching(group: FormGroup){
    var firstPassword = group.controls['password'].value;
    var secondPassword = group.controls['password_confirm'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      return { "pw_mismatch": true };
    } else{
      return null;
    }
  }
}
