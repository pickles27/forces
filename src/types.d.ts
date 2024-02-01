type Width = number;
type Height = number;

export type Dimension = 0 | 1;

export interface Body {
  /** Position in m [x, y] */
  initialPosition: number[];
  position: number[];
  /** Velocity in m/s [v_x, v_y] */
  velocity: number[];
  initialVelocity: number[];
  /** Acceleration in m/s^2 [a_x, a_y] */
  acceleration: number[];
}

export interface World {
  /** Time clock was started. */
  startTimeInMs: number;
  currentTimeInMs: number;
  elapsedTimeInMs: number;
  /** Width of window. */
  width: Width;
  /** Height of window. */
  height: Height;
}
