import {Component, OnInit} from '@angular/core';
import {PlayerStatusModel} from "../../core/models/playerStatus.model";
import {SocketService} from "../../core/services/socket.service";

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

  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    const _this = this;

    let statusSocket = new WebSocket("ws://178.154.221.12:9092/api/v1/status");
    let controlSocket = new WebSocket(`ws://178.154.221.12:9092/api/v1/control?token=${window.localStorage['jwtToken']}`);

    statusSocket.onmessage = function (event) {
      _this.currentStatus = JSON.parse(event.data);
    };
  }
}
