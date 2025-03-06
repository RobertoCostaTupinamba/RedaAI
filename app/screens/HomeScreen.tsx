import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { useThemeStore } from "@/utils/useAppTheme"
import { useEffect } from "react"
import checkForUpdates from "@/utils/checkForUpdates"

export const HomeScreen = observer(() => {
  const navigation = useNavigation<DrawerNavigationProp<any>>()
  const {
    authenticationStore: { authEmail },
  } = useStores()
  const { isDark } = useThemeStore()

  const handleMenuItemPress = (id: string) => {
    switch (id) {
      case "suggested-themes":
        navigation.navigate("SuggestedThemes")
        break
      case "detailed-feedback":
        navigation.navigate("DetailedFeedback")
        break
      case "my-essays":
        navigation.navigate("MyEssays")
        break
      case "new-essay":
        navigation.navigate("NewEssay")
        break
      // Adicione outros casos conforme necessário
    }
  }

  const menuItems = [
    {
      id: "new-essay",
      title: "Nova Redação",
      description: "Fotografe ou envie uma redação para avaliação",
      icon: "camera-alt" as const,
      color: isDark ? "bg-blue-600" : "bg-blue-500",
    },
    {
      id: "my-essays",
      title: "Minhas Redações",
      description: "Veja suas redações avaliadas e em análise",
      icon: "history" as const,
      color: isDark ? "bg-green-600" : "bg-green-500",
    },
    {
      id: "detailed-feedback",
      title: "Feedback Detalhado",
      description: "Análise completa com sugestões de melhoria",
      icon: "analytics" as const,
      color: isDark ? "bg-purple-600" : "bg-purple-500",
    },
    {
      id: "suggested-themes",
      title: "Temas Sugeridos",
      description: "Pratique com temas atuais e relevantes",
      icon: "lightbulb" as const,
      color: isDark ? "bg-yellow-600" : "bg-yellow-500",
    },
  ]

  const recentEssays = [
    {
      title: "O Impacto da IA na Educação",
      date: "22/03/2024",
      score: 9.0,
      status: "Avaliada",
    },
    {
      title: "Desafios da Mobilidade Urbana",
      date: "20/03/2024",
      score: 8.5,
      status: "Avaliada",
    },
    {
      title: "Sustentabilidade e Consumo",
      date: "18/03/2024",
      score: "...",
      status: "Em análise",
    },
  ]

  useEffect(() => {
    checkForUpdates(false)
  }, [])

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-background-dark" : "bg-gray-50"}`}>
      {/* Header */}
      <View className={isDark ? "bg-surface-dark" : "bg-white"}>
        <View className="px-4 py-4 flex-row justify-between items-center">
          <View>
            <Text className={`text-2xl font-bold ${isDark ? "text-primary-dark" : "text-primary"}`}>
              RedaAI
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-text-secondary"}>
              {authEmail}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.openDrawer()} className="p-2 rounded-full">
            <MaterialIcons name="menu" size={28} color={isDark ? "#9CA3AF" : "#4B5563"} />
          </TouchableOpacity>
        </View>

        {/* Stats Bar */}
        <View
          className={`flex-row justify-around py-4 ${isDark ? "bg-surface-dark" : "bg-blue-50"}`}
        >
          <View className="items-center">
            <Text className={`text-xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}>
              12
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-text-secondary"}>
              Redações
            </Text>
          </View>
          <View className="items-center">
            <Text className={`text-xl font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>
              8.5
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-text-secondary"}>
              Média
            </Text>
          </View>
          <View className="items-center">
            <Text className={`text-xl font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}>
              3
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-text-secondary"}>
              Em análise
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Quick Actions */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-4`}>
            Ações Rápidas
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`w-[48%] mb-4 ${item.color} p-4 rounded-xl shadow-sm`}
                onPress={() => handleMenuItemPress(item.id)}
              >
                <MaterialIcons name={item.icon} size={32} color="white" />
                <Text className="text-white font-bold mt-2">{item.title}</Text>
                <Text className="text-white text-sm mt-1 opacity-90">{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Essays */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-4`}>
            Redações Recentes
          </Text>
          <View className="space-y-3">
            {recentEssays.map((essay, index) => (
              <TouchableOpacity
                key={index}
                className={`${
                  isDark ? "bg-surface-dark" : "bg-white"
                } p-4 rounded-lg shadow-sm flex-row justify-between items-center mb-1`}
              >
                <View className="flex-1">
                  <Text
                    className={isDark ? "text-text-dark font-medium" : "text-gray-800 font-medium"}
                  >
                    {essay.title}
                  </Text>
                  <Text className={isDark ? "text-text-secondary-dark" : "text-gray-500"}>
                    {essay.date}
                  </Text>
                </View>
                <View className="items-end">
                  <Text
                    className={
                      "font-bold " +
                      (essay.status === "Avaliada"
                        ? isDark
                          ? "text-green-400"
                          : "text-green-500"
                        : isDark
                          ? "text-orange-400"
                          : "text-orange-500")
                    }
                  >
                    {essay.score}
                  </Text>
                  <Text
                    className={
                      isDark ? "text-text-secondary-dark text-xs" : "text-gray-500 text-xs"
                    }
                  >
                    {essay.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-4`}>
            Dicas do Dia
          </Text>
          <View className={`${isDark ? "bg-surface-dark" : "bg-white"} p-4 rounded-lg shadow-sm`}>
            <View className="flex-row items-center mb-3">
              <FontAwesome5 name="lightbulb" size={20} color={isDark ? "#FCD34D" : "#FCD34D"} />
              <Text className={`${isDark ? "text-text-dark" : "text-gray-800"} font-medium ml-2`}>
                Melhore sua Argumentação
              </Text>
            </View>
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              Lembre-se de sempre fundamentar seus argumentos com exemplos concretos e dados
              relevantes. Isso fortalece sua redação e demonstra domínio do tema.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
