export default class Video{
    constructor(data) {
        this._videoPath = data.videoPath
        this._title = data.title
    }

    createTag(){
        const tag = `
        <video loop muted autoplay width="250" class="photographer-media photographer-video" aria-label="${this._title}">    
            <source src="${this._videoPath}"
                type="video/mp4">
        </video>`
        return tag
    }
}