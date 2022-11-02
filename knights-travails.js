const board = document.querySelector('.board');
let GridSpaces = {};
const createBoard = function() {
    for(let i = 8; i > 0; i--) {
        const newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.classList.add('r'+i);
        newRow.setAttribute('id', i)
        board.appendChild(newRow);
    }
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        for(let i = 8; i > 0; i--) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.classList.add('c'+i);
            newCell.setAttribute('id', i);
            row.appendChild(newCell);
            GridSpaces[row.id+newCell.id] = new GridSpace(buildAdjacencyList(row.id+newCell.id))
        }
    })
}

function GridSpace(adjacent, visited=false) {
    this.adjacent = adjacent,
    this.visited = visited,
    this.setVisited = function() {
        if(visited === false) {
            this.visited = true;
        } else {
            this.visited = false;
        }
    }
}

function buildAdjacencyList(number) {
    const coord = Array.from(String(number)).map(str => Number(str));
    let adjacencyList = [[coord[0] + 2, coord[1] - 1], [coord[0] + 2, coord[1] + 1], [coord[0] + 1, coord[1] - 2], [coord[0] + 1, 
    coord[1] + 2], [coord[0] - 1, coord[1] - 2], [coord[0] - 1, coord[1] + 2], [coord[0] - 2, coord[1] - 1], [coord[0] - 2, coord[1] + 1]]
    return pruneAdjacencyList(adjacencyList);
}

function pruneAdjacencyList(adjacencyList) {
    for(let i = 0; i < adjacencyList.length; i++) {
        adjacencyList.forEach(coord => {
            if(((coord[0] > 8) || (coord[0] < 1)) || ((coord[1] > 8) || (coord[1] < 1))) {
                adjacencyList.splice(adjacencyList.indexOf(coord), 1);
            }
        })
    }
    return adjacencyList;
}

function QueueNode(data, next=null) {
    this.data = data;
    this.next = next;
}

function Queue(head=null, tail=null) {
    this.head = head;
    this.tail = tail;
    this.enqueue = function(data) {
        const newNode = new QueueNode(data);
        if(this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode
            this.tail = newNode;
        }
    }
    this.dequeue = function() {
        this.head = this.head.next;
    }
}

function knightMoves(start, end) {
    const coordQueue = new Queue();
    coordQueue.enqueue([start]);
    let counter = 0;
    while(true) {
        const currentGridSpace = GridSpaces[coordQueue.head.data[coordQueue.head.data.length - 1].join('')];
        const adjacent = currentGridSpace.adjacent;
        for(let i = 0; i < adjacent.length; i++) {
            const nextGridSpace = GridSpaces[adjacent[i].join('')];
            if(adjacent[i][0] === end[0] && adjacent[i][1] === end[1]) {
                return coordQueue.head.data.concat([adjacent[i]]);
            }
            if(nextGridSpace.visited !== true) {
                coordQueue.enqueue(coordQueue.head.data.concat([adjacent[i]]))
            }
        }
        currentGridSpace.setVisited();
        coordQueue.dequeue();
        counter += 1;
    }
}
