export default class Video{
    constructor(data, name) {              
        this._name = name
        this.filename = data.video
    }

    createTag(){
        const tag = `
        <video loop muted autoplay width="250" class="photographer-media photographer-video">    
            <source src="./assets/sample-photos/${this._name}/${this.filename}"
                type="video/mp4">
        </video>`
        return tag
    }
}