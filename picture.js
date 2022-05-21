const PictureJS = (function (window, document) {
  class ImageRenderer {
    _canvas;
    _context;
    _container;
    
    set container(element) {
      if (typeof element == "string")
        this._container = document.querySelector(element);
      else if (element instanceof HTMLElement)
        this._container = element;
    }

    constructor() {
      this._canvas = document.createElement('canvas');
      this._context = this._canvas.getContext('2d');
    }

    crop(fx, fy, tx, ty) {
      let data = this._context.getImageData(fx, fy, tx, ty);
      this._context.clearRect(
        0,0,
        this._canvas.width,
        this._canvas.height
      );

      this._context.putImageData(data, 0, 0);
    }

    download(mimetype = "png") {
      let a = document.createElement('a');
      a.target = "_blank";
      a.download = `image.${mimetype}`
      a.href = this._canvas.toDataURL(`image/${mimetype}`);

      a.click();
    }
  }

  class ImageUrlRenderer extends ImageRenderer {
    _image;
    _imageURL;

    constructor(imageURL) {
      super();
      this._image = new Image();
      this._image.src = imageURL;
      this._image.crossOrigin = "Anonymous";

      this._imageURL = imageURL;
    }

    headlessRender() {
      return new Promise(resolve => {
        this._image.onload = () => {
          this._canvas.width = this._image.width;
          this._canvas.height = this._image.height;
          
          this._context.clearRect(
            0,0,
            this._canvas.width,
            this._canvas.height
          )

          this._context.drawImage(
            this._image,
            0,0,
            this._canvas.width,
            this._canvas.height
          );
          
          resolve();
        }
      });
    }

    render() {
      return this.headlessRender().then(() => this._container.appendChild(
        this._canvas
      ));
    }
  }

  class ImageDataRenderer extends ImageRenderer {
    _imageData;

    constructor(imageData) {
      super();

      this._imageData = imageData;
    }

    headlessRender() {
      this._canvas.width = this._imageData.width;
      this._canvas.height = this._imageData.height;

      this._context.putImageData(
        this._imageData,
        0,0
      );
    }

    render()  {
      this.headlessRender();
      this._container.appendChild(this._canvas);
    }
  }

  return {
    ImageUrlRenderer,
  }
})(window, document);