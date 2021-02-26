import songsService from "../Services/SongsService.js";
import { ProxyState } from "../AppState.js"

//Private
/**Draws the Search results to the page */
function _drawResults() {
let songs = ProxyState.songs 
let template = ""
songs.forEach(s=> template += `<li> ${s.Template} </li>`)
document.getElementById("songs").innerHTML=template;
console.log(ProxyState.songs)
}




function _drawPlaylist() {
let songs = ProxyState.playlist
let template = ""
songs.forEach(s=> template += `<li onclick="app.songsController.removeSong('${s._id}')"> ${s.Template} </li>`)
document.getElementById("playlist").innerHTML=template;
console.log(ProxyState.songs)
console.log(ProxyState.playlist);
 }

//Public
export default class SongsController {
  constructor() {
    ProxyState.on("songs",_drawResults)
    ProxyState.on("playlist", _drawPlaylist)
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    
   
    e.preventDefault();
    try {
      songsService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }


  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(trackId) {
songsService.addSong(trackId);

   }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    songsService.removeSong(id);
   }
}
