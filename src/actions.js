const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;
export const actionTypes = {
   UPDATE_IMAGE_URL: 'UPDATE_IMAGE_URL',
   UPDATE_BOUNDING_BOXES: 'UPDATE_BOUNDING_BOXES',
   REQUEST_IMAGE_DATA_PENDING: 'REQUEST_IMAGE_DATA_PENDING',
   REQUEST_IMAGE_DATA_SUCCESS: 'REQUEST_IMAGE_DATA_SUCCESS',
   REQUEST_IMAGE_DATA_FAILED: 'REQUEST_IMAGE_DATA_FAILED',
};

export const setImageUrl = (imageUrl) => {
   return {
      type: actionTypes.UPDATE_IMAGE_URL,
      payload: imageUrl
   }
}

export const fetchImageData = () => async (dispatch, getState) => {
   dispatch({ type: actionTypes.REQUEST_IMAGE_DATA_PENDING });
   const imageUrl = getState().image.imageUrl;
   try {
      const response = await fetch(`${serverEndpoint}/image`,
      {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ url: imageUrl })
      }
      );
      const imageData = await response.json();
      return dispatch({
         type: actionTypes.REQUEST_IMAGE_DATA_SUCCESS,
         payload: imageData
      });
   }
   catch (error) {
      return dispatch({
         type: actionTypes.REQUEST_IMAGE_DATA_FAILED,
         payload: error
      });
   }
}
