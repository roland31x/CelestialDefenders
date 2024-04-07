import { Component, OnInit } from '@angular/core';
import { EngineService } from '../engine.service';
import { NgFor, NgIf } from '@angular/common';
import { Defender } from '../classes/defender';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {


    public selectedDefender : Defender | null = null;

    constructor(
      private engine: EngineService
    ) { }

    ngOnInit(){
      this.engine.SetLevel(window.location.pathname.split("/")[2]);
      console.log("Loaded level: " + this.engine.loadedLevel!.name);
    }

    get mapTiles(){
      return this.engine.loadedLevel!.hitboxmap.hitboxes;
    }

    get defenders(){
      return this.engine.Defenders;
    }

    SelectDefender(defender: Defender){
      if(this.selectedDefender == defender){
        this.selectedDefender = null;
      }
      else{
        this.selectedDefender = defender;
      }    
    }
}
