import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Forge from 'node-forge';

const publicKey = environment.publicKey;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = Forge.pki.publicKeyFromPem(publicKey);
    return btoa(rsa.encrypt(valueToEncrypt.toString()));
  }
}
