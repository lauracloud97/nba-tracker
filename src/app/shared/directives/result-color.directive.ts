import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Game } from '../models/game.model';

@Directive({
  selector: '[appResultColor]'
})
export class ResultColorDirective implements OnInit, OnChanges {

  @Input() public game: Game | undefined = undefined;
  @Input() public teamId: number = -1;

  constructor(private el: ElementRef) {}

  ngOnInit() : void {
    this.changeBackground();
  }

  ngOnChanges(changes: SimpleChanges) : void {
    if(changes['teamId'].currentValue != this.teamId){
      this.teamId = changes['teamId'].currentValue;
    }
    if(changes['game'].currentValue != this.game){
      this.game = changes['game'].currentValue;
    }
  }

  private changeBackground() : void {
    if(this.game){
      if(this.game.home_team.id == this.teamId)
        this.el.nativeElement.style.backgroundColor = this.game.home_team_score > this.game.visitor_team_score ? 'rgb(37 155 31)' : 'red';
      else
        this.el.nativeElement.style.backgroundColor = this.game.visitor_team_score > this.game.home_team_score ? 'rgb(37 155 31)' : 'red';
    }
  }

}
