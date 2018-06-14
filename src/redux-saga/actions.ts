export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  START_CLOCK: 'START_CLOCK',
  TICK_CLOCK: 'TICK_CLOCK',
};

export const failure = error => {
  return {
    type: actionTypes.FAILURE,
    error,
  };
};

export const increment = () => {
  return { type: actionTypes.INCREMENT };
};

export const decrement = () => {
  return { type: actionTypes.DECREMENT };
};

export const reset = () => {
  return { type: actionTypes.RESET };
};

export const loadData = () => {
  return { type: actionTypes.LOAD_DATA };
};

export const loadDataSuccess = data => {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data,
  };
};

export const startClock = () => {
  return { type: actionTypes.START_CLOCK };
};

export const tickClock = isServer => {
  return {
    type: actionTypes.TICK_CLOCK,
    light: !isServer,
    ts: Date.now(),
  };
};
