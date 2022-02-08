import {AbstractEntity} from "../abstract-entity";
import {Role} from "../enum/role";
import {City} from "../enum/city";

export interface User extends AbstractEntity {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: Role;
  city: City;
}
