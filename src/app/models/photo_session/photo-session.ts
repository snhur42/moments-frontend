import {AbstractEntity} from "../abstract-entity";
import {Manager} from "../user/role/manager";
import {Client} from "../user/role/client";
import {Photographer} from "../user/role/photographer";
import {Chat} from "./chat";
import {Certificate} from "./certificate";

export interface PhotoSession extends AbstractEntity {
  manager: Manager
  client: Client
  photographer: Photographer

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
