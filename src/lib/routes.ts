export const routes = {
  main: {
    home: '/',
    results: '/resultados',
    fip37: '/fip-37-p',
    criptoW: '/cripto-w'
  },
  checkout: {
    promotional: 'https://checkout.k17.com.br/pay/fip-promocional',
    original: 'https://checkout.k17.com.br/pay/fip-original',
    afterPromo: 'https://checkout.k17.com.br/pay/fip-after-promo'
  },
  external: {
    blackbook: 'https://k17.com.br/blackbook',
    contact: 'mailto:contato@k17.com.br'
  }
} as const;

export type RouteKeys = keyof typeof routes.main;
export type CheckoutRouteKeys = keyof typeof routes.checkout;
export type ExternalRouteKeys = keyof typeof routes.external; 