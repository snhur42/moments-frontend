import {AbstractEntity} from '../abstract-entity';

export interface Certificate extends AbstractEntity {
  certificateNumber: string;
  photoSessionId: string;
}
