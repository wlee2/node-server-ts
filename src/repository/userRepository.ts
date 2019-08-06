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
  constructor() {
    this.address = null;
    this.name = null;
    this.email = null;
    this.picture = null;
  }
  email: string;
  name: string;
  address: string;
  picture: string;
}
