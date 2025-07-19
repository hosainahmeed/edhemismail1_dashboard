import React from 'react';
import { MdDashboard, MdOutlineSupport } from 'react-icons/md';
import { FaCog, FaList } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BiCategory } from 'react-icons/bi';
import { PiSlidersHorizontalBold } from 'react-icons/pi';

export const SidebarRoutes = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: MdDashboard,
    link: '/',
  },
  {
    key: 'home-slides',
    label: 'Home Slides',
    icon: PiSlidersHorizontalBold,
    link: '/home-slides',
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
    children: [
      {
        key: 'listings',
        label: 'Requested Listings',
        link: '/listings',
      },
      {
        key: 'featured-listings',
        label: 'Featured /Urgent ',
        link: '/featured-listings',
      },
    ],
  },
  {
    key: 'category',
    label: 'Category Management',
    icon: BiCategory,
    children: [
      {
        key: 'category',
        label: 'Category',
        link: '/category',
      },
      {
        key: 'subCategory',
        label: 'Sub Category',
        link: '/sub-category',
      },
    ],
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
        key: 'faq',
        label: 'FAQ',
        link: '/dashboard/Settings/faq',
      },
      {
        key: 'profile',
        label: 'Profile',
        link: '/dashboard/Settings/profile',
      },
    ],
  },
];
