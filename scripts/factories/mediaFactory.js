import Photo from "./mediaPhoto.js"
import Video from "./mediaVideo.js"

export default class MediaFactory{
    constructor(data, name){
        if(data.image){
            return new Photo(data, name)
        }
        else if(data.video){
            return new Video(data, name)
        }
        else{
            console.error('neither image nor video in this data')
        }
    }
}
