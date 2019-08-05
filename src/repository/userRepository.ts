export class UserRegisterDAO {
  constructor() {
    this.address = null;
    this.name = null;
    this.email = null;
    this.password = null;
  }
  email: string;

  name: string;
  address: string;
  password: string;
}

export class UserDTO {
  constructor() {}
  id: number;
  email: string;
  name: string;
  address: string;
}
