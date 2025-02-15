import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"

export const DetailedFeedbackScreen = observer(() => {
  const navigation = useNavigation<AppStackScreenProps<"DetailedFeedback">["navigation"]>()
  const { isDark } = useAppTheme()

  const feedbackData = {
    title: "O Impacto da IA na Educação",
    date: "22/03/2024",
    score: 9.0,
    competencies: [
      {
        name: "Domínio da norma culta",
        score: 180,
        maxScore: 200,
        feedback:
          "Excelente domínio da norma culta. Pequenos ajustes em pontuação podem aprimorar ainda mais o texto.",
      },
      {
        name: "Compreensão da proposta",
        score: 190,
        maxScore: 200,
        feedback:
          "Compreensão clara e abrangente do tema, com argumentação consistente e bem fundamentada.",
      },
      {
        name: "Argumentação",
        score: 185,
        maxScore: 200,
        feedback:
          "Argumentação sólida, com bom uso de exemplos. Considere adicionar mais dados estatísticos.",
      },
      {
        name: "Organização textual",
        score: 175,
        maxScore: 200,
        feedback: "Boa estruturação de parágrafos. A conclusão poderia ser mais impactante.",
      },
      {
        name: "Proposta de intervenção",
        score: 170,
        maxScore: 200,
        feedback:
          "Proposta bem elaborada, mas poderia detalhar melhor a viabilidade das ações sugeridas.",
      },
    ],
    generalFeedback:
      "Sua redação demonstra excelente domínio do tema e boa capacidade argumentativa. Os pontos principais foram bem desenvolvidos, com argumentos consistentes e exemplos pertinentes. Para aprimorar ainda mais, sugiro:",
    improvements: [
      "Fortalecer a conclusão com uma síntese mais impactante dos argumentos",
      "Incluir mais dados estatísticos para embasar os argumentos",
      "Detalhar melhor a viabilidade das propostas de intervenção",
      "Revisar algumas questões pontuais de pontuação",
    ],
    strengths: [
      "Excelente domínio do tema",
      "Argumentação consistente e bem fundamentada",
      "Boa estruturação textual",
      "Vocabulário adequado e variado",
    ],
  }

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
              Feedback Detalhado
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              Análise completa da sua redação
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Essay Info */}
        <View
          className={`${isDark ? "bg-surface-dark" : "bg-white"} p-4 rounded-lg shadow-sm mb-4`}
        >
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-2`}>
            {feedbackData.title}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              {feedbackData.date}
            </Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-700 font-bold">{feedbackData.score.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* Competencies */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-4`}>
            Competências
          </Text>
          {feedbackData.competencies.map((comp, index) => (
            <View
              key={index}
              className={`${isDark ? "bg-surface-dark" : "bg-white"} p-4 rounded-lg shadow-sm mb-3`}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className={`font-bold ${isDark ? "text-text-dark" : "text-gray-800"}`}>
                  {comp.name}
                </Text>
                <Text
                  className={`${
                    comp.score >= comp.maxScore * 0.8
                      ? "text-green-600"
                      : comp.score >= comp.maxScore * 0.6
                        ? "text-yellow-600"
                        : "text-red-600"
                  } font-bold`}
                >
                  {comp.score}/{comp.maxScore}
                </Text>
              </View>
              <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
                {comp.feedback}
              </Text>
            </View>
          ))}
        </View>

        {/* General Feedback */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-4`}>
            Feedback Geral
          </Text>
          <View className={`${isDark ? "bg-surface-dark" : "bg-white"} p-4 rounded-lg shadow-sm`}>
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              {feedbackData.generalFeedback}
            </Text>
          </View>
        </View>

        {/* Strengths */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-4`}>
            Pontos Fortes
          </Text>
          <View className={`${isDark ? "bg-surface-dark" : "bg-white"} p-4 rounded-lg shadow-sm`}>
            {feedbackData.strengths.map((strength, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <MaterialIcons
                  name="check-circle"
                  size={20}
                  color={isDark ? "#10B981" : "#059669"}
                />
                <Text className={`${isDark ? "text-text-secondary-dark" : "text-gray-600"} ml-2`}>
                  {strength}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Improvements */}
        <View className="mb-6">
          <Text className={`text-lg font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-4`}>
            Sugestões de Melhoria
          </Text>
          <View className={`${isDark ? "bg-surface-dark" : "bg-white"} p-4 rounded-lg shadow-sm`}>
            {feedbackData.improvements.map((improvement, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <MaterialIcons
                  name="trending-up"
                  size={20}
                  color={isDark ? "#60A5FA" : "#3B82F6"}
                />
                <Text className={`${isDark ? "text-text-secondary-dark" : "text-gray-600"} ml-2`}>
                  {improvement}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
