// DigitalProduct.js
import { product } from './product.js';

// Digital products like ebooks or courses
export class digitalproduct extends product {
  constructor(id, name, price, stock, fileSize) {
    super(id, name, price, stock); 
    this.fileSize = fileSize;      
  }

  // Method to simulate downloading
  download() {
    console.log(`Downloading ${this.name} (${this.fileSize} MB)`);
  }

  // Override showInfo to add digital info
  showInfo() {
    super.showInfo();
    console.log(`Type: Digital - Size: ${this.fileSize} MB`);
  }
}
