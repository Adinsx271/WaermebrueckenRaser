class material {
    constructor(name, color, symbol, lambda) {
        this.name = name
        this.color = color;
        this.symbol = symbol;
        this.lambda = lambda;
    }

    getColor() {
        return this.color;
    }

    getSymbol() {
        return this.symbol;
    }

    getLambda() {
        return this.lambda;
    }
}

function createDefaultMaterials() {
    var defaultMaterials = [];

    var Holz = new material("Holz", [76,47,38], "H", 0.130);

    var Stahl = new material("Stahl", [50,50,50], "M", 50.000);
    var Alu = new material("Alu", [210,210,210], "M", 160.000);

    var EPS = new material("EPS", [240,240,240], "E", 0.035);

    var Bitumen =new material("Bitumen", [0,0,0], "B", 0.16);

    var Beton = new material("Beton", [129,132,121], "C", 2.100);

    var Innenluft = new material("Innenluft", [240,240,255], "I", 1000); 
    var Aussenluft = new material("Aussenluft", [220,220,255],"A", 1000); //default Material for all preexisting cells 

    defaultMaterials.push(Holz);
    defaultMaterials.push(Stahl);
    defaultMaterials.push(Alu);
    defaultMaterials.push(EPS);
    defaultMaterials.push(Bitumen);
    defaultMaterials.push(Beton);
    defaultMaterials.push(Innenluft);
    defaultMaterials.push(Aussenluft);

    return defaultMaterials;

}

function getMaterialByName(name) {
    for (var i = 0; i < materialList.length; i++) {
        if (materialList[i].name == name) {
            return materialList[i];
        }
    }
}