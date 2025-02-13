import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "../navigators"

export const HomeScreen = observer(() => {
  const navigation = useNavigation<AppStackScreenProps<"Home">["navigation"]>()
  const {
    authenticationStore: { logout, authEmail },
  } = useStores()

  const handleMenuItemPress = (title: string) => {
    switch (title) {
      case "Temas Sugeridos":
        navigation.navigate("SuggestedThemes")
        break
      // Adicione outros casos conforme necessário
    }
  }

  const menuItems = [
    {
      title: "Nova Redação",
      description: "Fotografe ou envie uma redação para avaliação",
      icon: "camera-alt" as const,
      color: "bg-blue-500",
    },
    {
      title: "Minhas Redações",
      description: "Veja suas redações avaliadas e em análise",
      icon: "history" as const,
      color: "bg-green-500",
    },
    {
      title: "Feedback Detalhado",
      description: "Análise completa com sugestões de melhoria",
      icon: "analytics" as const,
      color: "bg-purple-500",
    },
    {
      title: "Temas Sugeridos",
      description: "Pratique com temas atuais e relevantes",
      icon: "lightbulb" as const,
      color: "bg-yellow-500",
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white shadow-sm">
        <View className="px-4 py-4 flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-blue-500">RedaAI</Text>
            <Text className="text-gray-600 text-sm">{authEmail}</Text>
          </View>
          <TouchableOpacity
            onPress={logout}
            className="bg-red-500 rounded-full p-2 flex-row items-center"
          >
            <MaterialIcons name="logout" size={20} color="white" />
            <Text className="text-white ml-1 font-medium">Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Bar */}
        <View className="flex-row justify-around py-4 bg-blue-50">
          <View className="items-center">
            <Text className="text-xl font-bold text-blue-600">12</Text>
            <Text className="text-gray-600 text-sm">Redações</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-green-600">8.5</Text>
            <Text className="text-gray-600 text-sm">Média</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-purple-600">3</Text>
            <Text className="text-gray-600 text-sm">Em análise</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</Text>
          <View className="flex-row flex-wrap justify-between">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={"w-[48%] mb-4 " + item.color + " p-4 rounded-xl shadow-sm"}
                onPress={() => handleMenuItemPress(item.title)}
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
          <Text className="text-lg font-bold text-gray-800 mb-4">Redações Recentes</Text>
          <View className="space-y-3">
            {recentEssays.map((essay, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm flex-row justify-between items-center"
              >
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">{essay.title}</Text>
                  <Text className="text-gray-500 text-sm">{essay.date}</Text>
                </View>
                <View className="items-end">
                  <Text
                    className={
                      "font-bold " +
                      (essay.status === "Avaliada" ? "text-green-500" : "text-orange-500")
                    }
                  >
                    {essay.score}
                  </Text>
                  <Text className="text-xs text-gray-500">{essay.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Dicas do Dia</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <View className="flex-row items-center mb-3">
              <FontAwesome5 name="lightbulb" size={20} color="#FCD34D" />
              <Text className="text-gray-800 font-medium ml-2">Melhore sua Argumentação</Text>
            </View>
            <Text className="text-gray-600">
              Lembre-se de sempre fundamentar seus argumentos com exemplos concretos e dados
              relevantes. Isso fortalece sua redação e demonstra domínio do tema.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
