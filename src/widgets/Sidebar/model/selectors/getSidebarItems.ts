import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: 'isAppRedisigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
      text: 'Main',
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: 'isAppRedisigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
      text: 'About',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: 'isAppRedisigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        text: 'Profile',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: 'isAppRedisigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated,
        }),
        text: 'Articles',
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
});
