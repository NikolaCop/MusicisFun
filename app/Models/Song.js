export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data._id || data.id;
    this.trackId = data.trackId
  }

  get Template() {
    return /*html*/`
                <div class="row">
                    <div class="col-12">
                        <div class="card" style="width: 18rem;">
                            <div class="col-4">

                                <img src="${this.albumArt}" alt="...">
                            </div>
                            <div class="col-8">

                                <div class="card-body">
                                    <h5> ${this.artist} </h5>
                                    <h5> ${this.title} </h5>
                                    <audio controls>
                                     <source src="${this.preview}" type="audio/ogg">                                   
                                      </audio>
                                     ${this.buttonBuilder}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
  }

  get buttonBuilder(){
    if(this._id){
      return `
      <button type="button" class="btn btn-warning" onclick="app.songsController.removeSong('${this._id}')">Remove Song</button>
      `
    }
    return `
     <button type="button" class="btn btn-primary" onclick="app.songsController.addSong('${this.trackId}')">Add Mofo to playlists</button>`
  }


  get playlistTemplate() {
    return /*html*/ `
    <div class = "card p-2">
    <h1> ${this.artist} : ${this.title} </h1>
    <img src= "${this.albumArt}">
    </div>
    `;
  }
  
}
