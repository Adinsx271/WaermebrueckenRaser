function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function vectorLength2D(vector) {
  return Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1]);
}

function wait(milliseconds) { //use with "await" in front
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }

  function ArrDiv(array, divisor) {
    newArray = []
    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i] / divisor);
    }
    return newArray;
  }

  function ArrRound(array, digits) {
    newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(Math.round(array[i] * Math.pow(10,digits)) / Math.pow(10,digits));
    }
    return newArray;
  }

  function ArrMult(array, multiplicand) {
    newArray = [];
    for (let i = 0; i< array.length; i++) {
      newArray.push(array[i] * multiplicand);
    }
    return newArray;
  }

  function randi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //transfers Numbers 0-7 to all 8 directions as binary vector [-1,1]
  function getDirectionVector(direction) {
    let vector = []
    switch (direction) {
      case 0:
        vector = [1, 0];
        break;
      case 1:
        vector = [1, -1];
        break;
      case 2:
        vector = [0, -1];
        break;
      case 3:
        vector = [-1, -1];
        break;
      case 4:
        vector = [-1, 0];
        break;
      case 5:
        vector = [-1, 1];
        break;
      case 6:
        vector = [0, 1];
        break;
      case 7:
        vector = [1, 1];
        break;
    }
    return vector;
  }

  function providePrime(n) {
    const primes = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
      73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 
      157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 
      239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 
      331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 
      421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 
      509, 521, 523, 541
    ];
    return primes[n];
  }