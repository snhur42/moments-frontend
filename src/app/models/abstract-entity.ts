import {Data} from '@angular/router';

export interface AbstractEntity {
  id: string;
  created: Data;
  modified: Date;
}
