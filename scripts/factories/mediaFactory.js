import Photo from "../templates/Photo.js"
import Video from "../templates/Video.js"

/* The MediaFactory class is a factory class that returns a new instance of either the Photo or Video
class, depending on the data passed to it. */
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
