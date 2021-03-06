import AbstractService from './AbstractService.js';
export default class TagService extends AbstractService {
    constructor() {
        super();
        this.url = this.baseUrl + "/tags"
    }

    async all(start, page) {
        return await fetch(this.url + `?start=${start}&page=${page}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(res => console.error(res));
    }

    async find(url) {
        const data = await fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(res => console.error(res))
        return data;
    }

    async create(json) {
        return await fetch(this.url,{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)

        });
    }

    async update(url, json) {
        return await fetch(url,{
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)

        });
    }

    async delete(id) {
        return await fetch(`${this.url}/${id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json'
            }
        }).catch(res => console.error(res))
    }
}


