const unitLength = 10;
let bgColor;                              //底色           
let strokeColor;                          //Game Area入面線顏色
let boxColor;                             //Game Area入面格仔顏色
let color;
let columns;
let rows;
let currentBoard;
let nextBoard;
let count = 0;
let loneliness;
let overpopulation;
let reproduction;
let slider;
let sliderValue;
let bgPicker;
let strokePicker;
let boxPicker;

let player_1_color;
let player_2_color;

// const getCanvas = parent(document.querySelector('.gamingArea'));
function setup() {
    const canvas = createCanvas(windowWidth - 5, windowHeight - 206);
    canvas.parent(document.querySelector('#canvas'));

    slider = createSlider(5, 50, 15, 5);
    slider.parent(document.querySelector('#fpsSlider'));

    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
    }

    frameRate(20);

    bgColor = 'rgb(113,113,113)';
    strokeColor = 'rgb(18,18,18)';
    boxColor = 'rgb(255,215,0)';

    bgPicker = createColorPicker(bgColor);
    bgPicker.parent(document.querySelector('#bgPicker'))

    strokePicker = createColorPicker(strokeColor);
    strokePicker.parent(document.querySelector('#strokePicker'))

    boxPicker = createColorPicker(boxColor);
    boxPicker.parent(document.querySelector('#boxPicker'))

    loneliness = 2;
    overpopulation = 3;
    reproduction = 3;
    init();
}

function draw() {
    console.log("drawing")
    let fps = slider.value();
    frameRate(fps);
    generate();
    // bgColor = bgPicker.color();
    strokeColor = strokePicker.color();
    // boxColor = boxPicker.color();

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            color = currentBoard[i][j].life === 1 ? currentBoard[i][j].color : bgColor;
            fill(color);
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function init() {
    frameRate(20);
    loneliness = 2;
    overpopulation = 3;
    reproduction = 3;

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            // currentBoard[i][j] = 0;
            // nextBoard[i][j] = 0;
            currentBoard[i][j] = { species: 0, live: 0, color: bgColor, age: 0 };
            nextBoard[i][j] = { species: 0, live: 0, color: bgColor, age: 0 };

        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 5, windowHeight - 206);
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
    }

    frameRate(20);
    bgColor = 205;
    boxColor = 150;
    loneliness = 2;
    overpopulation = 3;
    reproduction = 3;
    init();
    // draw();
    loop();
}

function generate() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let neighbors = 0;

            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    // -1, -1 || -1, 0 || -1, 1
                    // 0, -1 || 0, 0 || 0, 1
                    // 1, -1 || 1, 0 || 1, 1
                    if (i === 0 && j === 0) {
                        // 自己
                        continue;
                    }
                    neighbors +=
                        currentBoard[(x + i + columns) % columns][(y + j + rows) % rows].life;
                }
            }

            // Rules of Life
            if (currentBoard[x][y].life === 1 && neighbors < loneliness) {
                // Die of Loneliness
                // nextBoard[x][y] = 0;

                // currentBoard[x][y].species = currentPlayer
                nextBoard[x][y].life = 0
                nextBoard[x][y].color = bgColor
                nextBoard[x][y].age = 0
            } else if (currentBoard[x][y].life === 1 && neighbors > overpopulation) {
                // Die of Overpopulation
                // nextBoard[x][y] = 0;

                nextBoard[x][y].life = 0
                nextBoard[x][y].color = bgColor
                nextBoard[x][y].age = 0
            } else if (currentBoard[x][y].life === 0 && neighbors === reproduction) {
                // New life due to Reproduction
                // nextBoardnext= 1;

                if (Math.random() > 0.5) {
                    nextBoard[x][y].species = 1
                    nextBoard[x][y].life = 1
                    nextBoard[x][y].color = "blue"
                    nextBoard[x][y].age = 0
                }else{
                nextBoard[x][y].species = 2
                nextBoard[x][y].life = 1
                nextBoard[x][y].color = "red"
                nextBoard[x][y].age = 0}
            } else {
                // Stasis
                // nextBoard[x][y] = currentBoard[x][y];

                if (currentBoard[x][y].life == 1) {
                    console.log('life stasis')
                    nextBoard[x][y].life = 1
                    nextBoard[x][y].color = "yellow"
                    nextBoard[x][y].age++
                } else {
                    nextBoard[x][y].life = 0
                    nextBoard[x][y].color = bgColor
                    nextBoard[x][y].age = 0
                }

            }
        }
    }
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

