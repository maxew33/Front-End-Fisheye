/**
 *  Creation of a video tag with the given video path and title. 
 *  return the DOM element
 * */ 

export default class Video{
    constructor(data) {
        this._videoPath = data.videoPath
        this._title = data.title
    }

    createTag(size){
        
        let tag = ''

        if(size === "min"){
            tag = `<video width="250" class="photographer-media photographer-video" aria-label="${this._title}" tabindex="0">    
                    <source src="${this._videoPath}" type="video/mp4">
                </video>`
        }
        else{
            tag = `<video loop muted controls autoplay width="250" class="photographer-media photographer-video" aria-label="${this._title}" tabindex="0">    
                        <source src="${this._videoPath}" type="video/mp4">
                    </video>`
        }
        
        return tag
    }
}