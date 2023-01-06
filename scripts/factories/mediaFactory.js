class Media{
    constructor(name){
        this.name = name
    }

    createPath() {
        const src = `./assets/sample-photos/${this.name}`
        return src
    }
}

class Photo extends Media{
    constructor(data, name) {        
        super(name)
        this.filename = data.image
    }

    createTag(){
        const tag = `<img src="${this.createPath()}/${this.filename}" class="photographer-media photographer-image">`
        return tag
    }
}

class Video extends Media{
    constructor(data, name) {        
        super(name)
        this.filename = data.video
    }

    createTag(){
        const tag = `
        <video loop muted autoplay width="250" class="photographer-media photographer-video">    
            <source src="${this.createPath()}/${this.filename}"
                type="video/mp4">
        </video>`
        return tag
    }
}

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