//var to Loneliness
document.querySelector('#one')
    .addEventListener('click', function () {
        loneliness = 1;
    });

document.querySelector('#two')
    .addEventListener('click', function () {
        loneliness = 2;
    });

document.querySelector('#three')
    .addEventListener('click', function () {
        loneliness = 3;
    });

document.querySelector('#four')
    .addEventListener('click', function () {
        loneliness = 4;
    });

document.querySelector('#five')
    .addEventListener('click', function () {
        loneliness = 5;
    });

//var to Overpopulation
document.querySelector('#oone')
    .addEventListener('click', function () {
        overpopulation = 1;
    });

document.querySelector('#ttwo')
    .addEventListener('click', function () {
        overpopulation = 2;
    });

document.querySelector('#tthree')
    .addEventListener('click', function () {
        overpopulation = 3;
    });

document.querySelector('#ffour')
    .addEventListener('click', function () {
        overpopulation = 4;
    });

document.querySelector('#ffive')
    .addEventListener('click', function () {
        overpopulation = 5;
    });

//var to Reproduction
document.querySelector('#onee')
    .addEventListener('click', function () {
        overpopulation = 1;
    });

document.querySelector('#twoo')
    .addEventListener('click', function () {
        overpopulation = 2;
    });

document.querySelector('#three')
    .addEventListener('click', function () {
        overpopulation = 3;
    });

document.querySelector('#fourr')
    .addEventListener('click', function () {
        overpopulation = 4;
    })
document.querySelector('#fivee')
    .addEventListener('click', function () {
        overpopulation = 5;
    });

document.querySelector('#reset')
    .addEventListener('click', function () {
        init();

    });



const darkBtn = document.querySelector('#dark')
darkBtn.addEventListener('click', function onClick(event) {
    document.body.style.backgroundColor = 'rgb(64,64,64)';
    document.body.style.color = 'white';
});

const lightBtn = document.querySelector('#light')
lightBtn.addEventListener('click', function onClick(event) {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
});

document.querySelector('#pause')
    .addEventListener('click', function () {
        noLoop();
    });

document.querySelector('#start')
    .addEventListener('click', function () {
        loop();
    });

document.querySelector('#random')
    .addEventListener('click', function () {
        let v;
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                v = Math.floor(Math.random() * 2)
                if (v > 0) {
                    currentBoard[i][j] = 1;
                }
            }
        }
    });

let currentPlayer = 0;

document.querySelector('#player_1').addEventListener('click', () => {
    currentPlayer = 1
    boxColor =  boxPicker.color();
    
    player_1_color = Object.assign({},boxColor);
    console.log("check box color", boxColor, "player1 color",player_1_color);

})

document.querySelector('#player_2').addEventListener('click', () => {
    currentPlayer = 2
    boxColor = boxPicker.color();
    player_2_color = Object.assign({},boxColor);
})

function mouseDragged() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);

    // currentBoard[x][y] = 1;
    currentBoard[x][y].species = currentPlayer
    currentBoard[x][y].life = 1
    currentBoard[x][y].color = boxColor
    currentBoard[x][y].age = 0


    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

function mousePressed() {
    noLoop();
    mouseDragged();
}

function mouseReleased() {
    // loop();
}

