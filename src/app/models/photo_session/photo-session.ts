import {AbstractEntity} from '../abstract-entity';
import {PhotoSessionType} from '../enum/photo-session-type';
import {PhotoSessionStatus} from '../enum/photo-session-status';
import {Duration} from '../enum/duration';

export interface PhotoSession extends AbstractEntity {
  managerId: string;
  clientId: string;
  photographerId: string;

  allPhotos: string[];
  finalPhotos: string[];

  chatId: string;

  photoSessionType: PhotoSessionType;
  status: PhotoSessionStatus;
  duration: Duration;
  location: string;

  price: number;

  certificateId?: string;

  brief: string[];

  willHappenAt: Date;

}
