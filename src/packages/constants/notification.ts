export type NOTIFICATION = {
  id: number
  title: string
  description: string
}

export const NOTIFICATIONS: NOTIFICATION[] = [
  {
    id: 1,
    title: 'New version',
    description: 'Notify when a new app version is released.',
  },
  {
    id: 2,
    title: 'Account update',
    description: 'Notify when your account information or security settings change.',
  },
  {
    id: 3,
    title: 'Product update',
    description: 'Notify when a product you follow is updated.',
  },
  {
    id: 4,
    title: 'Payment update',
    description:
      'Notify when there is a change in payment status, such as a successful charge or refund.',
  },
  {
    id: 5,
    title: 'Order update',
    description: 'Notify when the status of your order changes, such as shipped or delivered.',
  },
  {
    id: 6,
    title: 'Daily update',
    description: 'Receive a daily summary of your account activity.',
  },
  {
    id: 7,
    title: 'Server update',
    description: 'Notify when there is scheduled maintenance or downtime on the server.',
  },
]
