const image = new PictureJS.ImageUrlRenderer(
    'https://picsum.photos/500'
);

image.crop(0, 0, 500, 500).then(data => {
    let croppedImage = new PictureJS.ImageDataRenderer(data);
    croppedImage.container = document.querySelector('.img');
    croppedImage.render();
})