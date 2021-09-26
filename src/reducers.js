import { types } from "./actions";

const initialState = {
   imageUrl: ''
};

export const image = (state=initialState, action={}) => {
   switch (action.type) {
      case types.UPDATE_IMAGE_URL:
         return {...state, imageUrl: action.payload}

      default:
         return state;
   }
}
