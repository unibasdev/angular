export interface User {
  readonly id: number;
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly passwordHash: string;
  token?: string;
}

