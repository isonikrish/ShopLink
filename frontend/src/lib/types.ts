export type LoginInput = {
  email: string;
  password: string;
};
export type SignupInput = {
  name: string;
} & LoginInput;
export type User = {
  id: number,
  name: string,
  email: string
  
}

export type createShop= {
  name: string,
  currency: string
}
export type Shop= {
  id: number,
  ownerId: number,
  owner: User,
} & createShop

export type userStore = {
  user: User | null,
  fetchUser: () => void,
  logout: ()=> void,
  signup: (formData: SignupInput) => void,
  login: (formData: LoginInput) => void,
}

export type shopStore = {
  createShop: (formData: createShop) => void,
  fetchMyShops: () => Promise<Shop[]>
}
