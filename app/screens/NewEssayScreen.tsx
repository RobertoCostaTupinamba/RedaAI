import React, { useState } from "react"
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native"
import { observer } from "mobx-react-lite"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import * as ImagePicker from "expo-image-picker"

export const NewEssayScreen = observer(() => {
  const navigation = useNavigation<AppStackScreenProps<"NewEssay">["navigation"]>()
  const { isDark } = useAppTheme()
  const [essayText, setEssayText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri)
        await processImage(result.assets[0].uri)
      }
    } catch (err) {
      setError("Erro ao selecionar imagem")
    }
  }

  const processImage = async (imageUri: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // TODO: Implementar chamada real para o backend
      // const response = await api.post("/ocr", { image: imageUri })
      // setEssayText(response.data.text)

      // Simulação de resposta do backend
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setEssayText("Texto transcrito da imagem...")
    } catch (err) {
      setError("Erro ao processar imagem")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // calcular quantidade de caracteres
      const characterCount = essayText.length

      if (characterCount < 500) {
        setError(
          "A redação deve conter pelo menos 500 caracteres que representam em média 7 linhas",
        )
        return
      }

      if (characterCount > 4000) {
        setError("A redação deve conter no máximo 4000 caracteres")
        return
      }

      // TODO: Implementar chamada real para o backend
      // const response = await api.post("/essays", { text: essayText })
      // navigation.navigate("DetailedFeedback", { essayId: response.data.id })

      // Simulação de sucesso
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // navigation.navigate("DetailedFeedback")
    } catch (err) {
      setError("Erro ao enviar redação")
    } finally {
      setIsLoading(false)
    }
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
              Nova Redação
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              Digite ou envie uma foto da sua redação
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 pt-4">
        {/* Image Preview */}
        {selectedImage && (
          <View className="mb-4">
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
            >
              <MaterialIcons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* Text Input */}
        <View className="flex-1">
          <TextInput
            className={`flex-1 ${
              isDark ? "bg-surface-dark text-text-dark" : "bg-white text-gray-800"
            } p-4 rounded-lg shadow-sm`}
            multiline
            textAlignVertical="top"
            numberOfLines={20}
            placeholder="Digite sua redação aqui (Titulo é opcional)..."
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
            value={essayText}
            onChangeText={setEssayText}
            editable={!isLoading}
          />
          <View className="flex-row justify-between mt-2 px-2">
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              {essayText.length} caracteres
            </Text>
            <Text className={isDark ? "text-text-secondary-dark" : "text-gray-600"}>
              ~{Math.ceil(essayText.length / 89)} linhas
            </Text>
          </View>
        </View>

        {/* Error Message */}
        {error && <Text className="text-red-500 text-center mt-4">{error}</Text>}

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-4 mb-6">
          <TouchableOpacity
            onPress={pickImage}
            disabled={isLoading}
            className={`flex-1 mr-2 ${
              isDark ? "bg-surface-dark" : "bg-white"
            } p-4 rounded-lg shadow-sm flex-row items-center justify-center`}
          >
            <MaterialIcons
              name="camera-alt"
              size={24}
              color={isDark ? "#9CA3AF" : "#4B5563"}
              style={{ marginRight: 8 }}
            />
            <Text className={isDark ? "text-text-dark" : "text-gray-800"}>Enviar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading || !essayText.trim()}
            className={`flex-1 ml-2 ${
              isLoading || !essayText.trim()
                ? isDark
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : isDark
                  ? "bg-primary-dark"
                  : "bg-primary"
            } p-4 rounded-lg shadow-sm flex-row items-center justify-center`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <MaterialIcons name="send" size={24} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white font-bold">Enviar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
})
