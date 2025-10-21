interface IUserRegister {
  fullName: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export { IUserRegister, IUserLogin };
