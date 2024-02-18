import animationBagEmpty from 'assets/gif/bag-empty.gif';
import { ApplicationUtils } from './ApplicationUtils';

export class ErrorUtils {
  static emptyCart(companyName) {
    return {
      code: 404,
      animation: animationBagEmpty,
      title: 'Vázio!',
      text: 'Nenhum item encontrado na sacola',
      buttonText: 'Voltar ao cardápio',
      buttonAction: () => (document.location.href = `/${companyName}`),
    };
  }

  static notFoundMenu() {
    return {
      code:  404,
      title: 'Não foi possível encontrar o cárdapio',
      text: 'Verfique o endereço e tente novamente',
      buttonText: 'Voltar ao iníco'
    };
  }

  static retrieveOrder(companyName) {
    return {
      code: 500,
      title: 'Não foi possível recuperar o seu pedido',
      buttonText: 'Limpar pedido',
      buttonAction: () => {
        ApplicationUtils.clearCart(companyName);
        document.location.href = `/${companyName}`;
      },
      text:'Não conseguimos recuperar os dados do seu pedido. Atualize a página e, se o problema persistir, clique em "Limpar Pedido"',
    };
  }
}