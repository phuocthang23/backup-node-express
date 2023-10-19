export interface User {
  id: number;
  password: string;
  Repassword: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  role: string;
  avatar: string;
  status: boolean;
}
export interface Discount {
  id: number;
  name: string;
  price: number;
  description: string;
  number: number;
}

export interface Product {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  purchased?: number;
  images?: Array<{ id: number; url: string }>;
  capacity?: Array<{ id: number; name: string; price: number }>;
  provider?: string;
  category?: string;
  stock?: number;
  quantity?: number;
  feedback?: Array<{ comment: string; rating: number }>;
  totalRating?: number;
}

export interface HeaderLogin {
  heading: string;
}

// export interface Users {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   gender: string;
//   phone: number;
//   address: string;
//   cart: any[];
//   discount: any[];
//   role: string;
//   avatar: string;
//   status: boolean;
// }
