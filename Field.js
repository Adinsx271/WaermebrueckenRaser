class Field {

    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.fieldArray = [];
        this.initializeField()

        this.goalCell = [];
    }

    getDataForCoordinates(x, y) {
        this.fieldArray[x][y].getCellData();
    }

    getSize() {
        return [this.sizeX, this.sizeY];
    }

    getCell(x,y) {
        return this.fieldArray[x][y];
    }

    initializeField() {
        for (var i = 0; i < this.sizeY; i++) {
            this.fieldArray.push([]);
            for (var j = 0; j < this.sizeX; j++) {
                this.fieldArray[i].push([]);
                this.fieldArray[i][j] = new Cell([220,220,255], [i, j],"A");
            }
        }
    }
    
    displayField() {
        for (var i = 0; i < this.sizeY; i++) {
            for (var j = 0; j < this.sizeX; j++) {
                this.fieldArray[i][j].displayCell();
            }
        }
    }

    calcAllGlobalPositions() {
        for (var i = 0; i < this.sizeY; i++) {
            for (var j = 0; j < this.sizeX; j++) {
                this.fieldArray[i][j].calcGlobalPosition();
            }
        }
    }

    implementComponent(component) {
        for (var i=component.getPosition()[1]; i < component.getPosition()[1]+component.getSize()[1]; i++) {
            for (var j = component.getPosition()[0]; j < component.getPosition()[0]+component.getSize()[0]; j++) {
                this.fieldArray[i][j].changeCellWithComponent(component);
            }
        }
    }

    estimateDistanceToEndPoint() {
        for (var i = 0; i < this.sizeY; i++) {
            for (var j = 0; j < this.sizeX; j++) {
                this.fieldArray[i][j].setEstimatedDistanceToEndPoint(Math.sqrt((this.sizeY-1-i)*(this.sizeY-1-i)+(this.sizeX-1-j)*(this.sizeX-1-j)));
            }
        }
    }

    findAllNeighborCells(cell) {
        var neighbors = [];
        var cellPosition = cell.getPosition()
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (!(i == 0 && j == 0)) {
                    if (cellPosition[0] + i >= 0 && cellPosition[0] + i < this.sizeY && cellPosition[1] + j >= 0 && cellPosition[1] + j < this.sizeX) {
                        neighbors.push(this.fieldArray[cellPosition[0] + i][cellPosition[1]+j]);
                    }
                }
            }
        }
        return neighbors;
    }

    setGoalCell(cell) {
        this.goalCell = cell;
    }

    resetHighlights() {
        for (var i = 0; i < this.sizeY; i++) {
            for (var j = 0; j < this.sizeX; j++) {
                this.fieldArray[i][j].toggleHighlight([0,0,0], false, true)
            }
        }
    }

    getAllCellsOfMatchingSymbol(symbol) {
        let cellList = []
        for (var i = 0; i < this.sizeY; i++) {
            for (var j = 0; j < this.sizeX; j++) {
                if (this.fieldArray[i][j].symbol == symbol) {
                    cellList.push(this.fieldArray[i][j])
                }
            }
        }
        return cellList;
    }

    
}
