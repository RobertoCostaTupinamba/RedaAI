import { authApi } from "@/services/api/auth-api"
import { save } from "@/utils/storage"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { getRootStore } from "./helpers/getRootStore"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    password: types.optional(types.string, ""),
    confirmPassword: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "Email não pode ficar em branco"
      if (store.authEmail.length < 6) return "Email deve ter pelo menos 6 caracteres"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail)) return "Email deve ser válido"
      if (store.name.length === 0) return "Nome não pode ficar em branco"
      if (store.password.length < 6) return "Senha deve ter pelo menos 6 caracteres"
      if (store.password !== store.confirmPassword) return "As senhas não coincidem"
      return ""
    },
    get validationLogin() {
      if (store.authEmail.length === 0) return "Email não pode ficar em branco"
      if (store.password.length === 0) return "Senha não pode ficar em branco"
      return ""
    },
  }))
  .actions((store) => ({
    resetStates() {
      store.isLoading = false
      store.error = undefined
    },

    resetForm() {
      store.name = ""
      store.authEmail = ""
      store.password = ""
      store.confirmPassword = ""
    },

    setAuthToken(value?: string) {
      store.authToken = value
    },

    setName(value: string) {
      store.name = value
    },

    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },

    setPassword(value: string) {
      store.password = value
    },

    setConfirmPassword(value: string) {
      store.confirmPassword = value
    },

    setIsLoading(value: boolean) {
      store.isLoading = value
    },

    setError(value?: string) {
      store.error = value
    },

    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.password = ""
      store.confirmPassword = ""
      store.name = ""
      this.resetStates()
      getRootStore(store).userStore.reset()
    },

    async login() {
      try {
        // console.log("Iniciando login...")

        if (store.validationLogin) {
          this.setError(store.validationLogin)
          return false
        }

        this.setIsLoading(true)
        this.setError("")

        const response = await authApi.login({
          email: store.authEmail,
          password: store.password,
        })

        if (response.kind === "ok") {
          save("authToken", response.data.token)
          this.setAuthToken(response.data.token)
          getRootStore(store).userStore.setUser(response.data.user)
          this.setIsLoading(false)
          return true
        }

        console.log("response", response)

        if (response.kind === "unauthorized") {
          this.setError("Email ou senha inválidos")
        }

        if (response.kind === "bad-data") {
          this.setError("Erro ao fazer login")
        }

        this.setIsLoading(false)
        return false
      } catch (error) {
        console.log("Erro durante login:", error)
        if (error instanceof Error) {
          this.setError(error.message)
        } else {
          this.setError("Erro desconhecido ao fazer login")
        }
        return false
      } finally {
        this.setIsLoading(false)
      }
    },
    async signUp() {
      try {
        this.setIsLoading(true)
        this.setError("")

        const response = await authApi.signUp({
          name: store.name,
          email: store.authEmail,
          password: store.password,
        })

        if (response.kind === "ok") {
          return true
        }

        return false
      } catch (error) {
        console.log("Erro durante cadastro:", error)
        if (error instanceof Error) {
          this.setError(error.message)
        } else {
          this.setError("Erro desconhecido ao fazer cadastro")
        }
        return false
      } finally {
        this.setIsLoading(false)
      }
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
