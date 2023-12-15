export const API = 'http://localhost:1337/api/';

export const urlAdmin = 'http://localhost:1337';

export function getContent(path){
    return fetch(API + path).then((result) => result.json());
}