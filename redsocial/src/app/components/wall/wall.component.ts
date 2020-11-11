import { Component, OnInit } from '@angular/core';
import { WallService } from "../../services/wall.service";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {

  wall = [];

  constructor(private wallService: WallService) { }

  ngOnInit() {
    this.wallService.getWall()
      .subscribe(res => {
        console.log(res)
        this.wall = res;
    },
    err => console.log(err))
  }

}
