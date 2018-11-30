import { Component, OnInit } from '@angular/core';
import { LbdataService } from '../lbdata.service';
import { IoUserInterface } from '../shared/sdk/models';

@Component({
  selector: 'app-user-connection',
  templateUrl: './user-connection.component.html',
  styleUrls: ['./user-connection.component.scss']
})
export class UserConnectionComponent implements OnInit {
  crtUser: IoUserInterface = {
    email: "",
    realm: ""
  };

  constructor(
    private lbdata: LbdataService
  ) { }

  ngOnInit() {
    this.crtUser = this.lbdata.getCrtUser();
  }

}
