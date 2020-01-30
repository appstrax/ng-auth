export interface ResetPasswordRequest {
  resetCode: string;
  email: string;
  newPassword: string;
}
