class Racer {
    constructor(id, startCell) {
        this.id = id
        this.route = []
        this.path = []

        this.endCell = undefined

        this.driveTime = 0

        this.startCell = startCell

        this.objectiveFuntion = -5000

    }

    generateStartingRoute(startingRouteLength) {
        for (let i=0;i<startingRouteLength;i++) {
            this.route.push(Math.floor(Math.random() * 8))
        }
    }

    simulateRoute() {
        let currentCell = this.startCell
        let lastCell = this.startCell

        this.path = [currentCell]

        let angleFactor = 1

        for (let i=0; i<this.route.length; i++) {
            if (this.route[i] == 1 || this.route[1] == 3 || this.route[i] == 5 || this.route[i] == 7) {angleFactor = Math.sqrt(2)} else {angleFactor = 1}

            let newX = currentCell.getPosition()[0] + getDirectionVector(this.route[i])[0]
            let newY = currentCell.getPosition()[1] + getDirectionVector(this.route[i])[1]

            //catch border exceptions
            if (newX < 0) {newX = 0}
            if (newY < 0) {newY = 0}
            if (newX > myField.getSize()[0]-1) {newX = myField.getSize()[0]-1}
            if (newY > myField.getSize()[1]-1) {newY = myField.getSize()[1]-1}

            currentCell = myField.fieldArray[newX][newY]

            let addedDriveTime = (lastCell.getSize()/2 * (1/lastCell.getLambda()) + currentCell.getSize()/2 * (1/currentCell.getLambda())) * angleFactor
            //this.driveTime += (lastCell.getSize()/2 * (1/lastCell.getLambda()) + currentCell.getSize()/2 * (1/currentCell.getLambda())) * angleFactor
            if (lastCell.getLambda() >= 100 || currentCell.getLambda() >= 100) { addedDriveTime = addedDriveTime/2}
            if (lastCell.getLambda() >= 100 && currentCell.getLambda() >= 100) { addedDriveTime = 0}

            this.driveTime += addedDriveTime

            this.path.push(currentCell)
        }
        //console.log([this.path, this.driveTime])
        this.endCell = currentCell

        return [this.path, this.driveTime]
    }

    checkForArrivalOnGoalCell(goalX, goalY) {
        if (this.endCell.getPosition()[0] == goalY && this.endCell.getPosition()[1] == goalY) {
            return true
        } else {
            return false
        }
    }

    calculateObjectiveFunction() {
        let distanceToGoal = this.endCell.getEstimatedDistanceToEndPoint()

        let goalFlag = distanceToGoal == 0

        // big M=1000
        if (this.driveTime > 0) {
            this.objectiveFuntion = -distanceToGoal + 1000*goalFlag / this.driveTime
        } else {
            this.objectiveFuntion = -distanceToGoal
        }
    }

    //GET / SET

    getObjectiveFunction() {
        return this.objectiveFuntion
    }

    getData() {
        return [this.id, this.startCell, this.route]
    }

    setData(id, startCell, route) {
        this.id = id
        this.startCell = startCell
        this.route = route
    }

    setId(id) {
        this.id = id
    }

    //GUI
    highlightPath() {
        for (let i=0; i<this.path.length; i++) {
            this.path[i].toggleHighlight([255,0,0], true, false)
        }
    }



}