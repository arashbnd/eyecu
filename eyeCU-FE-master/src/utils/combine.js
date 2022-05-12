import React, {ComponentProps} from 'react'

export const combineComponents = (...components) => {
    return components.reduce(
      (AccumulatedComponents, CurrentComponent) => {
        return ({ children })=> {
          return (
            <AccumulatedComponents>
              <CurrentComponent>{children}</CurrentComponent>
            </AccumulatedComponents>
          );
        };
      },
      ({ children }) => <>{children}</>,
    );
  };


const combineDispatch = (...dispatches) => (action) =>
  dispatches.forEach((dispatch) => dispatch(action));


const combineReducers = (slices) => {
    return (state, action) =>
      Object.keys(slices).reduce(
        (acc, prop) => ({
          ...acc,
          [prop]: slices[prop](acc[prop], action)
        }),
        state
      )
  }
  
const reduceReducers = (...reducers) => { 
    return (state, action) =>
      reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state)
  }
