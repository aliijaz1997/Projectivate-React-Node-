export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  displayName?: string;
}
export interface Register {
  email: string;
  userId: string;
}

export interface LoginResponse {
  jwtToken: string;
  payload: Payload;
}

interface Payload {
  sub: string;
  email_verified: boolean;
  iss: string;
  "cognito:username": string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}

export interface Forget {
  id: string;
  username: string;
}

export interface ForgetForm {
  email: string;
}

export interface ConfirmationForm {
  username: string;
  code: string;
}
export interface ConfirmCodeForm {
  code: string;
  username: string;
  newPassword: string;
}
