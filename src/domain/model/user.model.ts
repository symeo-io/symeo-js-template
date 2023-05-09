export class User {
  id: string;
  username: string;
  age: number;
  email: string;

  constructor(id: string, username: string, age: number, email: string) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.email = email;
  }
}
