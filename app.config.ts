import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    owner: "robertotupi",
    slug: "redaai",
    updates: {
      url: "https://u.expo.dev/d0a7ff2b-7dff-4a67-abe8-145c24dc0098",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: "d0a7ff2b-7dff-4a67-abe8-145c24dc0098",
      },
    },
    plugins: [...existingPlugins, require("./plugins/withSplashScreen").withSplashScreen],
  }
}
