import { faker } from '@faker-js/faker';
import { Product } from '../types';

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty'];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  for (let i = 0; i < 50; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      image: `https://picsum.photos/400/300?random=${i}`,
      category: faker.helpers.arrayElement(categories),
      description: faker.commerce.productDescription(),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)),
      reviews: faker.number.int({ min: 5, max: 500 }),
      inStock: faker.datatype.boolean(0.85),
    });
  }
  
  return products;
};

export const products = generateProducts();
