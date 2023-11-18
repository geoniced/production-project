import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin";
import { BuildOptions } from "../types/config";

interface BabelLoaderBuildOptions extends BuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BabelLoaderBuildOptions) {
  const babelRemovePropsPluginConfig = [
    babelRemovePropsPlugin,
    {
      props: ["data-testid"],
    },
  ];

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
          [
            "i18next-extract",
            {
              locales: ["ru", "en"],
              keyAsDefaultValue: true,
            },
          ],
          ["@babel/plugin-transform-typescript", { isTSX: isTsx }],
          "@babel/plugin-transform-runtime",
          isTsx && !isDev && babelRemovePropsPluginConfig,
          isDev && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
      },
    },
  };
}
