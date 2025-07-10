import React from 'react';
import { MdDashboard, MdOutlineSupport } from 'react-icons/md';
import { FaCog, FaList } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BiCategory } from 'react-icons/bi';

export const SidebarRoutes = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: MdDashboard,
    link: '/',
  },
  {
    key: 'userManagement',
    label: 'User management',
    icon: FaRegCircleUser,
    link: '/user/all-user',
  },
  {
    key: 'listings',
    label: 'Listings',
    icon: FaList,
    link: '/listings',
  },
  {
    key: 'category',
    label: 'Category',
    icon: BiCategory,
    link: '/category',
  },
  {
    key: 'support',
    label: 'Support',
    icon: MdOutlineSupport,
    link: '/support',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: FaCog,
    link: '/dashboard/Settings/profile',
    children: [
      {
        key: 'terms',
        label: 'Terms & Condition',
        link: '/dashboard/Settings/Terms&Condition',
      },
      {
        key: 'privacy',
        label: 'Privacy Policy',
        link: '/dashboard/Settings/PrivacyPolicy',
      },
      {
        key: 'profile',
        label: 'Profile',
        link: '/dashboard/Settings/profile',
      },
    ],
  },
];
