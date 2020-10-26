import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/interfaces/user.interface';
import { ApiService } from '../shared/services/api.service';
import { RolesEnum } from '../shared/enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  expertList: UserInterface[];

  constructor(
      private api: ApiService,
  ) { }

  getUserList(email?: string): Observable<UserInterface[]> {
    return this.api.getUserList(email);
  }
}
