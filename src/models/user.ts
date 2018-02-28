export interface User {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  agreeTotal: boolean;
  agreeTermsOfUse: boolean;
  agreePrivacyPolicy: boolean;
}
