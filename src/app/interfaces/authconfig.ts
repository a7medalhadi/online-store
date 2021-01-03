export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    phone: string;
    address:string;
    gender:string;
    verified:boolean;
    exp: number;
    iat: number;
  }
  
  export interface TokenResponse {
    token: string;
  }
  
  export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
    phone: string;
    address:string;
    gender:string;
  }

  export interface LogLoad {
    email: string;
    password: string;
  }