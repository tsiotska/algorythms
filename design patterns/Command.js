/*
Command Pattern is a behavioral design pattern that turns a request or an action into a stand-alone object,
allowing you to parameterize clients with queues, requests, and operations.
This pattern decouples the sender from the receiver, enabling more flexible handling of commands.
*/

class Command {
  execute() {}
  undo() {}
}

// The Receiver (TV)
class TV {
  turnOn() {
    console.log('TV is ON');
  }
  turnOff() {
    console.log('TV is OFF');
  }
}

class TurnOnCommand extends Command {
  constructor(tv) {
    super();
    this.tv = tv;
  }

  execute() {
    this.tv.turnOn();
  }

  undo() {
    this.tv.turnOff();
  }
}

class TurnOffCommand extends Command {
  constructor(tv) {
    super();
    this.tv = tv;
  }

  execute() {
    this.tv.turnOff();
  }

  undo() {
    this.tv.turnOn();
  }
}

// The Invoker (Remote Control)
class RemoteControl {
  setCommand(command) {
    this.command = command;
  }

  pressButton() {
    this.command.execute();
  }

  pressUndo() {
    this.command.undo();
  }
}

const tv = new TV();
const turnOnCommand = new TurnOnCommand(tv);
const turnOffCommand = new TurnOffCommand(tv);

const remote = new RemoteControl();

remote.setCommand(turnOnCommand);
remote.pressButton(); // TV is ON
remote.pressUndo();   // TV is OFF

remote.setCommand(turnOffCommand);
remote.pressButton(); // TV is OFF
remote.pressUndo();   // TV is ON