import {Component, OnInit} from '@angular/core';
import {PlayerStatusModel} from "../../core/models/playerStatus.model";
import {SocketService} from "../../core/services/socket.service";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {JwtService} from "../../core/services/jwt.service";

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.less']
})
export class MusicComponent implements OnInit {
  playlists = [];
  public currentStatus: PlayerStatusModel = {
    current: {id: '', last_play: '0001-01-01T00:00:00Z'},
    error_message: "",
    is_error: false,
    length: 0,
    loop: false,
    position: 0,
    queue: [],
    radio: false
  };
  statusSocket: WebSocket;
  controlSocket: WebSocket;
  requestedSong = new FormControl('');

  constructor(private jwtService: JwtService) {
  }

  sendMessage(params: any) {
    this.controlSocket.send(JSON.stringify({
      ...params
    }));
  }

  handleClick(buttonType: string) {
    if(this.jwtService.getToken() == '' || this.jwtService.getToken() == undefined) {
      // call notification service
      return ;
    }
    if (buttonType == 'radio') {
      this.sendMessage(
        {type: this.currentStatus.radio ? 'radio_off' : 'radio'}
      )
    }
    if (buttonType == 'loop') {
      this.sendMessage(
        {type: this.currentStatus.loop ? 'loop_off' : 'loop'}
      )
    }
    if (buttonType == 'skip') {
      this.sendMessage(
        {type: 'skip'}
      )
    }
    if (buttonType == 'play') {
      this.sendMessage({
        type: 'play',
        query: this.requestedSong.value,
        service: 'youtube'
      })
      this.requestedSong.setValue('');
    }
    // if (buttonType == 'disconnect') {
    //   this.sendMessage({
    //     type: 'disconnect'
    //   })
    // }
  }

  ngOnInit(): void {
    const _this = this;

    this.statusSocket = new WebSocket("ws://178.154.221.12:9092/api/v1/status");
    if(this.jwtService.getToken() != '' && this.jwtService.getToken() != undefined) {
      this.controlSocket = new WebSocket(`ws://178.154.221.12:9092/api/v1/control?token=${window.localStorage['jwtToken']}`);
    }


    this.statusSocket.onmessage = function (event) {
      _this.currentStatus = JSON.parse(event.data);
    };
  }
}
