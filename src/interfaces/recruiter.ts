export interface IRecruiterCreateRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
}

export interface IRecruiterCreateResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  created_at: Date;
  token: string;
}

export interface IRecruiterLoginRequest {
  email: string;
  password: string;
}

export interface IRecruiterLoginResponse {
  token: string;
}

export interface IRecruiter {
  id: string;
  email: string;
  company: string;
  created_at: Date;
}
