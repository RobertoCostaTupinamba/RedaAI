import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"

export const SuggestedThemesScreen = observer(() => {
  const navigation = useNavigation<AppStackScreenProps<"SuggestedThemes">["navigation"]>()
  const { isDark } = useAppTheme()

  const themes = [
    {
      title: "Inteligência Artificial na Educação",
      description:
        "Discuta os impactos positivos e negativos da implementação da IA no sistema educacional brasileiro.",
      difficulty: "Médio",
      category: "Tecnologia",
      competencies: ["Argumentação", "Atualidades", "Tecnologia"],
    },
    {
      title: "Mobilidade Urbana Sustentável",
      description:
        "Analise os desafios e soluções para uma mobilidade urbana mais sustentável nas grandes cidades.",
      difficulty: "Médio",
      category: "Meio Ambiente",
      competencies: ["Proposta de Intervenção", "Sustentabilidade", "Urbanismo"],
    },
    {
      title: "Saúde Mental na Era Digital",
      description:
        "Reflita sobre os impactos das redes sociais e tecnologias digitais na saúde mental dos jovens.",
      difficulty: "Difícil",
      category: "Saúde",
      competencies: ["Sociologia", "Psicologia", "Contemporaneidade"],
    },
    {
      title: "Fake News e Democracia",
      description:
        "Analise como a disseminação de fake news pode afetar o processo democrático e propor soluções.",
      difficulty: "Difícil",
      category: "Política",
      competencies: ["Cidadania", "Mídia", "Política"],
    },
    {
      title: "Economia Circular",
      description: "Discuta a importância da economia circular para o desenvolvimento sustentável.",
      difficulty: "Médio",
      category: "Economia",
      competencies: ["Sustentabilidade", "Economia", "Meio Ambiente"],
    },
  ]

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-background-dark" : "bg-gray-50"}`}>
      {/* Header */}
      <View className={`${isDark ? "bg-surface-dark" : "bg-white"} shadow-sm px-4 py-4`}>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <MaterialIcons name="arrow-back" size={24} color={isDark ? "#9CA3AF" : "#4B5563"} />
          </TouchableOpacity>
          <View>
            <Text className={`text-2xl font-bold ${isDark ? "text-text-dark" : "text-gray-800"}`}>
              Temas Sugeridos
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              Escolha um tema para sua redação
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="space-y-4">
          {themes.map((theme, index) => (
            <TouchableOpacity
              key={index}
              className={`${
                isDark ? "bg-surface-dark" : "bg-white"
              } rounded-lg p-4 shadow-sm border ${
                isDark ? "border-border-dark" : "border-gray-100"
              }`}
            >
              {/* Title and Difficulty */}
              <View className="flex-row justify-between items-start mb-2">
                <Text
                  className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} flex-1 mr-2`}
                >
                  {theme.title}
                </Text>
                <View
                  className={
                    "px-2 py-1 rounded " +
                    (theme.difficulty === "Difícil"
                      ? isDark
                        ? "bg-red-900"
                        : "bg-red-100"
                      : theme.difficulty === "Médio"
                        ? isDark
                          ? "bg-yellow-900"
                          : "bg-yellow-100"
                        : isDark
                          ? "bg-green-900"
                          : "bg-green-100")
                  }
                >
                  <Text
                    className={
                      "text-xs font-medium " +
                      (theme.difficulty === "Difícil"
                        ? isDark
                          ? "text-red-300"
                          : "text-red-700"
                        : theme.difficulty === "Médio"
                          ? isDark
                            ? "text-yellow-300"
                            : "text-yellow-700"
                          : isDark
                            ? "text-green-300"
                            : "text-green-700")
                    }
                  >
                    {theme.difficulty}
                  </Text>
                </View>
              </View>

              {/* Description */}
              <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600" + " mb-3"}>
                {theme.description}
              </Text>

              {/* Category */}
              <View className="flex-row items-center mb-3">
                <MaterialIcons name="category" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                <Text className={isDark ? "text-text-secondary-dark ml-1" : "text-gray-500 ml-1"}>
                  {theme.category}
                </Text>
              </View>

              {/* Competencies */}
              <View className="flex-row flex-wrap">
                {theme.competencies.map((competency, compIndex) => (
                  <View
                    key={compIndex}
                    className={`${
                      isDark ? "bg-blue-900" : "bg-blue-50"
                    } px-2 py-1 rounded mr-2 mb-2`}
                  >
                    <Text className={isDark ? "text-blue-300" : "text-blue-700" + " text-xs"}>
                      {competency}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Start Button */}
              <TouchableOpacity
                className={`${isDark ? "bg-primary-dark" : "bg-primary"} rounded-lg py-3 mt-3`}
              >
                <Text className="text-white text-center font-bold">Começar Redação</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
