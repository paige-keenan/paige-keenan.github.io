const imageUploader = document.querySelector('#image-uploader');
const imageContainer = document.querySelector('#image-container');
const cropButton = document.querySelector('#crop-image');
const selectEl = document.querySelector('select');
const downloadButton = document.querySelector('.download-button');
let cropper = '';
let animaleImgSrc = '';
let uploadedImageSrc = '';
let finalImageSrc = '';

setupCropper = () => {
  cropper = new Cropper(imageContainer, {
    checkCrossOrigin: false,
    dragMode: 'move',
    aspectRatio: 4 / 4,
    autoCropArea: 0.8,
    restore: false,
    guides: false,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    minContainerHeight: 500,
    toggleDragModeOnDblclick: false,
    viewMode: 1,
  });
}

loadFile = (event) => {
  uploadedImageSrc = URL.createObjectURL(event.target.files[0]);
  imageContainer.src = uploadedImageSrc;
  document.querySelector('.crop-image').classList.remove('hide');
  setupCropper();
}

cropImage = () => {
  const imgurl = cropper.getCroppedCanvas({ 
    width: 300,
    height: 300,
    minWidth: 300,
    minHeight: 300,
    maxWidth: 300,
    maxHeight: 300,
    fillColor: '#fff',
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high'
  }).toDataURL();

  imageContainer.src = imgurl;
  uploadedImageSrc = imgurl;
  imageContainer.classList.remove('cropper-hidden');
  document.querySelector('.step-2').classList.remove('hide');
  document.querySelector('.cropper-container').classList.add('hide');
  cropButton.classList.add('hide');
}

onSelectChange = (event) => {
  animaleImgSrc = event.target.value
  document.querySelector('.animal-image-container').src = animaleImgSrc;
  document.querySelector('.images').classList.add('active');
  document.querySelector('.step-4').classList.remove('hide');
}

onDownloadClick = (event) => {
  event.preventDefault();

  // Merge images
  mergeImages([
    { src: uploadedImageSrc, x: 0, y: 0 },
    { src: animaleImgSrc, x: 0, y: 0, opacity: .5 }
  ],{
    width: 300,
    height: 300
  })
  .then((b64) => {
    finalImageSrc = b64;
    document.querySelector('.new-image').src = finalImageSrc;
    document.querySelector('.animal-image-container').classList.add('hide');
    imageContainer.classList.add('hide');

    // Download Image
    var a = document.createElement('a');
    a.href = finalImageSrc;
    a.setAttribute('download', 'slack-photo');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })
}

imageUploader.addEventListener('change', loadFile);
cropButton.addEventListener('click', cropImage);
selectEl.addEventListener('change', onSelectChange);
downloadButton.addEventListener('click', onDownloadClick);