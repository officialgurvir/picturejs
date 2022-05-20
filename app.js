const image = new PictureJS.ImageUrlRenderer(
    'https://picsum.photos/500'
);

image.headlessRender();

const imageData = new PictureJS.ImageDataRenderer(
    image.crop(100, 100, 400, 400)
);

imageData.container = document.querySelector('.img');
imageData.render();