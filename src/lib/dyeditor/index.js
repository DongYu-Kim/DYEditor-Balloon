import React, { useEffect, useRef } from 'react';
import BalloonEditor from './ckeditor';
import { switchToReadMode, removeImageUploadElement, dataURLtoFile, isBase64Image, initializeEditor, resizeImage } from './function';

let flag = false;
export default React.memo(function DYEditorBalloon ({data = "", readOnly = false, imageUpload = {uploader: null, resizing: false}, style = {}}) {
    flag = false;
    const DYEditorEl = useRef();
    useEffect(() => {
        flag = !flag;
        if(flag) {
            BalloonEditor.create(DYEditorEl.current)
            .then(editor => {
                _editor = editor;
                _editor.setData(data);
                initializeEditor(_editor, style);
                state = true;
                if(imageUpload.uploader === null) removeImageUploadElement();
                else if(typeof imageUpload.uploader === 'function') setUploadImages(_editor, imageUpload.uploader, imageUpload.resizing);
                if(readOnly) switchToReadMode(_editor);
                getData = () => _editor.getData();
            })
            .catch(err => console.error(err));
        }
        return ()=>{
            if(_editor && _editor.state !== "destroyed") {
                const _data = _editor.getData();
                getData = () =>{
                    if(_editor.getData()) return _editor.getData();
                    else return _data;
                }
                _editor.destroy();
            }
            state = false;
        };
    })
    if(typeof data !== "string") console.error("data must be a string.")
    if(typeof readOnly !== "boolean") console.error("readOnly must be a boolean")
    
    return <div ref={DYEditorEl} />
});

let _editor = null;
export let getData = ()=>console.error("getData can be called after the DYEditorBalloon component is created.");
export let uploadImages = async()=>console.error("uploadImages is available only after adding imageUploader."); // If not called, the Base64 upload method is used.
function setUploadImages(_editor, imageUploader, resizing) {
    uploadImages = async() => {
        const promises = [];
        let _data = _editor.getData();
        const _getData = () => (() => _data)();
        const _setData = (data) => _data = data;
        for(const imgEl of _editor.ui.element.getElementsByTagName('img')) {
            if(isBase64Image(imgEl)) {
                const promise = new Promise(async(resolve, reject) => {
                    const resizedImage = resizing ? await resizeImage(imgEl.src, imgEl.clientWidth, imgEl.clientHeight) : imgEl.src;
                    const imgFile = dataURLtoFile(resizedImage, "img.png");
                    const imgUrl = await imageUploader(imgFile)
                    if(typeof imgUrl !== 'string') {
                        _setData(_getData().replace(imgEl.src, "image upload failed"));
                        reject(new Error("imageUploader should be a function that takes a file as input and a imageUrl as output. \n Or, request or response is wrong."))
                    }
                    else {
                        _setData(_getData().replace(imgEl.src, imgUrl));
                        resolve(imgUrl)
                    }
                })
                promises.push(promise);
            }
        }
        return Promise.allSettled(promises).then(async(results)=>{
            await _editor.setData(_getData())
            getData = () =>{
                if(_editor.getData()) return _editor.getData();
                else return _getData();
            }
            return results
        });
    }
}

let state = false;
const TICK = 10;
const LIMIT = 3000;
async function checkState() {
    let stateFlag = true;
    setTimeout(()=>stateFlag = !stateFlag, LIMIT);
    while(stateFlag && !state)
        await new Promise(resolve => setTimeout(resolve, TICK));
    return stateFlag;
}
export const getEditorTag = async() => {
    return new Promise(async(resolve, reject) => {
        const result = await checkState();
        if (!result) reject(new Error("Failed to get DYEditorBalloon HTML element."));
        else resolve(_editor.sourceElement);
    });
}