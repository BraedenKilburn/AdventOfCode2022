class Queue {
  constructor() {
    this.items = []
  }

  // adds an element to the end of the queue
  enqueue(element) {
    this.items.push(element)
  }

  // removes and returns the first element of the queue
  dequeue() {
    return this.items.shift()
  }

  // returns the first element of the queue
  peek() {
    return this.items[0]
  }

  // returns true if the queue is empty, false otherwise
  isEmpty() {
    return this.items.length === 0
  }

  // returns the number of elements in the queue
  size() {
    return this.items.length
  }

  // removes all elements from the queue
  clear() {
    this.items = []
  }

  // returns a string representation of the queue
  toString() {
    return this.items.toString()
  }
}

module.exports = Queue
