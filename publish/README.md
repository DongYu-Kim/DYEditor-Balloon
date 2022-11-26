# DYEditor-Balloon
DYEditor-Balloon is 2nd series of DYEditor which is custom made to use [CKEditor5](https://www.npmjs.com/package/ckeditor5) in React.
By using this, you can use CKEditor5-Balloon more conveniently.   
CKEditor5 is a really good library. However, my friends around me found it difficult to use. So I simplified the functions to make them easier to use. And, by making both the Base64 image uploader and storage uploader methods available, you can easily upload images.



## Install
The code source is at [DYEditor-Balloon repository](https://github.com/DongYu-Kim/DYEditor-Balloon/blob/main/src/lib/dyeditor/index.js)
```bash
npm install dyeditor-balloon
```


## Usages
If you use something like reset.css, the style will not be applied.   
   
dyeditor-balloon has 1 component and 3 functions.
```javascript
import DYEditorBalloon, { getData, uploadImages, getEditorTag } from 'dyeditor-balloon';
```

### DYEditorBalloon
DYEditorBalloon component has 3 props.   
```javascript
import DYEditorBalloon from 'dyeditor-balloon';

function ReactComponent({_data, _readOnly, _imageUploader}) {
    return <DYEditorBalloon
        data={_data}
        readOnly={_readOnly}
        imageUploader={_imageUploader} // imageUploader must be a function that takes a file as input and a imageUrl as output.
    />
}
```
#### props
- **data**   
    data is an initial value. The default value is "".   
- **readOnly**   
    You can select read mode or write mode. true is read mode, false is write mode. The default value is false, which is read mode.
- **imageUploader**   
    You can use Base64 image upload, storage image upload, or no image upload. If imageUploader is a function, it uses image upload. Which image upload to use is covered in the description of [uploadImages](#uploadImages). The default value is null, and image upload is not used.
    **imageUploader must be a function that takes a file as input and a imageUrl as output.**

### getData
When the getData function is called, the created html of DYEditorBalloon is returned.

### uploadImages
The uploadImages function saves the Base64 image of DYEditorBalloon as a file in the user's storage and converts it to an image URL. Therefore, after executing uploadImages, it is recommended to save the return value of getData() in the Database.
If you want to save the Base64 image to the database, you can use the return value of getData() without executing uploadImages.
uploadImages is an async function.
```javascript
import { getData, uploadImages } from 'dyeditor-balloon';

let content;
// use Base64
content = getData();
// use storage
uploadImages().then(results=>{ // results is the success or failure of uploadimages
    content = getData();
})
```

### getEditorTag
When you want to customize the editor ui, use the getEditorTag function. getEditorTag is an async function that returns an editor HTML element.
```javascript
import { getEditorTag } from 'dyeditor-balloon';

getEditorTag().then(editorHTMLTag=>{
    // customize editor ui
})
```


## Example
You can run an example using dkeditor-balloon in [DYEditor-Balloon repository](https://github.com/DongYu-Kim/DYEditor-Balloon).
```bash
git clone https://github.com/DongYu-Kim/DYEditor-Balloon.git
cd dyeditor-balloon
npm install
npm run start
```


## Contribution
Contribute by fixing documentation, reporting code errors, etc...   
Sending an e-mail is probably the fastest way to respond.