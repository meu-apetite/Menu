export class ApplicationUtils {
  static async getCartInLocalStorage(companyName) {
    const cart = localStorage.getItem(companyName);
    return JSON.parse(cart) || null;
  }

  static async getProductsInLocalStorage(companyName) {
    const cartString = localStorage.getItem(companyName);
    const cart = await JSON.parse(cartString);

    if (!cart) return [];
    
    return cart.products || [];
  }

  static setDataInLocalStorage(companyName, data) {
    localStorage.setItem(companyName, JSON.stringify(data));
  }

  static clearCart(companyName) {
    if (companyName) localStorage.removeItem(companyName);
  };

  static formatPrice(price) {
    if (!price) return;

    return price.toLocaleString(
      'pt-BR', 
      { style: 'currency', currency: 'BRL' }
    ) || 'R$ 0,00';
  }
}