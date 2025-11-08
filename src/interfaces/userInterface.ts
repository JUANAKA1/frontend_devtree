export interface IUser {
  _id: string;
  handle: string;
  name: string;
  email: string;
  description: string;
  image: string;
  links: string;
}
export type UserHandle = Pick<
  IUser,
  "description" | "handle" | "name" | "image" | "links"
>;

export interface RegisterForm extends Pick<IUser, "handle" | "email" | "name"> {
  password: string;
  password_confirmation: string;
}

export interface LoginForm extends Pick<IUser, "email"> {
  password: string;
}

export type ProfileForm = Pick<IUser, "handle" | "description">;
