import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { useState } from "react"
import { FlashList } from "@shopify/flash-list"

export const MyEssaysScreen = observer(() => {
  const navigation = useNavigation<AppStackScreenProps<"MyEssays">["navigation"]>()
  const { isDark } = useAppTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { id: "all", label: "Todas" },
    { id: "evaluated", label: "Avaliadas" },
    { id: "pending", label: "Em Análise" },
    { id: "high-score", label: "Nota Alta" },
  ]

  const essays = [
    {
      id: "1",
      title: "O Impacto da IA na Educação",
      date: "22/03/2024",
      score: 9.0,
      status: "evaluated",
      theme: "Tecnologia",
      words: 2850,
    },
    {
      id: "2",
      title: "Desafios da Mobilidade Urbana",
      date: "20/03/2024",
      score: 8.5,
      status: "evaluated",
      theme: "Urbanismo",
      words: 2650,
    },
    {
      id: "3",
      title: "Sustentabilidade e Consumo",
      date: "18/03/2024",
      status: "pending",
      theme: "Meio Ambiente",
      words: 2750,
    },
    {
      id: "4",
      title: "O Papel da Educação na Era Digital",
      date: "15/03/2024",
      score: 9.5,
      status: "evaluated",
      theme: "Educação",
      words: 2900,
    },
    {
      id: "5",
      title: "Saúde Mental na Sociedade Moderna",
      date: "12/03/2024",
      score: 8.0,
      status: "evaluated",
      theme: "Saúde",
      words: 2800,
    },
  ]

  const filteredEssays = essays.filter((essay) => {
    const matchesSearch = essay.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "evaluated" && essay.status === "evaluated") ||
      (selectedFilter === "pending" && essay.status === "pending") ||
      (selectedFilter === "high-score" && essay.score >= 9.0)
    return matchesSearch && matchesFilter
  })

  const renderEssayItem = ({ item: essay }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailedFeedback")}
      className={`${
        isDark ? "bg-surface-dark" : "bg-white"
      } p-4 rounded-lg shadow-sm mb-3 border ${isDark ? "border-border-dark" : "border-gray-100"}`}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-3">
          <Text
            className={`text-base font-bold ${isDark ? "text-text-dark" : "text-gray-800"} mb-1`}
            numberOfLines={2}
          >
            {essay.title}
          </Text>
          <Text className={`${isDark ? "text-text-secondary-dark" : "text-gray-600"} text-sm`}>
            {essay.date}
          </Text>
        </View>
        {essay.status === "evaluated" ? (
          <View
            className={`px-3 py-1 rounded-full ${
              essay.score >= 9.0
                ? isDark
                  ? "bg-green-900"
                  : "bg-green-100"
                : essay.score >= 7.0
                  ? isDark
                    ? "bg-blue-900"
                    : "bg-blue-100"
                  : isDark
                    ? "bg-yellow-900"
                    : "bg-yellow-100"
            }`}
          >
            <Text
              className={`font-bold ${
                essay.score >= 9.0
                  ? isDark
                    ? "text-green-300"
                    : "text-green-700"
                  : essay.score >= 7.0
                    ? isDark
                      ? "text-blue-300"
                      : "text-blue-700"
                    : isDark
                      ? "text-yellow-300"
                      : "text-yellow-700"
              }`}
            >
              {essay.score?.toFixed(1)}
            </Text>
          </View>
        ) : (
          <View className={`px-3 py-1 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
            <Text className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Em análise
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <MaterialIcons
            name="category"
            size={16}
            color={isDark ? "#9CA3AF" : "#6B7280"}
            style={{ marginRight: 4 }}
          />
          <Text className={`${isDark ? "text-text-secondary-dark" : "text-gray-600"} text-sm`}>
            {essay.theme}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MaterialIcons
            name="short-text"
            size={16}
            color={isDark ? "#9CA3AF" : "#6B7280"}
            style={{ marginRight: 4 }}
          />
          <Text className={`${isDark ? "text-text-secondary-dark" : "text-gray-600"} text-sm`}>
            {essay.words} palavras
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-background-dark" : "bg-gray-50"}`}>
      {/* Header */}
      <View className={`${isDark ? "bg-surface-dark" : "bg-white"} shadow-sm px-4 py-4`}>
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <MaterialIcons name="arrow-back" size={24} color={isDark ? "#9CA3AF" : "#4B5563"} />
          </TouchableOpacity>
          <View>
            <Text className={`text-xl font-bold ${isDark ? "text-text-dark" : "text-gray-800"}`}>
              Minhas Redações
            </Text>
            <Text className={`${isDark ? "text-text-secondary-dark" : "text-gray-600"} text-sm`}>
              {filteredEssays.length} redações encontradas
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View
          className={`flex-row items-center px-3 py-2 rounded-lg ${
            isDark ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <MaterialIcons
            name="search"
            size={20}
            color={isDark ? "#9CA3AF" : "#6B7280"}
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Buscar redações..."
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className={`flex-1 ${isDark ? "text-text-dark" : "text-gray-800"} `}
          />
        </View>
      </View>

      {/* Filters */}
      <View className={`${isDark ? "bg-surface-dark" : "bg-white"} shadow-sm h-30`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-1.5 "
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setSelectedFilter(filter.id)}
              className={`mr-2 px-5 py-3 rounded-full border ${
                selectedFilter === filter.id
                  ? isDark
                    ? "bg-primary-dark border-primary-dark"
                    : "bg-primary border-primary"
                  : isDark
                    ? "bg-surface-dark border-border-dark"
                    : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedFilter === filter.id
                    ? "text-white font-medium"
                    : isDark
                      ? "text-text-secondary-dark"
                      : "text-text-secondary"
                } text-sm`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Essays List */}
      <View className="flex-1 px-4 pt-4">
        <FlashList
          data={filteredEssays}
          renderItem={renderEssayItem}
          estimatedItemSize={120}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* FAB - New Essay */}
      <TouchableOpacity
        className={`absolute bottom-6 right-6 ${
          isDark ? "bg-primary-dark" : "bg-primary"
        } w-14 h-14 rounded-full items-center justify-center shadow-lg`}
        onPress={() => {
          // TODO: Implementar navegação para nova redação
          console.log("Nova redação")
        }}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
})
