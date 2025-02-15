import { View, Text, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useStores } from "../models"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import { useThemeStore } from "@/utils/useAppTheme"

export function DrawerContent({ navigation }: DrawerContentComponentProps) {
  const {
    authenticationStore: { logout, authEmail },
  } = useStores()
  const { isDark, toggleTheme } = useThemeStore()

  const menuItems = [
    {
      title: "Perfil",
      icon: "person",
      onPress: () => {
        // TODO: Implementar navegação para o perfil
        navigation.closeDrawer()
      },
    },
    {
      title: "Configurações",
      icon: "settings",
      onPress: () => {
        navigation.navigate("Settings")
        navigation.closeDrawer()
      },
    },
    {
      title: "Tema",
      icon: isDark ? "light-mode" : "dark-mode",
      onPress: toggleTheme,
    },
    {
      title: "Ajuda",
      icon: "help",
      onPress: () => {
        // TODO: Implementar navegação para ajuda
        navigation.closeDrawer()
      },
    },
    {
      title: "Sair",
      icon: "logout",
      onPress: () => {
        logout()
        navigation.closeDrawer()
      },
    },
  ]

  return (
    <View className={`flex-1 ${isDark ? "bg-surface-dark" : "bg-surface"}`}>
      {/* Header do Menu */}
      <View className={`p-4 ${isDark ? "bg-primary-dark" : "bg-primary"} pt-10`}>
        <Text className={`text-2xl font-bold ${isDark ? "text-text-dark" : "text-white"} mb-2`}>
          RedaAI
        </Text>
        <Text className={`${isDark ? "text-text-dark" : "text-white"} opacity-80`}>
          {authEmail}
        </Text>
      </View>

      {/* Lista de Itens do Menu */}
      <View className="flex-1 pt-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center px-4 py-3 ${
              isDark ? "active:bg-gray-800" : "active:bg-gray-100"
            }`}
            onPress={item.onPress}
          >
            <MaterialIcons
              name={item.icon as any}
              size={24}
              color={isDark ? "#9CA3AF" : "#4B5563"}
            />
            <Text className={`ml-3 ${isDark ? "text-text-dark" : "text-text"} text-base`}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Versão do App */}
      <View className={`p-4 border-t ${isDark ? "border-border-dark" : "border-border"}`}>
        <Text
          className={`${isDark ? "text-text-secondary-dark" : "text-text-secondary"} text-sm text-center`}
        >
          Versão 1.0.0
        </Text>
      </View>
    </View>
  )
}
