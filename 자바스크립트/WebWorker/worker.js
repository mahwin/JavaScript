export default class Worker {
  constructor(name) {
    this.speed = Math.floor(Math.random() * 1000);
    this.isRunning = false;
    this.name = name;
    this.done = 0;
  }

  canWork() {
    return !this.isRunning;
  }

  run(amount) {
    this.isRunning = true;
    console.log(`Worker ${this.name} is running`);
    setTimeout(() => {
      this.isRunning = false;
      this.done++;
      console.log(`Worker ${this.name} is done`);
    }, amount / this.speed);
  }
}
