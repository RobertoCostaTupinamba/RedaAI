import React from "react"
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Switch } from "react-native"
import { useThemeStore } from "@/utils/useAppTheme"
import { MaterialIcons } from "@expo/vector-icons"
import { useMMKVString } from "react-native-mmkv"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useStores } from "@/models"
import checkForUpdates from "@/utils/checkForUpdates"
import { useState } from "react"
import Constants from "expo-constants"
import { updateId } from "expo-updates"

export const SettingsScreen = observer(() => {
  const navigation = useNavigation()
  const { isDark, toggleTheme } = useThemeStore()
  const { theme } = useAppTheme()
  const [notificationsEnabled, setNotificationsEnabled] = useMMKVString("notifications_enabled")
  const {
    authenticationStore: { authEmail },
  } = useStores()
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false)

  const getShortVersionId = (id: string) => {
    return id ? id.slice(-6) : "N/A"
  }

  const handleCheckUpdate = async () => {
    setIsCheckingUpdate(true)
    try {
      await checkForUpdates(true)
    } finally {
      setIsCheckingUpdate(false)
    }
  }

  const SettingItem = ({
    icon,
    title,
    description,
    onPress,
    rightElement,
  }: {
    icon: keyof typeof MaterialIcons.glyphMap
    title: string
    description?: string
    onPress?: () => void
    rightElement?: React.ReactNode
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}
      disabled={!onPress}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          isDark ? "bg-primary-dark/20" : "bg-primary/10"
        }`}
      >
        <MaterialIcons name={icon} size={24} color={isDark ? "#9CA3AF" : "#4B5563"} />
      </View>
      <View className="flex-1 ml-3">
        <Text className={`text-base font-medium ${isDark ? "text-text-dark" : "text-gray-800"}`}>
          {title}
        </Text>
        {description && (
          <Text
            className={`text-sm mt-0.5 ${isDark ? "text-text-secondary-dark" : "text-gray-600"}`}
          >
            {description}
          </Text>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-background-dark" : "bg-gray-50"}`}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View className={`${isDark ? "bg-surface-dark" : "bg-white"}`}>
        <View className="px-4 py-4 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <MaterialIcons name="arrow-back" size={24} color={isDark ? "#9CA3AF" : "#4B5563"} />
          </TouchableOpacity>
          <View>
            <Text className={`text-xl font-bold ${isDark ? "text-text-dark" : "text-gray-800"}`}>
              Configurações
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              {authEmail}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className={`py-2 ${isDark ? "bg-surface-dark" : "bg-white"}`}>
          <Text
            className={`px-4 py-2 text-sm font-medium ${
              isDark ? "text-text-secondary-dark" : "text-gray-600"
            } uppercase`}
          >
            Preferências
          </Text>

          <SettingItem
            icon="dark-mode"
            title="Modo Escuro"
            description="Alterar entre tema claro e escuro"
            rightElement={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#E5E7EB", true: "#374151" }}
                thumbColor={isDark ? "#60A5FA" : "#3B82F6"}
              />
            }
          />

          <SettingItem
            icon="notifications"
            title="Notificações"
            description="Receber alertas sobre correções e novos temas"
            rightElement={
              <Switch
                value={notificationsEnabled === "true"}
                onValueChange={(value) => setNotificationsEnabled(value ? "true" : "false")}
                trackColor={{ false: "#E5E7EB", true: "#374151" }}
                thumbColor={notificationsEnabled === "true" ? "#60A5FA" : "#3B82F6"}
              />
            }
          />
        </View>

        <View className={`mt-2 ${isDark ? "bg-surface-dark" : "bg-white"}`}>
          <Text
            className={`px-4 py-2 text-sm font-medium ${
              isDark ? "text-text-secondary-dark" : "text-gray-600"
            } uppercase`}
          >
            Conta
          </Text>

          <SettingItem
            icon="person"
            title="Perfil"
            description="Editar informações pessoais"
            onPress={() => {
              /* TODO: Navegação para perfil */
            }}
          />

          <SettingItem
            icon="security"
            title="Segurança"
            description="Alterar senha e configurações de privacidade"
            onPress={() => {
              /* TODO: Navegação para segurança */
            }}
          />
        </View>

        <View className={`mt-2 ${isDark ? "bg-surface-dark" : "bg-white"}`}>
          <Text
            className={`px-4 py-2 text-sm font-medium ${
              isDark ? "text-text-secondary-dark" : "text-gray-600"
            } uppercase`}
          >
            Sobre
          </Text>

          <SettingItem
            icon="system-update"
            title="Verificar Atualizações"
            description={isCheckingUpdate ? "Verificando..." : "Buscar nova versão do app"}
            onPress={handleCheckUpdate}
            rightElement={
              isCheckingUpdate && (
                <ActivityIndicator size="small" color={isDark ? "#9CA3AF" : "#4B5563"} />
              )
            }
          />

          <SettingItem
            icon="info"
            title="Versão do App"
            description={`${Constants.expoConfig?.version} (${getShortVersionId(updateId ?? "")})`}
          />

          <SettingItem
            icon="help"
            title="Ajuda e Suporte"
            description="Dúvidas frequentes e contato"
            onPress={() => {
              /* TODO: Navegação para ajuda */
            }}
          />

          <SettingItem
            icon="description"
            title="Termos de Uso"
            onPress={() => {
              /* TODO: Navegação para termos */
            }}
          />

          <SettingItem
            icon="privacy-tip"
            title="Política de Privacidade"
            onPress={() => {
              /* TODO: Navegação para privacidade */
            }}
          />
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  )
})
