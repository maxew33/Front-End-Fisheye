import Photo from "../templates/Photo.js"
import Video from "../templates/Video.js"

export default class MediaFactory{
    constructor(data){
        if(data._image){
            return new Photo(data)
        }
        else if(data._video){
            return new Video(data)
        }
        else{
            console.error('neither image nor video in this data')
        }
    }
}
