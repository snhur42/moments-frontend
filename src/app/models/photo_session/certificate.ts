import {PhotoSession} from "./photo-session";
import {AbstractEntity} from "../abstract-entity";

export interface Certificate extends AbstractEntity{
  certificateNumber: string;
  photoSession: PhotoSession
}
