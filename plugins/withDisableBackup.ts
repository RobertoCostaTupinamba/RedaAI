import { ConfigPlugin, withAndroidManifest } from "expo/config-plugins"
import { ExpoConfig } from "expo/config"

/**
 * Expo Config Plugin para desabilitar o backup automático no Android.
 * Isso impede que o sistema restaure os dados persistidos após desinstalação/reinstalação.
 */
export const withDisableBackup: ConfigPlugin = (config: ExpoConfig) => {
  return withAndroidManifest(config, (modConfig) => {
    const androidManifest = modConfig.modResults
    const app = androidManifest.manifest.application?.[0]

    if (app && app.$) {
      // Desabilita backup automático
      app.$["android:allowBackup"] = "false"
      app.$["android:fullBackupContent"] = "false"
    }
    return modConfig
  })
}

export default withDisableBackup
