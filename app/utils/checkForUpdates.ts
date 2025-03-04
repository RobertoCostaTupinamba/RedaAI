import { Alert } from "react-native"
import { checkForUpdateAsync, reloadAsync, fetchUpdateAsync } from "expo-updates"

const checkForUpdates = async (showSuccess = false): Promise<void> => {
  if (__DEV__) {
    if (showSuccess) {
      Alert.alert("Development", "Can't check for updates in development.")
    }
    return
  }

  try {
    const update = await checkForUpdateAsync()

    if (update.isAvailable) {
      await fetchUpdateAsync()

      Alert.alert(
        "Atualização disponível",
        "Por favor, atualize o aplicativo para a versão mais recente.",
        [{ text: "OK", onPress: async () => reloadAsync() }],
      )
    } else if (showSuccess) {
      Alert.alert("Atualizado", "Você está usando a versão mais recente do aplicativo.")
    }
  } catch (error) {
    Alert.alert("Erro", "Ocorreu um erro ao verificar por atualizações.")
  }
}

export default checkForUpdates
