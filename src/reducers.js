import { actionTypes } from "./actions";

const initialState = {
   url: '',
   isPending: false,
   data: null,
   boundingBoxes: [],
   error: null
};

const extractBoundingBoxesFromImageData = (imageData) => {
   let boundingBoxes = [];
   // data.regions[].data.concepts
   // data[2] is multicultural model
   if (imageData[2].data.regions.length) {
     imageData[2].data.regions.forEach(region => {
       boundingBoxes.push(region.region_info.bounding_box)
     });
   }
   // const clarifaiBoundingBox = data[2].data.regions[0].region_info.bounding_box;

   // * API currently returns coords as decimal percentage values
   boundingBoxes.forEach(box => {
     box.left_col = `${box.left_col * 100}%`;
     box.top_row = `${box.top_row * 100}%`;
     box.right_col = `${(1 - box.right_col) * 100}%`;
     box.bottom_row = `${(1 - box.bottom_row) * 100}%`;
   })
   // * leaving here in case API updates in the future to return coords as pixel value
   // const image = document.getElementById('input-image');
   // const width = Number(image.width);
   // const height = Number(image.height);
   // boundingBoxes.forEach(box => {
   //   box.left_col = `${(box.left_col / width) * 100}%`;
   //   box.top_row = `${(box.top_row / height) * 100}%`;
   //   box.right_col = `${((width - box.right_col) / width) * 100}`;
   //   box.bottom_row = `${((height - box.bottom_row) / height) * 100}`;
   // })
   return boundingBoxes;
}

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
         return {...state, isPending: false, data: action.payload, boundingBoxes: extractBoundingBoxesFromImageData(action.payload)};

      case actionTypes.UPDATE_BOUNDING_BOXES:
         return {...state, boundingBoxes: action.payload};

      default:
         return state;
   }
}
