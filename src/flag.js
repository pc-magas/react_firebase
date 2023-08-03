import { configureStore } from '@reduxjs/toolkit'
import { onMessageListener } from './firebase';


const initialState = { flag: true }

function flagReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'flag/change') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      flag:action.payload
    }
  }
  // otherwise return the existing state unchanged
  return state
}

const store = configureStore({ reducer: flagReducer });

export const setFlag = active => ({
    type: 'flag/change',
    payload: active==='true'
});

onMessageListener().then(payload => {
    if(typeof payload.data !== 'undefined' && typeof payload.data['flag'] !== 'undefined' ) {
        store.dispatch(setFlag(payload.data.flag));
    }
})
.catch(err => console.log('failed: ', err));

export default store;