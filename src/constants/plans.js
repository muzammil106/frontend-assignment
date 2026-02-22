export const PLANS = [
  {
    id: 'just-mates',
    name: 'Just mates',
    price: 'Free',
    priceRaw: 0,
    features: [
      { text: 'Bring your own GPS', icon: 'padlock' },
      { text: 'Mileage reporting to be done by you', icon: 'users' },
      { text: 'In-person key handover to guests', icon: 'handshake' },
    ],
  },
  {
    id: 'good-mates',
    name: 'Good mates',
    price: '$10/month',
    priceRaw: 10,
    features: [
      { text: 'Primary GPS included', icon: 'globe' },
      { text: 'Automated mileage calculations', icon: 'users' },
      { text: 'In-person key handover to guests', icon: 'handshake' },
    ],
  },
  {
    id: 'best-mates',
    name: 'Best mates',
    price: '$30/month',
    priceRaw: 30,
    features: [
      { text: 'Keyless access technology', icon: 'key' },
      { text: 'Automated mileage calculations', icon: 'users' },
      { text: 'Remote handover to guests', icon: 'cloud' },
    ],
  },
];

export const ADDONS = [
  { id: 'byo-secondary-gps', label: 'BYO secondary GPS - $5/month', price: 5, disabled: false },
  { id: 'between-trip-insurance', label: 'Between trip insurance', price: 0, disabled: true, comingSoon: true },
];
