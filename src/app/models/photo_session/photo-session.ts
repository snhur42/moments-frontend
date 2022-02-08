import {AbstractEntity} from "../abstract-entity";
import {Chat} from "./chat";
import {Certificate} from "./certificate";
import {User} from "../user/user";

export interface PhotoSession extends AbstractEntity {
  manager: User
  client: User
  photographer: User

  allPhotos: string[]
  finalPhotos: string[]

  chat: Chat

  photoSessionType: string
  status: string
  duration: string
  location: string

  price: number

  certificate: Certificate

  brief: string[]

  willHappenAt: Date

}
