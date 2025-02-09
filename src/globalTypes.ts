export interface ILinks {
  title: string;
  linkTo: string;
  icon: string;
  id: number;
}
export interface IAnimalsData {
  _uuid: string;
  name: string;
  description: string;
  priceUSD: string;
  stock: string;
  isPopular: boolean;
  _created: number;
  _modified: number;
  _data_type: string;
  _is_deleted: boolean;
  _self_link: string;
  _user: string;
  animal?: {
    isPopular: true;
    name: string;
    description: string;
    priceUSD: string;
    stock: string;
  };
  category?: {
    name: string;
    description: string;
  };
}
export interface ICategoryData {
  _uuid: string;
  name: string;
  description: string;
  priceUSD: string;
  stock: string;
  isPopular: boolean;
  _created: number;
  _modified: number;
  _data_type: string;
  _is_deleted: boolean;
  _self_link: string;
  _user: string;
}
