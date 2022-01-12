import { Injectable } from '@angular/core';
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import {environment} from "../../environments/environment";


const fpPromise = FingerprintJS.load({
  token: environment.fingerPrintToken
})


@Injectable({
  providedIn: 'root'
})
export class FingerPrintService {
  private _fingerPrint: string;

  constructor() {
    fpPromise.then(fp => fp.get())
      .then(result => {
        this._fingerPrint = result.visitorId
      })
  }

  getFingerPrint(): string {
    return this._fingerPrint;
  }
}
