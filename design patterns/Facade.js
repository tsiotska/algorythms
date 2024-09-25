/*
The Facade Pattern simplifies interactions with complex subsystems by providing a unified interface.
It hides the complexity of multiple systems or classes behind a more straightforward API.
*/

class Light {
  turnOn() {
    console.log('Lights are turned on');
  }

  turnOff() {
    console.log('Lights are turned off');
  }
}

class AirConditioner {
  turnOn() {
    console.log('Air conditioner is turned on');
  }

  turnOff() {
    console.log('Air conditioner is turned off');
  }
}

class MusicSystem {
  turnOn() {
    console.log('Music system is turned on');
  }

  turnOff() {
    console.log('Music system is turned off');
  }
}

// Facade: Smart Home Controller
class SmartHomeFacade {
  constructor() {
    this.light = new Light();
    this.ac = new AirConditioner();
    this.music = new MusicSystem();
  }

  startDay() {
    console.log('Starting the day...');
    this.light.turnOn();
    this.ac.turnOn();
    this.music.turnOn();
  }

  endDay() {
    console.log('Ending the day...');
    this.light.turnOff();
    this.ac.turnOff();
    this.music.turnOff();
  }
}

const smartHome = new SmartHomeFacade();
smartHome.startDay();
smartHome.endDay();