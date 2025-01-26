export type LoginInput = {
  email: string;
  password: string;
};
export type SignupInput = {
  name: string;
} & LoginInput;
