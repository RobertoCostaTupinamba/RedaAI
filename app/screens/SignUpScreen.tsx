import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
import { AppStackScreenProps } from "../navigators"
import { useEffect } from "react"

export const SignUpScreen = observer(() => {
  const navigation = useNavigation<AppStackScreenProps<"SignUp">["navigation"]>()
  const {
    authenticationStore: {
      authEmail,
      password,
      name,
      confirmPassword,
      isLoading,
      error,
      setAuthEmail,
      setName,
      setPassword,
      setConfirmPassword,
      setError,
      validationError,
      signUp,
      resetForm,
    },
  } = useStores()

  useEffect(() => {
    resetForm()
  }, [])

  const handleSignUp = async () => {
    try {
      // validar erros
      if (validationError) {
        setError(validationError)
        return
      }

      const success = await signUp()
      if (success) {
        navigation.navigate("Login")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro desconhecido")
      }
    }
  }

  const goToLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={20} // ajuste conforme necessário
        className="flex-1"
      >
        <View className="flex-1 justify-center px-8">
          {/* Header */}
          <View className="mb-12">
            <Text className="text-4xl font-bold text-blue-500 text-center mb-2">RedaAI</Text>
            <Text className="text-gray-600 text-center text-lg">Crie sua conta</Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 mb-2 text-base">Nome completo</Text>
              <TextInput
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Seu nome completo"
                autoCapitalize="words"
                editable={!isLoading}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text className="text-gray-700 mb-2 text-base">Email</Text>
              <TextInput
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Seu melhor email"
                value={authEmail}
                onChangeText={setAuthEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View>
              <Text className="text-gray-700 mb-2 text-base">Senha</Text>
              <TextInput
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Escolha uma senha segura"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <View>
              <Text className="text-gray-700 mb-2 text-base">Confirmar senha</Text>
              <TextInput
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {error ? <Text className="text-red-500 text-center">{error}</Text> : null}

            <TouchableOpacity
              className="mt-6 bg-blue-500 rounded-lg py-4 flex-row justify-center items-center"
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="white" className="mr-2" /> : null}
              <Text className="text-white text-center font-bold text-lg">
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-8">
            <TouchableOpacity onPress={goToLogin}>
              <Text className="text-gray-600 text-center">
                Já tem uma conta? <Text className="text-blue-500 font-bold">Faça login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})
