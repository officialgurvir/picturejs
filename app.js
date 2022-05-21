const image = new PictureJS.ImageUrlRenderer(
    'https://picsum.photos/500'
);
image.container = document.querySelector('.img');
image.render();

setTimeout(() => {
    image.crop(100, 100, 200, 300);
}, 3000)

document.querySelector('.dload').addEventListener('click', function () {
    console.log('h')
    image.download();
})