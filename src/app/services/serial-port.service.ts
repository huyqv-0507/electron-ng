import { Injectable } from '@angular/core';
import SerialPort from 'serialport';


@Injectable({
  providedIn: 'root'
})
export class SerialPortService {

  serialport: typeof SerialPort | null = null
  constructor() {
      this.serialport = window.require('serialport');
  }
  async listSerialPorts() {
    if (this.serialport)
    {
      return await this.serialport['SerialPort'].list()
    }
    return []
  }
  async connectPort(path: string = "COM3") {
    let port: any = null
    if (this.serialport) {
      port = new this.serialport.SerialPort(
        {
          path: path,
          baudRate: 9600
        }, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
    return port
  }
  async writePort(port: any, data: any) {
    port.write(data, function(err: any) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written')
    })
  }
}