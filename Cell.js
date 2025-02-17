class Cell{
    
    constructor(color, position, symbol) {
        this.x = position[0]; //only here for debugging
        this.y = position[1];
        this.position = position;
        this.lambda = 1000; //a value over 100 here means perfect Energy transmission
        this.size = 1; //1x1cm
        this.color = color;
        this.symbol = symbol // A = Außen, I = Innen, alle anderen Zeichen frei

        this.globalPosition = [0,0]
        this.globalSize = [1,1];

        this.highlighted = false;
        this.highlightColor = [0, 255, 0];

        //Pathfinding variables
        this.estimatedDistanceToEndPoint = 100000; //very high Value for Initialisation of Pathfinding


    }

    //get/set Data
    getCellData() {
        return [this.lambda, this.size, this.color, this.position, this.symbol];
    }

    //gets the position in the fieldArray
    getPosition() {
        return this.position;
    }

    getGlobalPosition() {
        return this.globalPosition;
    }

    getGlobalSizes() {
        return this.globalSize;
    }
    //berechnet den R-Wert durch die halbe Zelle (in meter)
    getResistance() {
        return (this.size / 2*100) / this.lambda 
    }

    getSize() {
        return this.size;
    }

    getLambda() {
        return this.lambda
    }

    getSymbol() {
        return this.symbol
    }

    

    //Gui Functions
    displayCell() {
        stroke([0,0,0]);
        strokeWeight(1);
        textSize(this.globalSize[0]/3);
        fill(this.color[0], this.color[1], this.color[2]);
        rect(this.globalPosition[0], this.globalPosition[1], this.globalSize[0], this.globalSize[1]);
        

        if (this.highlighted) {
            fill(this.highlightColor[0], this.highlightColor[1], this.highlightColor[2]);
            rect(this.globalPosition[0]+0.2*this.globalSize[0], this.globalPosition[1]+0.2*this.globalSize[1], 0.6*this.globalSize[0], 0.6*this.globalSize[1]);
        }
        textAlign(CENTER, CENTER);
        noFill();
        text(this.symbol, this.globalPosition[0]+this.globalSize[0]/2, this.globalPosition[1]+this.globalSize[1]/2);
       }

    toggleHighlight(highlightColor, onFlag = false, forceOff = false) {
        this.highlighted = !this.highlighted;
        if (highlightColor != undefined) {
            this.highlightColor = highlightColor;
        }
        if (onFlag == true) {
            this.highlighted = true;
        }
        if (forceOff == true) {
            this.highlighted = false
        }
    }

    calcGlobalPosition() {
        this.globalPosition = [round((width/myField.getSize()[0])*this.position[1]), round((height/myField.getSize()[1])*this.position[0])]
        this.globalSize = [height/myField.getSize()[0], width/myField.getSize()[1]];
    }

    changeCellWithComponent(component) {
        this.lambda = component.getLambda();
        this.color = component.getColor();
        this.symbol = component.getSymbol();
    }

    //Pathfinding Functions


    setEstimatedDistanceToEndPoint(distance) {
        this.estimatedDistanceToEndPoint = distance;
    }

    getEstimatedDistanceToEndPoint() {
        return this.estimatedDistanceToEndPoint
    }

    //Debug Functions - delete Later
    changeColor(newColor) {
        this.color = newColor;
    }
}




function distanceBetweenCell(cell1, cell2) {
    return distance(cell1.getPosition()[0], cell1.getPosition()[1], cell2.getPosition()[0], cell2.getPosition()[1]);
}