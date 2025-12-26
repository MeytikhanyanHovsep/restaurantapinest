import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { readFileSync } from 'fs';
import Fuse from 'fuse.js';
import data from '../data';

@Injectable()
export class ProductsService {
  private bestProducts: number[] = [100001, 100081, 100200, 100022];

  findProducts(category: string) {
    if (category) {
      return Object.values(data).filter((e: any) => e.category == category);
    }
    return data;
  }

  findOne(id: number) {
    return data[id];
  }

  findBests() {
    return this.bestProducts.map((e) => data[e]);
  }

  search(text: string) {
    const products = Object.values(data);

    const fuse = new Fuse(products, {
      keys: ['name', 'category'], // поля, по которым ищем
      threshold: 0.3, // чем меньше, тем строже поиск
    });

    return fuse.search(text).map((result) => result.item);
  }

  findCartItems(ids: string) {
    if (ids.includes(',')) {
      return ids.split(',').map((elm) => data[elm]);
    }
    return [data[ids]];
  }
}
