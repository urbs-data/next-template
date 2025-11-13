import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Parameters',
    url: '/dashboard/parameters',
    icon: 'userPen',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: 'Main',
        url: '/dashboard/parameters',
        icon: 'dashboard',
        shortcut: ['m', 'm']
      },
      {
        title: 'HTS Codes',
        url: '/dashboard/parameters/HTS',
        icon: 'page',
        shortcut: ['m', 'm']
      },
      {
        title: 'Inland Parameters',
        url: '/dashboard/parameters/inland_parameter',
        icon: 'chevronLeft',
        shortcut: ['m', 'm']
      },
      {
        title: 'Ocean Freight',
        url: '/dashboard/parameters/inland',
        icon: 'chevronLeft',
        shortcut: ['m', 'm']
      },
      {
        title: 'Ground Freight',
        url: '/dashboard/parameters/inland',
        icon: 'chevronLeft',
        shortcut: ['m', 'm']
      },
      {
        title: 'Port Cost',
        url: '/dashboard/parameters/inland',
        icon: 'chevronLeft',
        shortcut: ['m', 'm']
      },
      {
        title: 'Tariff Parameters',
        url: '/dashboard/parameters/inland',
        icon: 'warning',
        shortcut: ['m', 'm']
      },
      {
        title: 'Vendor Ports',
        url: '/dashboard/parameters/inland',
        icon: 'employee',
        shortcut: ['m', 'm']
      },
      {
        title: 'Tariff HTS Exceptions',
        url: '/dashboard/parameters/inland',
        icon: 'close',
        shortcut: ['m', 'm']
      },
      {
        title: 'Incoterm Cost Group ',
        url: '/dashboard/parameters/inland',
        icon: 'close',
        shortcut: ['m', 'm']
      },
      {
        title: 'Other Parameters',
        url: '/dashboard/parameters/inland',
        icon: 'help',
        shortcut: ['m', 'm']
      }
    ]
  },
  /* 
  "dashboard" | "logo" | "login" | "close" | "product" | "close" | 
  "kanban" | "chevronLeft" | "chevronRight" | "trash" | "employee" | 
  "post" | "page" | "userPen" | "user2" | "media" | "settings" | "billing" | 
  "ellipsis" | "add" | "warning" | "user" | "arrowRight" | "help" | "pizza" | 
  "sun" | "moon" | "laptop" | "github" | "twitter" | "check" | undefined
  */
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
