export interface AuthLoginPayload {
  username: string
  password: string
}

export interface AuthLoginResponse {
  token: string;
}

export interface DeleteAccountPayload {
  username: string
  notes: string
  password: string
}
