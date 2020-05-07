function displayImage(imageSrc, imageAlt) {
	var bigImage = document.getElementById("bigImage");
	bigImage.src = imageSrc;
	bigImage.alt = imageAlt;
	var overlayFrame = document.getElementById("overlayFrame");
	overlayFrame.style.display = "block";
	var imageFrame = document.getElementById("imageFrame");
	imageFrame.style.display = "block";
}

function closeImage() {
	var overlayFrame = document.getElementById("overlayFrame");
	overlayFrame.style.display = "none";
	var imageFrame = document.getElementById("imageFrame");
	imageFrame.style.display = "none";
}
