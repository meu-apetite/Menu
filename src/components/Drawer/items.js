import CategoryIcon from '@mui/icons-material/Category'
import HomeIcon from '@mui/icons-material/Home'
import InventoryIcon from '@mui/icons-material/Inventory'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import SettingsIcon from '@mui/icons-material/Settings'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import GridViewIcon from '@mui/icons-material/GridView'

const items = [
  [
    {
      text: 'Início',
      link: '/admin',
      Icon: () => <HomeIcon />,
    },

    {
      text: 'Pedidos',
      link: '/admin/orders',
      Icon: () => <LocalShippingIcon />,
    },
  ],

  [
    {
      text: 'Produtos',
      link: '/admin/products',
      Icon: () => <GridViewIcon />,
    },

    {
      text: 'Estoque',
      link: '/admin/inventory',
      Icon: () => <InventoryIcon />,
    },

    {
      text: 'Categorias',
      link: '/admin/categories',
      Icon: () => <CategoryIcon />,
    },

    {
      text: 'Desconto',
      link: '/admin/discounts',
      Icon: () => <LocalOfferIcon />,
    },

    {
      text: 'Formas de pagamento',
      link: '/admin/payment-methods',
      Icon: () => <MonetizationOnIcon />,
    },
  ],

  [
    {
      text: 'QR Code da loja',
      link: '/admin/',
      Icon: () => <QrCode2Icon />,
    },

    {
      text: 'Aparência da loja',
      link: '/admin/',
      Icon: () => <FormatPaintIcon />,
    },

    {
      text: 'Configurações',
      link: '/admin/produto',
      Icon: () => <SettingsIcon />,
    },
  ],
]

export default items
