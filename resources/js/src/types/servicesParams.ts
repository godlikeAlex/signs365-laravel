export interface EditProfileParams {
  name: string;
  email: string;
  avatar?: any;
  preview: string;
}

export interface ResetPasswordParams {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}
