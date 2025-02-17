function setup() {
    var can = createCanvas(800,800);
    can.parent('sketch-holder');
    background(180);

     //Setup 
     materialList = createDefaultMaterials();
    
     myField = new Field(100,100);
     myField.calcAllGlobalPositions()
     myField.estimateDistanceToEndPoint()


 
     componentList = [];
 
     //load Components
     componentList.push(new component(10,5,51,1,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));   
     componentList.push(new component(60,6,1,49,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));   
     componentList.push(new component(61,54,39,1,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));   
     
     componentList.push(new component(10,6,50,3,getMaterialByName("Holz").getLambda(), getMaterialByName("Holz").getColor(), getMaterialByName("Holz").getSymbol()));   
     
     componentList.push(new component(10,9,20,91,getMaterialByName("EPS").getLambda(), getMaterialByName("EPS").getColor(), getMaterialByName("EPS").getSymbol()));   
     componentList.push(new component(30,9,20,16,getMaterialByName("EPS").getLambda(), getMaterialByName("EPS").getColor(), getMaterialByName("EPS").getSymbol()));   
     componentList.push(new component(50,9,10,46,getMaterialByName("EPS").getLambda(), getMaterialByName("EPS").getColor(), getMaterialByName("EPS").getSymbol()));   
     componentList.push(new component(50,55,50,20,getMaterialByName("EPS").getLambda(), getMaterialByName("EPS").getColor(), getMaterialByName("EPS").getSymbol()));   
 
     componentList.push(new component(30,25,20,75,getMaterialByName("Beton").getLambda(), getMaterialByName("Beton").getColor(), getMaterialByName("Beton").getSymbol()));   
     componentList.push(new component(50,75,50,20,getMaterialByName("Beton").getLambda(), getMaterialByName("Beton").getColor(), getMaterialByName("Beton").getSymbol()));   
 
      componentList.push(new component(50,95,50,5,getMaterialByName("Innenluft").getLambda(), getMaterialByName("Innenluft").getColor(), getMaterialByName("Innenluft").getSymbol()));   
     
 
      //componentList.push(new component(20,50,50,5,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));
      //componentList.push(new component(80,50,5,30,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));
      //componentList.push(new component(20,5,5,45,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));
      //componentList.push(new component(0,20,20,5,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));
      //componentList.push(new component(70,50,30,5,getMaterialByName("Bitumen").getLambda(), getMaterialByName("Bitumen").getColor(), getMaterialByName("Bitumen").getSymbol()));
 
 
     for (var i = 0; i < componentList.length; i++) {
         myField.implementComponent(componentList[i]);
     }
     myField.displayField();

     //Initial Racer Produktion
     myRacers = []
     startFromStartCell(myField.fieldArray[0][0], 64)

     myField.displayField()

     maxIterations = 100000
     //functions in "RacerProduction.js"
     for (let iterations = 0; iterations < maxIterations; iterations++) {
        sortRacers(myRacers)
        cullRacers(myRacers)

        assignMatingPartners()

        assignNewIDs()
     }

     for (let i = 0; i < myRacers.length; i++) {
        myRacers[i].highlightPath()
     }
     myField.displayField()

}

function draw() {
    
}

function startFromStartCell(startCell, numOfRacers) {
    for (let i = 0; i < numOfRacers; i++) {
        myRacers.push(new Racer(i, startCell))
        myRacers[i].generateStartingRoute(20)
        myRacers[i].simulateRoute()
        myRacers[i].calculateObjectiveFunction()
     }
}