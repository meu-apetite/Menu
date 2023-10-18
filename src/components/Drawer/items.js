const items = [
  [
    {
      text: 'Início',
      link: '/admin',
      Icon: () => <i className="fas fa-home"></i>,
    },

    {
      text: 'Pedidos',
      link: '/admin/orders',
      Icon: () => <i className="fas fa-shopping-cart"></i>,
    },
  ],

  [
    {
      text: 'Produtos',
      link: '/admin/products',
      Icon: () => <i className="fas fa-cube"></i>,
    },

    {
      text: 'Categoria',
      link: '/admin/categories',
      Icon: () => <i className="fas fa-tags"></i>,
    },

    {
      text: 'Formas de pagamento',
      link: '/admin/setting',
      Icon: () => <i className="fas fa-money-bill"></i>
    }
  ],

  [
    {
      text: 'QR Code',
      link: '/admin/qr-code',
      Icon: () => <i className="fas fa-qrcode"></i>,
    },

    {
      text: 'Aparência da loja',
      link: '/admin/appearance',
      Icon: () => <i className="fas fa-paint-brush"></i>,
    },

    {
      text: 'Configurações',
      link: '/admin/setting',
      Icon: () => <i className="fas fa-cog"></i>,
    },
  ],
]

export default items
