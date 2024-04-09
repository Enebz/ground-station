import { Layout } from "react-grid-layout";
import Solenoid from './Solenoid';
import Disco from "./Disco";
import CLI from "./CLI";
import Servo from "./Servo";

export interface InitialPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export class DashboardElement {
  public name: string;
  public type: string = 'default';
  public options: any;
  public layout: Layout;
  public element: React.ReactNode;

  constructor(name: string, options: any, initialPosition: InitialPosition = {x: 0, y: 0, w: 0, h: 0}) {
    this.name = name;
    this.options = options;
    this.layout = {
      i: name,
      x: initialPosition.x,
      y: initialPosition.y,
      w: initialPosition.w,
      h: initialPosition.h,
      static: false,
    };
    
    // Parent class doesn't have a layout, so we'll just set it to null
  }
}


// SOLENOID
export interface SolenoidOptions {
  inline?: boolean;
}

export class SolenoidDashboardElement extends DashboardElement {
  declare public options: SolenoidOptions;

  constructor(name: string, solenoidOptions: SolenoidOptions = {}, initialPosition: InitialPosition = {x: 0, y: 0, w: 0, h: 0}) {
    super(name, solenoidOptions, initialPosition);
    this.type = 'solenoid';

    switch (solenoidOptions.inline) {
      case true:
        this.layout.minW = 2;
        this.layout.minH = 1;
        this.layout.maxW = 4;
        this.layout.maxH = 1;
        break;
      default:
        this.layout.minW = 3;
        this.layout.minH = 2;
        this.layout.maxW = 4;
        this.layout.maxH = 4;
        break;
    }

    this.element = <Solenoid name={this.name} inline={this.options.inline} />
  }
}

// Servo
export interface ServoOptions {
}

export class ServoDashboardElement extends DashboardElement {
  declare public options: ServoOptions;

  constructor(name: string, servoOptions: ServoOptions = {}, initialPosition: InitialPosition = {x: 0, y: 0, w: 0, h: 0}) {
    super(name, servoOptions, initialPosition);
    this.type = 'servo';
    console.log("Creating servo")

    this.layout.minW = 3;
    this.layout.minH = 4;
    this.layout.maxW = 4;
    this.layout.maxH = 4;

    this.element = <Servo name={this.name} />
  }
}

// DISCO
export interface DiscoOptions {
}

export class DiscoDashboardElement extends DashboardElement {
  declare public options: DiscoOptions;

  constructor(name: string, discoOptions: DiscoOptions = {}, initialPosition: InitialPosition = {x: 0, y: 0, w: 0, h: 0}) {
    super(name, discoOptions, initialPosition);
    this.type = 'disco';
    this.layout.minW = 2;
    this.layout.minH = 2;
    this.layout.maxW = 4;
    this.layout.maxH = 4;

    this.element = <Disco name={this.name} />
  }
}

// CLI
export interface CLIOptions {
}

export class CLIDashboardElement extends DashboardElement {
  declare public options: SolenoidOptions;

  constructor(name: string, solenoidOptions: SolenoidOptions = {}, initialPosition: InitialPosition = {x: 0, y: 0, w: 0, h: 0}) {
    super(name, solenoidOptions, initialPosition);
    this.type = 'cli';
    this.layout.minW = 4;
    this.layout.minH = 4;

    this.element = <CLI className="border-2 border-background-200 rounded-lg" />
  }
}