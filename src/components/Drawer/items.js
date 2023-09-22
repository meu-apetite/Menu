const items = [
  [
    {
      text: 'Início',
      link: '/admin',
      Icon: () => <i class="fas fa-home"></i>,
    },

    {
      text: 'Pedidos',
      link: '/admin/orders',
      Icon: () => <i class="fas fa-shopping-cart"></i>,
    },
  ],

  [
    {
      text: 'Produtos',
      link: '/admin/product',
      Icon: () => <i class="fas fa-cube"></i>,
    },

    {
      text: 'Categoria',
      link: '/admin/categories',
      Icon: () => <i class="fas fa-tags"></i>,
    },

    {
      text: 'Formas de pagamento',
      link: '/admin/setting',
      Icon: () => <i class="fas fa-money-bill"></i>
    }
  ],

  [
    {
      text: 'QR Code',
      link: '/admin/qr-code',
      Icon: () => <i class="fas fa-qrcode"></i>,
    },

    {
      text: 'Aparência da loja',
      link: '/admin/appearance',
      Icon: () => <i class="fas fa-paint-brush"></i>,
    },

    {
      text: 'Configurações',
      link: '/admin/setting',
      Icon: () => <i class="fas fa-cog"></i>,
    },
  ],
]

export default items
