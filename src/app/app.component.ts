import { Component, OnInit } from "@angular/core";
import { NodeService } from "./node.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "pathFinder";
  grid = [];
  mouseIsPressed = false;

  START_NODE_ROW = 10;
  START_NODE_COL = 15;
  FINISH_NODE_ROW = 10;
  FINISH_NODE_COL = 35;

  constructor(public ns: NodeService) {}

  ngOnInit() {
    this.grid = this.getInitialGrid();
  }

  getInitialGrid = () => {
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createNode(col, row));
      }
      this.grid.push(currentRow);
    }
    //  this.ns.gridNodes = this.grid;
    return this.grid;
  };

  createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === this.START_NODE_ROW && col === this.START_NODE_COL,
      isFinish: row === this.FINISH_NODE_ROW && col === this.FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  visualizeDijkstra() {
    const startNode = this.grid[this.START_NODE_ROW][this.START_NODE_COL];
    const finishNode = this.grid[this.FINISH_NODE_ROW][this.FINISH_NODE_COL];
    const visitedNodesInOrder = this.ns.dijkstra(
      this.grid,
      startNode,
      finishNode
    );
    const nodesInShortestPathOrder = this.ns.getNodesInShortestPathOrder(
      finishNode
    );
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  getNewGridWithWallToggled = (row, col) => {
    //const newGrid = grid.slice();
    const node = this.grid[row][col];
    this.grid[row][col] = {
      ...node,
      isWall: !node.isWall,
    };
  };

  handleMouseDown(row, col) {
    console.log("mouse was pressed" + row + col);
    this.getNewGridWithWallToggled(row, col);
    this.mouseIsPressed = true;
  }

  handleMouseEnter(row, col) {
    if (!this.mouseIsPressed) return;
    console.log("mouse was entered" + row + col);
    this.getNewGridWithWallToggled(row, col);
  }

  handleMouseUp() {
    console.log("mouse was taken away");
    this.mouseIsPressed = false;
  }
}
