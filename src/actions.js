
export const types = {
   UPDATE_IMAGE_URL: 'UPDATE_IMAGE_URL'
};

export const setImageUrl = (imageUrl) => {
   return {
      type: types.UPDATE_IMAGE_URL,
      payload: imageUrl
   }
};
