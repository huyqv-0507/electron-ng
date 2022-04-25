import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '../services/app.consts';
import { AppControls } from '../services/app.controls';
import { AppService } from '../services/app.service';
import { SerialPortService } from '../services/serial-port.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  control: any
  controlDefault: boolean = true
  user: {
    FullName:string,
    FilePath:string,
    AccountID:string,
    UserName:string,
    RoleID:string,
    RoleName:string,
    UnitID:string
  } | null = null;

  menu: any;
  listSerialPorts: any
  port: any
  constructor(
    private appService: AppService,
    private appControls: AppControls,
    private router: Router,
    private serialPortService: SerialPortService) { }

  async ngOnInit(): Promise<void> {
    // await this.getControl()
    // this.getMenu();
    this.listSerialPorts = await this.serialPortService.listSerialPorts()
    this.port = await this.serialPortService.connectPort()
    console.log(this.port)
    await this.serialPortService.writePort(this.port, 'hello ae')
    this.port.on('data', function (data: any) {
      console.log('Dataa:', data)
    })
  }
  async getControl() {
    if (this.user) {
      this.control = await this.appControls.getControls(this.user.RoleID, AppConsts.page.main);
      this.controlDefault = false;
    }
  }

  async getMenu() {
    const dataRequest = {
      AccountID: this.user?.AccountID,
    };
    const result: any = await this.appService.doGET('/api/Page/GetMenuMb', dataRequest);
    if (result && result.Status === 1) {
      // this.router.navigate([AppConsts.page.socialNetwork]);
      this.menu = result.Data;
    } else {
      console.log(result.Msg)
    }
  }
  testRoute() {
    this.router.navigate([AppConsts.page.login])
  }
}