document.querySelector('#Gosper')
    .addEventListener('click', function () {
        const arr = `
........................O
......................O.O
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO
OO........O...O.OO....O.O
..........O.....O.......O
...........O...O
............OO`.split(`\n`);
        let count = 0;
        let arr2 = [];
        let x = Math.floor(Math.random() * (columns - 36));
        let y = Math.floor(Math.random() * (rows - 10));

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > count) {
                count = arr[i].length
            }
        }

        for (let i = 0; i < count; i++) {
            arr2[i] = []
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                // if (arr[j][i] == `.`) {
                //     arr2[i][j] = `0`
                if (arr[j][i] == "O") {
                    arr2[i][j] = 1
                } else {
                    arr2[i][j] = 0
                }
            }
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                currentBoard[i + x][j + y] = arr2[i][j];
            }
        }
    });

document.querySelector('#Simkin')
    .addEventListener('click', function () {
        const arr = `
OO.....OO........................
OO.....OO........................
.................................
....OO...........................
....OO...........................
.................................
.................................
.................................
.................................
......................OO.OO......
.....................O.....O.....
.....................O......O..OO
.....................OOO...O...OO
..........................O......
.................................
.................................
.................................
.................................
.................................
.................................
.................................`.split(`\n`);
        let count = 0;
        let arr2 = [];
        let x = Math.floor(Math.random() * (columns - 33));
        let y = Math.floor(Math.random() * (rows - 22));

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > count) {
                count = arr[i].length
            }
        }

        for (let i = 0; i < count; i++) {
            arr2[i] = []
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                // if (arr[j][i] == `.`) {
                //     arr2[i][j] = `0`
                if (arr[j][i] == "O") {
                    arr2[i][j] = 1
                } else {
                    arr2[i][j] = 0
                }
            }
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                currentBoard[i + x][j + y] = arr2[i][j];
            }
        }
    });

document.querySelector('#Metamorphosis')
    .addEventListener('click', function () {
        const arr = `
...................O.........
....................O........
..................OOO........
.............................
.............................
.............................
.............................
.............................
............O...O.....O.OO...
OO.........O.....O....O.O.O..
OO.........O.........O....O..
...........OO...O.....O.O.O..
.............OOO......O.OO...
.............................
.............OOO.............
...........OO...O............
OO.........O...............OO
OO.........O.....O.........OO
............O...O............`.split(`\n`);
        let count = 0;
        let arr2 = [];
        let x = Math.floor(Math.random() * (columns - 29));
        let y = Math.floor(Math.random() * (rows - 20));

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > count) {
                count = arr[i].length
            }
        }

        for (let i = 0; i < count; i++) {
            arr2[i] = []
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                // if (arr[j][i] == `.`) {
                //     arr2[i][j] = `0`
                if (arr[j][i] == "O") {
                    arr2[i][j] = 1
                } else {
                    arr2[i][j] = 0
                }
            }
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                currentBoard[i + x][j + y] = arr2[i][j];
            }
        }
    });

document.querySelector('#Lightweight')
    .addEventListener('click', function () {
        const arr = `
.....................O...
..................OOOO...
.............O..O.OO.....
.............O...........
OOOO........O...O.OO.....
O...O.....OO.OO.O.O.OOOOO
O.........OO.O.O.O..OOOOO
.O..O..OO..O...OOO..O.OO.
......O..O.OO............
......O....OO............
......O..O.OO............
.O..O..OO..O...OOO..O.OO.
O.........OO.O.O.O..OOOOO
O...O.....OO.OO.O.O.OOOOO
OOOO........O...O.OO.....
.............O...........
.............O..O.OO.....
..................OOOO...
.....................O...`.split(`\n`);
        let count = 0;
        let arr2 = [];
        let x = Math.floor(Math.random() * (columns - 29));
        let y = Math.floor(Math.random() * (rows - 20));

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > count) {
                count = arr[i].length
            }
        }

        for (let i = 0; i < count; i++) {
            arr2[i] = []
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                // if (arr[j][i] == `.`) {
                //     arr2[i][j] = `0`
                if (arr[j][i] == "O") {
                    arr2[i][j] = 1
                } else {
                    arr2[i][j] = 0
                }
            }
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < arr.length; j++) {
                currentBoard[i + x][j + y] = arr2[i][j];
            }
        }
    });