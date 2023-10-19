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
      Icon: () => <i className="fas fa-motorcycle"></i>,
    },
 
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
      text: 'Endereço',
      link: '/admin/address',
      Icon: () => <i className="fas fa-map-location"></i>,
    },

    {
      text: 'Formas de pagamento',
      link: '/admin/setting',
      Icon: () => <i className="fas fa-money-bill"></i>
    },

    {
      text: 'Loja',
      link: '/admin/appearance',
      Icon: () => <i className="fas fa-store"></i>,
    },

    {
      text: 'Administrador',
      link: '/admin/info-admin',
      Icon: () => <i className="fas fa-user"></i>,
    },
  ],
]

export default items
