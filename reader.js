function startRead() {
    // obtain input element through DOM

    var file = document.getElementById('data').files[0];
    if(file){
      getAsText(file);
    }
  }
  
  function getAsText(readFile) {
  
    var reader = new FileReader();
  
    // Read file into memory as UTF-16
    reader.readAsText(readFile, "ASCII");
  
    // Handle progress, success, and errors
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
  }
  
  function updateProgress(evt) {
    if (evt.lengthComputable) {
      // evt.loaded and evt.total are ProgressEvent properties
      var loaded = (evt.loaded / evt.total);
      if (loaded < 1) {
        // Increase the prog bar length
        style.width = (loaded * 200) + "px";
      }
    }
  }
  
  function loaded(evt) {
    // Obtain the read file data
    var fileString = evt.target.result;
    // // Handle UTF-16 file dump
    // if(utils.regexp.isChinese(fileString)) {
    //   //Chinese Characters + Name validation
    // }
    // else {
    //   // run other charset test
    // }
    // xhr.send(fileString)
    var arrayjson = fileString.split('\n')
    arrayjson.pop()
    arrayjson.forEach((element, i) => {

      arrayjson[i] = JSON.parse(element)
      //console.log(element)
    });
    rap(arrayjson)
  }
  
  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        console.log("error")
    }
  }