

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3 mb0 white tc">I can see your face. Paste a link below that points to an image.</p>
      <div className="flex justify-center">
        <div className="w-50-l pa4 br3 flex flex-row-ns flex-column items-center">
          <input className="f4 pa2 w-70 center" type="text" name="" id="" onChange={onInputChange} />
          <button
            className="w-70 w-30-ns f4 ph3 pv2 dib bg-white black bn dim"
            onClick={onPictureSubmit}
          > Detect </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;
