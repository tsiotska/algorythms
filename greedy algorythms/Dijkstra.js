/*
Finding the Shortest Path Using Dijkstra's Algorithm
*/

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(vertexName, priority) {
    this.values.push({vertexName, priority});
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({nextNode: vertex2, weight});
    this.adjacencyList[vertex2].push({nextNode: vertex1, weight});
  }

  dijkstra(start, destination) {
    const distances = {}, previousNodeMap = {}, queue = new PriorityQueue();
    let path = [], smallestVertex;

    // Init vertices queue and path distances
    for (let vertexName in this.adjacencyList) {
      if (vertexName === start) {
        distances[vertexName] = 0;
        queue.enqueue(vertexName, 0);
      } else {
        distances[vertexName] = Infinity;
        queue.enqueue(vertexName, Infinity);
      }
      previousNodeMap[vertexName] = null;
    }

    while (!queue.isEmpty()) {
      smallestVertex = queue.dequeue().vertexName;
      if (!smallestVertex) break;

      // Reverse loop "previousNodeMap" nodes if destination is reached
      if (smallestVertex === destination) {
        while (previousNodeMap[smallestVertex]) {
          path.push(smallestVertex);
          smallestVertex = previousNodeMap[smallestVertex];
        }
        path.push(start);
        return path.reverse();
      }

      // Main logic
      // Update distance to the Node if it's less than current calculated or Infinity
      for (let neighbor of this.adjacencyList[smallestVertex]) {
        let candidateDistance = distances[smallestVertex] + neighbor.weight;
        let {nextNode} = neighbor;

        if (candidateDistance < distances[nextNode]) {
          distances[nextNode] = candidateDistance;
          previousNodeMap[nextNode] = smallestVertex;
          queue.enqueue(nextNode, candidateDistance);
        }
      }
    }

    return null;
  }
}

const vertices = ["A", "B", "C", "D", "F", "E"];
const edges = [
  {from: "A", to: "B", weight: 3},
  {from: "A", to: "C", weight: 2},
  {from: "B", to: "E", weight: 2},
  {from: "C", to: "F", weight: 6},
  {from: "C", to: "E", weight: 5},
  {from: "F", to: "D", weight: 1},
  {from: "E", to: "D", weight: 5},
];

const graph = new Graph();
vertices.forEach(vertex => graph.addVertex(vertex));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

console.log(graph.dijkstra("A", "D"));
