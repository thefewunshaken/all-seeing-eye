import { actionTypes } from "./actions";

const initialState = {
   imageUrl: '',
   isPending: false,
   imageData: null,
   boundingBoxes: [],
   error: null
};

export const image = (state=initialState, action={}) => {
   switch (action.type) {
      case actionTypes.UPDATE_IMAGE_URL:
         return {...state, imageUrl: action.payload};

      case actionTypes.REQUEST_IMAGE_DATA_PENDING:
         return {...state, isPending: true};

      case actionTypes.REQUEST_IMAGE_DATA_FAILED:
         return {...state, isPending: false, imageData: action.payload};

      case actionTypes.REQUEST_IMAGE_DATA_SUCCESS:
         return {...state, isPending: false, imageData: action.payload};

      case actionTypes.UPDATE_BOUNDING_BOXES:
         return {...state, boundingBoxes: action.payload};

      default:
         return state;
   }
}
