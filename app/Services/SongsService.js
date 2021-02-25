import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  constructor(){
    console.log("Song Service On");
    
  }
  /** const
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    console.log(ProxyState.songs );
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(ProxyState.songs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    try{
      let res = await sandBoxApi.get("")
      ProxyState.playlist = res.data.map(s=> new Song(s))
    } catch(error) {
      console.error(error)
    }
  }



  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(trackId) {
    try{
      let song = ProxyState.songs.find(s=> s.trackId == trackId)
      console.log("found song" , song) 
      let res = await sandBoxApi.post("", song)
      console.log(res);
      ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
try{
  await sandBoxApi.delete(id)
  this.getMySongs()
} catch (error) {
  console.error(error)
}
  }
}

const service = new SongsService();
export default service;
