export type LoginInput = {
  email: string;
  password: string;
};
export type SignupInput = {
  name: string;
} & LoginInput;
export type User = {
  id: number;
  name: string;
  email: string;
};

export type createShop = {
  name: string;
  currency: string;
};
export type Shop = {
  id: number;
  ownerId: number;
  owner: User;
  logo: any;
  theme: string | null;
  description: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  x_url: string | null;
  email: string | null;
  phone: number | null;
  address: string | null;
  createdAt: Date;
  updateAt: Date;
  categories: string[];
  products: any;
  variants: any;
} & createShop;

export type userStore = {
  user: User | null;
  fetchUser: () => void;
  logout: () => void;
  signup: (formData: SignupInput) => void;
  login: (formData: LoginInput) => void;
};

export type shopStore = {
  createShop: (formData: createShop) => void;
  fetchMyShops: () => Promise<Shop[]>;
  MyShop: Shop | null;
  setMyShop: (shop: Shop) => void;
  generalUpdateShop: (id: number, data: FormData) => void;
  contactUpdateShop: (id: number, data: any) => void;
  apperanceUpdateShop: (id: number, selectedTheme: string) => void;
  categoryUpdateShop: (id: number, category: string) => void;
};
export type productStore = {
  addNewProduct: (id:number, fromData: any) => Promise<any>;
  getProduct: (id:number | null) => Promise<any>;
}