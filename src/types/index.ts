import { CountryCode } from 'libphonenumber-js';

export interface PeopleTypes {
  gender: string;
  phone: string;
  nat: CountryCode;
  email: string;
  dob: DobType;
  name: string | NameTypes;
  cell: string;
  id: IdType;
  login: LoginType;
  nationality: NationalityType;
  picture: PictureType;
  registred: RegistredType;
  location: LocationType;
}

export interface NameTypes {
  title: string;
  first: string;
  last: string;
}

export interface IdType {
  name: string;
  value: string;
}

export interface LocationType {
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: CoordinatesType;
  street: StreetType;
  timezone: TimezoneType;
}

export interface CoordinatesType {
  longitude: string;
  latitude: string;
}

export interface StreetType {
  number: number;
  name: string;
}

export interface TimezoneType {
  offset: string;
  description: string;
}

export interface RegistredType {
  age: number;
  date: string;
}

export interface DobType {
  age: number;
  date: string;
}

export interface PictureType {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface NationalityType {
  name: string;
  color: string;
}

export interface LoginType {
  uuid: string;
  md5: string;
  password: string;
  salt: string;
  sha1: string;
  sha256: string;
  username: string;
}

export enum PEOPLE_ACTIONS_TYPES {
  SET_PEOPLE,
  SET_ERROR,
  FILTER_BY_NAME,
  SET_SELECTED_NATIONALITY,
  SET_SELECTED_GENDER,
  CLEAR_FORM,
  CLEAR_DATA,
}
