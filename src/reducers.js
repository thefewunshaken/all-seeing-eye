import { actionTypes } from "./actions";

const initialState = {
   url: '',
   isPending: false,
   data: null,
   boundingBoxes: [],
   error: null
};

export const image = (state=initialState, action={}) => {
   switch (action.type) {
      // changing the url should also nullify the data and boundingBoxes
      case actionTypes.UPDATE_IMAGE_URL:
         return {...state, url: action.payload, data: null, boundingBoxes: []};

      case actionTypes.REQUEST_IMAGE_DATA_PENDING:
         return {...state, isPending: true};

      case actionTypes.REQUEST_IMAGE_DATA_FAILED:
         return {...state, isPending: false, data: action.payload};

      case actionTypes.REQUEST_IMAGE_DATA_SUCCESS:
         return {...state, isPending: false, data: action.payload};

      case actionTypes.UPDATE_BOUNDING_BOXES:
         return {...state, boundingBoxes: action.payload};

      default:
         return state;
   }
}
