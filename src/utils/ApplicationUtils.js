import { createTheme } from "@mui/material";

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

  static getStatusColor(status) {
    switch (status) {
      case 'OrderReceived':
        return 'primary';
      case 'Processing':
        return 'info';
      case 'WaitingForPaymentConfirmation':
        return 'warning';
      case 'Shipped':
        return 'success';
      case 'Concluded':
        return 'success';
      case 'Cancelled':
        return 'error';
      case 'WaitingForPickup':
        return 'info';
      default:
        return 'default';
    }
  };

  static formatPrice(price) {
    if (!price) return;

    return price.toLocaleString(
      'pt-BR', 
      { style: 'currency', currency: 'BRL' }
    ) || 'R$ 0,00';
  }

  static formatDate(dateString) {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', options);
  }

  static createCustomTheme(colorPrimary, colorSecondary) {
    return createTheme({
      palette: {
        primary: { main: colorPrimary || '#800080' },
        secondary: { main: colorSecondary || '#CD5C5C' },
      },
      typography: { fontFamily: 'Roboto, sans-serif' },
      spacing: (factor) => `${0.5 * factor}rem`,
    });
  };
}