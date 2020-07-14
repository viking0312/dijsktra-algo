import { Component, OnInit, Input } from "@angular/core";
import { NodeService } from "../node.service";

@Component({
  selector: "app-node",
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
  @Input() data = {
    col: 0,
    row: 0,
    isStart: false,
    isFinish: false,
    distance: 0,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
  extraClassName: any;

  constructor(public ns: NodeService) {}

  ngOnInit() {
    this.extraClassName = this.data.isFinish
      ? "node-finish"
      : this.data.isStart
      ? "node-start"
      : this.data.isWall
      ? "node-wall"
      : "";
  }
}
