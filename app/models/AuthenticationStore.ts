import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    password: types.optional(types.string, ""),
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
      return ""
    },
  }))
  .actions((store) => ({
    resetStates() {
      store.isLoading = false
      store.error = undefined
    },

    setAuthToken(value?: string) {
      store.authToken = value
    },

    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },

    setPassword(value: string) {
      store.password = value
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
      this.resetStates()
    },

    async login() {
      try {
        console.log("Iniciando login...")
        console.log("Email:", store.authEmail)
        console.log("Senha:", store.password)

        this.setIsLoading(true)
        this.setError("")

        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (store.authEmail === "admin@admin.com" && store.password === "123456") {
          console.log("Credenciais corretas, setando token...")
          this.setAuthToken("fake-token")
          console.log("Token setado com sucesso")
          return true
        } else {
          console.log("Credenciais inválidas")
          throw new Error("Email ou senha inválidos")
        }
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
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
