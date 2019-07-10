import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  error: boolean;
  title = 'json-file-upload-parse';

  openFile(evt): void {
    const file = evt.target.files[0];
    const fileName = evt.target.previousElementSibling.textContent = file.name;
    const fileNameArray = fileName.split('.');
    const fileExtension = fileNameArray[fileNameArray.length - 1];
    console.log('Step-1 : File Selected');
    this.checkFileExtension(fileExtension, file);
  }


  /*File Extension Validation*/
  checkFileExtension(fileExt, file) {
    if (fileExt !== 'json') {
      this.error = true;

    } else {
      this.error = false;
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsArrayBuffer(file);
      console.log('Step-2 : File Extension check passed');
    }
  }

  _handleReaderLoaded(e) {
    const arrayBuffer = e.target.result;
    const data = arrayBuffer;
    let o = '', l = 0; const w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    console.log(JSON.parse(o));
    
  }

}
