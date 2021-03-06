import { serverUrl } from '../utils/EnvProvider';

const SERVER_BASE_URL = serverUrl();

export const ENDPOINTS = {
    library: SERVER_BASE_URL + "/library",
    artists: SERVER_BASE_URL + "/artists",
    streamSong: SERVER_BASE_URL + '/stream',
    addToLibrary: SERVER_BASE_URL + '/add',
    deleteSong: SERVER_BASE_URL + '/delete',
    editSong: SERVER_BASE_URL + '/edit',
    lyrics: SERVER_BASE_URL + '/lyrics',
    importLibrary: SERVER_BASE_URL + '/library/import',
}