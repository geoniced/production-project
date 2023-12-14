import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BabelLoaderBuildOptions extends BuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BabelLoaderBuildOptions) {
  const isProd = !isDev;

  const babelRemovePropsPluginConfig = [
    babelRemovePropsPlugin,
    {
      props: ['data-testid'],
    },
  ];

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: [
          ['@babel/plugin-transform-typescript', { isTSX: isTsx }],
          '@babel/plugin-transform-runtime',
          isTsx && isProd && babelRemovePropsPluginConfig,
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
  };
}
