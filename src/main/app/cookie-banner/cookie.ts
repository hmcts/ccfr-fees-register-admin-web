export default class Cookie {
    constructor(public name: string,public cat: string,public  purpose: string,public expires: string) {
        this.name = name;
        this.cat = cat;
        this.purpose = purpose;
        this.expires = expires;
    }
}