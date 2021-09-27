import './FaceRecognition.scss';

// TEST IMAGE SINGLE
//* https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg
// TEST IMAGE GROUP
//* https://imgix.bustle.com/uploads/image/2018/2/2/d8bc51e7-2d1e-446a-9577-9c0de318cd1d-stocksy_txp1c870653lup100_small_1760976.jpg
const FaceRecognition = ({ image, boundingBoxes }) => {
  console.log(image, boundingBoxes);
  return (
    <div className="relative flex justify-center w-75 center">
          <div className="mt2 mw-100">
              <img
                src={image}
                id="input-image"
                width="auto" height="auto"
                alt={`${image !== '' ? 'user submitted group of people' : ''}`}
              />
              {
                boundingBoxes.length && image ?
                  boundingBoxes.map((boundingBox, i) => {
                    return (
                      <div
                        key={i}
                        className="bounding-box absolute flex flex-wrap justify-center pointer"
                        style={{top: boundingBox.top_row, right: boundingBox.right_col, bottom: boundingBox.bottom_row, left: boundingBox.left_col}}
                      ></div>
                    )
                  }) : null
              }
          </div>
        </div>
  );
}

export default FaceRecognition;
