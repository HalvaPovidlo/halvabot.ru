import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.less']
})
export class ScoresComponent {
  @Output()
  scoreEvent = new EventEmitter<string>();
  currentButton: number | undefined;

  handleClick(index: number) {
    this.currentButton = index;
    this.scoreEvent.emit(index.toString());
  }
}
