class component {
    constructor(x, y, sizeX, sizeY, lambda, color, symbol) {
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.lambda = lambda;
        this.color = color;
        this.symbol = symbol;
    }


    getPosition() {
        return [this.x, this.y];
    }

    getSize() {
        return [this.sizeX, this.sizeY];
    }

    getLambda() {
        return this.lambda;
    }

    getColor() {
        return this.color;
    }

    getSymbol() {
        return this.symbol;
    }

}