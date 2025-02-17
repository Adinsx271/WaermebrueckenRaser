function sortRacers(racerArray) {
    //sort with Bubble sort

    let n = racerArray.length

    let temp = undefined
    let swapped

    do {
        swapped = false
        for (var i = 0; i < n-1; i++) {
            if (racerArray[i].getObjectiveFunction() < racerArray[i+1].getObjectiveFunction()) {
                temp = racerArray[i+1]
                racerArray[i+1] = racerArray[i]
                racerArray[i] = temp
                swapped = true
            }
        }
        n--
    } while (swapped)

    return racerArray
}

function cullRacers(racerArray) {
    if (racerArray.length % 2 == 0) {
        racerArray.splice(racerArray.length/2)
    } else {
        racerArray.splice(Math.floor(racerArray.length)/2)
    }
}

function assignNewIDs() {
    for (let i = 0; i < myRacers.length; i++) {
        myRacers[i].setId(i)
    }
}

function createNewRacer(racer1, racer2) {
    let newRacer = undefined

    let startingCell = racer1.getData()[1]

    //determine StartingCell
    if (Math.random > 0.5) {startingCell = racer2.getData()[1]}

    const longerRouteLength = Math.max(racer1.getData()[2].length, racer2.getData()[2].length)
    
    //randomly Merge Routes
    let newRoute = []
    for (let i=0; i < longerRouteLength; i++) {
        if (i < racer1.getData()[2].length && i < racer2.getData()[2].legnth) {
            newRoute.push(Math.random() < 0.5 ? racer1.getData()[2][i] : racer2.getData()[2][i])
        } else {
            newRoute.push(racer1.getData()[2][i] !== undefined ? racer1.getData()[2][i] : racer2.getData()[2][i])
        }
    }


    let mutationRate = 0.05
    //mutate Route (longer/shorter)
    if (Math.random() < mutationRate) {
        newRoute.push(randi(0,7))
    }
    if (Math.random() < mutationRate) {
        newRoute.splice(randi(0, newRoute.length), 1)
    }

    //mutate Route (point mutation)
    if (Math.random() < mutationRate) {
        newRoute[randi(0, newRoute.length)] = randi(0,7)
    }

    //set Data in new Racer
    let newId = 99

    newRacer = new Racer(-1, undefined)
    newRacer.setData(newId, startingCell, newRoute)

    newRacer.simulateRoute()
    newRacer.calculateObjectiveFunction()


    return newRacer
}

function assignMatingPartners() {
    let newRacers = []
    //even pairs
    for (let i=0; i < myRacers.length; i+=2) {
            newRacers.push(createNewRacer(myRacers[i], myRacers[i+1]))
    }

    //uneven pairs
    newRacers.push(createNewRacer(myRacers[0], myRacers[myRacers.length-1]))
    for (let i=1; i < myRacers.length - 1; i+=2) {
        newRacers.push(createNewRacer(myRacers[i], myRacers[i+1]))

    }

    for (i = 0; i < newRacers.length; i++) {
        myRacers.push(newRacers[i])
    }
}
