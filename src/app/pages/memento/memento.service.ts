import { Injectable } from '@angular/core';
import { IMementoCard, THINGS } from './memento.list';
import { shuffle } from '../../helpers/shuffle.helper';

@Injectable({
  providedIn: 'root',
})
export class MementoService {

  constructor() { }

  getJSONList(): IMementoCard[] {
    const list: IMementoCard[] = [];
    shuffle(THINGS.items).forEach(title => {
      const id = title.replace(/\s/g, '_').toLowerCase();
      const src = THINGS.meta.img.base + THINGS.meta.img.prefix + id + THINGS.meta.img.suffix;
      list.push({ id, title, src });
    });
    return list;
  }

}
