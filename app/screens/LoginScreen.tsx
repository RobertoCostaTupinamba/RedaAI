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

export const LoginScreen = observer(() => {
  const navigation = useNavigation<AppStackScreenProps<"Login">["navigation"]>()
  const {
    authenticationStore: {
      authEmail,
      password,
      isLoading,
      error,
      login,
      setAuthEmail,
      setPassword,
      resetStates,
    },
  } = useStores()

  // Log temporário para debug
  console.log("[LoginScreen] Estado do isLoading:", isLoading)

  useEffect(() => {
    resetStates()
  }, [])

  const handleLogin = async () => {
    const success = await login()
    if (success) {
      navigation.navigate("HomeDrawer")
    }
  }

  const goToSignUp = () => {
    navigation.navigate("SignUp")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-8">
          {/* Header */}
          <View className="mb-12">
            <Text className="text-4xl font-bold text-blue-500 text-center mb-2">RedaAI</Text>
            <Text className="text-gray-600 text-center text-lg">Faça login para continuar</Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 mb-2 text-base">Email</Text>
              <TextInput
                className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700"
                placeholder="Seu email"
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
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {error ? <Text className="text-red-500 text-center">{error}</Text> : null}

            <TouchableOpacity
              className="mt-6 bg-blue-500 rounded-lg py-4 flex-row justify-center items-center"
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="white" className="mr-2" /> : null}
              <Text className="text-white text-center font-bold text-lg">
                {isLoading ? "Entrando..." : "Entrar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4">
              <Text className="text-blue-500 text-center">Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-8">
            <TouchableOpacity onPress={goToSignUp}>
              <Text className="text-gray-600 text-center">
                Não tem uma conta? <Text className="text-blue-500 font-bold">Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})
