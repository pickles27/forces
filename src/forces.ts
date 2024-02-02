import { Body, Dimension, World } from "./types";

const TICK_FREQUENCY = 16;
const MILLISECONDS_PER_SECOND = 1000;
const PIXELS_PER_INCH = 254;

const x: Dimension = 0;
const y: Dimension = 1;

/**
 * Creates the basic world elements.
 */
const buildWorld = (worldState: World) => {};

const getPositionByDimension = (
  dimension: Dimension,
  bodyState: Body,
  worldState: World
) =>
  bodyState.initialPosition[dimension] +
  (bodyState.initialVelocity[dimension] * worldState.elapsedTimeInMs) /
    MILLISECONDS_PER_SECOND +
  0.5 *
    bodyState.acceleration[dimension] *
    Math.pow(worldState.elapsedTimeInMs / MILLISECONDS_PER_SECOND, 2);

const getVelocityByDimension = (
  dimension: Dimension,
  bodyState: Body,
  worldState: World
) =>
  bodyState.initialVelocity[dimension] +
  (bodyState.acceleration[dimension] * worldState.elapsedTimeInMs) /
    MILLISECONDS_PER_SECOND;

/** Returns position [x,y] */
const getPosition = (bodyState: Body, worldState: World) => [
  getPositionByDimension(x, bodyState, worldState),
  getPositionByDimension(y, bodyState, worldState),
];

/** Returns velocity [x,y] */
const getVelocity = (bodyState: Body, worldState: World) => [
  getVelocityByDimension(x, bodyState, worldState),
  getVelocityByDimension(y, bodyState, worldState),
];

const isCollisionX = (bodyState: Body) =>
  bodyState.position[x] < 0 ||
  bodyState.position[x] * PIXELS_PER_INCH >= window.innerWidth;
const isCollisionY = (bodyState: Body) =>
  bodyState.position[y] < 0 ||
  bodyState.position[y] * PIXELS_PER_INCH >= window.innerHeight;

const handleBounce = (bodyState: Body, worldState: World) => {
  if (isCollisionX(bodyState)) {
    // handle bounce on sides

    // reset initial position, initial velocity and elapsed time?
    console.log("bounced x: ", bodyState);
    bodyState.initialVelocity[x] = -bodyState.velocity[x];
    bodyState.initialPosition = [...bodyState.position];
    // worldState.elapsedTimeInMs =
  }
  if (isCollisionY(bodyState)) {
    // handle bounce on top/bottom
    console.log("bounced y: ", bodyState);
    bodyState.initialVelocity[y] = -bodyState.velocity[y];
    bodyState.initialPosition = [...bodyState.position];
  }
};

/** Place the body in the correct position based on given state */
const updateBodyPosition = (bodyState: Body, worldState: World) => {
  const bodyElement = document.getElementById("body");
  if (bodyElement) {
    /** Update placement of body div */
    bodyElement.style.left = `${
      getPositionByDimension(x, bodyState, worldState) * PIXELS_PER_INCH
    }px`;
    bodyElement.style.top = `${
      getPositionByDimension(y, bodyState, worldState) * PIXELS_PER_INCH
    }px`;

    const elapsedElement = document.getElementById("elapsed");
    if (elapsedElement) {
      elapsedElement.innerText = `Time elapsed: ${worldState.elapsedTimeInMs} milliseconds.`;
    }
  }
};

/**
 * Called TICK_FREQUENCY times per second. Acceleration assumed to be constant.
 */
const handleTick = (bodyState: Body, worldState: World) => {
  /** Update DOM before calculating new values */
  updateBodyPosition(bodyState, worldState);

  /** Update the state */
  const currentTime = Date.now();
  worldState.currentTimeInMs = currentTime;
  worldState.elapsedTimeInMs = currentTime - worldState.startTimeInMs;
  bodyState.velocity = getVelocity(bodyState, worldState);
  bodyState.position = getPosition(bodyState, worldState);

  handleBounce(bodyState, worldState);
};

console.log("starting forces script");

const currentTime = Date.now();

const worldState: World = {
  startTimeInMs: currentTime,
  currentTimeInMs: currentTime,
  elapsedTimeInMs: 0,
  width: window.innerWidth,
  height: window.innerHeight,
};

const bodyState: Body = {
  position: [0, 0],
  initialPosition: [0, 0],
  velocity: [0, 0],
  initialVelocity: [1, 0],
  acceleration: [0, 9.8],
};

buildWorld(worldState);

setInterval(() => handleTick(bodyState, worldState), TICK_FREQUENCY);

console.log("ended script");
