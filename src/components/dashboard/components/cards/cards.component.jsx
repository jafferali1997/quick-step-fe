import React from 'react';
import DashboardCard from '../card/card.component';

const cards = [
  {
    icon: '/assets/images/dashboard/users.svg',
    trendicon: '/assets/images/dashboard/trendup.svg',
    trendstatus: 'up',
    trendvalue: '20%',
    trendlable: 'Since last week',
    value: '146',
    valuelable: 'Offers'
  },
  {
    icon: '/assets/images/dashboard/users.svg',
    trendicon: '/assets/images/dashboard/trendup.svg',
    trendstatus: 'up',
    trendvalue: '17%',
    trendlable: 'Since last week',
    value: '240',
    valuelable: 'Assignments'
  },
  {
    icon: '/assets/images/dashboard/wallet.svg',
    trendicon: '/assets/images/dashboard/trenddown.svg',
    trendstatus: 'down',
    trendvalue: '20%',
    trendlable: 'Since last week',
    value: '240',
    valuelable: 'Earning'
  },
  {
    icon: '/assets/images/dashboard/wallet.svg',
    trendicon: '/assets/images/dashboard/trendup.svg',
    trendstatus: 'up',
    trendvalue: '15%',
    trendlable: 'Since last week',
    value: '$140.00',
    valuelable: 'Bills',
    extended: [
      {
        id: 'outstandingBills',
        label: 'Outstanding Bills',
        value: 3
      },
      {
        id: 'total',
        label: 'Total',
        value: 481.95
      },
      {
        id: 'overdueInvoices',
        label: 'Overdue Invoices',
        value: '20'
      },
      {
        id: 'total',
        label: 'Total',
        value: '118149.75'
      }
    ]
  }
];

export default function DashboardCards() {
  return (
    <div className="tw-grid tw-gap-7 xs:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
      {cards.map((item) => {
        return <DashboardCard item={item} />;
      })}
    </div>
  );
}
