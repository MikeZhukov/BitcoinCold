var privateKeyFile = document.getElementById("fileKey");
privateKeyFile.addEventListener("change", function(event) {
  var keyFile = privateKeyFile.files[0];
var fileReader = new FileReader();
fileReader.onload = function() {
  window.fileContent = fileReader.result.slice(fileReader.result.indexOf(',') + 1);
  hideId('helpButton');
  hideId('licenseButton');
displayId('receiveButton','inline');
displayId('sendButton','inline');
}
fileReader.readAsDataURL(keyFile);

}, false);
