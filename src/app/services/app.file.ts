import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AppFile {
    async readImage(rawFile: any) {

        const reader: FileReader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };

            reader.onload = (e: any) => {
                const bstr: string = e.target.result;
                resolve(bstr);
            };
            reader.readAsDataURL(rawFile);
        });
    }

    async readFile(rawFile: any) {

        const reader: FileReader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };

            reader.onload = (e: any) => {
                const bstr: string = e.target.result;
                resolve(bstr);
            };
            reader.readAsBinaryString(rawFile);
        });
    }

    async read(rawFile: any) {

        const reader: FileReader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };

            reader.onload = (e: any) => {
                const bstr: string = e.target.result;
                resolve(bstr);
            };
            reader.readAsText(rawFile);
        });
    }
}