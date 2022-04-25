import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { JsonLdService } from 'ngx-seo';

@Injectable({
    providedIn: 'root'
})
export class AppInfo {
  constructor(
            private title: Title, private meta: Meta,
            private readonly jsonLdService: JsonLdService) { }

  setTitle(title: string){
    this.title.setTitle(title);
  }
 
  setMeta(description: string, keywords: string, author: string, copyright: string, locale: string, url: string, type: string,title: string, ogDescription: string, image: string, site_name: string){
    this.meta.addTags([
    {name: 'description', content: description},
    {name: 'keywords', content: keywords},
    {name: 'author', content: author},
    {name: 'dcterms.rightsHolder', content: copyright},
    {name: 'og:locale', content: locale},
    {name: 'og:url', content: url},
    {name: 'og:type', content: type},
    {name: 'og:title', content: title},
    {name: 'og:description', content: ogDescription},
    {name: 'og:image', content: image},
    {name: 'og:site_name', content: site_name},
    // {charset: 'UTF-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0'}

  ])
  }
  
  setMetaByObject(meta: any){
    this.setMeta(meta.description, meta.keywords, meta.author, meta.copyright, meta.locale, meta.url,
      meta.type, meta.title, meta.ogDescription, meta.image, meta.site_name);
 
  }

  setSchema(schemaType: string, rootURL: string, phone: string, email: string,
            address: string, imageIcon: string, latitude: string, longtitude: string,
            schemaContext: string, name:string){
    const jsonLdObject = this.jsonLdService.getObject(
      schemaType,
      {
        url: rootURL,
        telephone: phone,
        Email: email,
        address: address,
        image: imageIcon,
        latitude: latitude,
        longitude: longtitude,
        name: name
      },
      schemaContext
    );
    this.jsonLdService.setData(jsonLdObject);
  }
}
