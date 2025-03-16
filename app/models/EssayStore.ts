import { api, essayApi } from "@/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { getRootStore } from "./helpers/getRootStore"

export const EssayStoreModel = types
  .model("EssayStore")
  .props({
    essayText: types.string,
    essayToCorrection: types.array(types.string),
    isLoading: types.boolean,
    error: types.string,
  })
  .views((store) => ({
    get characterCount() {
      return store.essayText.length
    },
    get isTextTooLong() {
      return this.characterCount > 4000
    },
    get isTextTooShort() {
      return this.characterCount < 500
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    setEssayText(text: string) {
      store.essayText = text
    },
    setLoading(loading: boolean) {
      store.isLoading = loading
    },
    setError(error: string) {
      store.error = error
    },
    addEssayToCorrection(essay: string) {
      store.essayToCorrection.push(essay)
    },
    reset() {
      store.essayText = ""
      store.isLoading = false
      store.error = ""
    },

    async submitEssay() {
      this.setLoading(true)
      this.setError("")

      try {
        const response = await essayApi.submitEssay({
          essay_text: store.essayText,
          email: getRootStore(store).userStore.email,
        })

        if (response.kind === "ok") {
          this.addEssayToCorrection(response.data.essay_id)
          return true
        }

        if (response.kind === "unauthorized") {
          this.setError("Email ou senha inválidos")
        } else {
          this.setError("Erro ao enviar redação")
        }
        return false
      } catch (error) {
        this.setError("Erro ao enviar redação")
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async transcribeImage(base64: string) {
      this.setLoading(true)
      this.setError("")

      try {
        const response = await essayApi.transcribeImage({
          image_base64: base64,
        })

        if (response.kind === "ok") {
          return response.data.extracted_text
        }

        if (response.kind === "unauthorized") {
          this.setError("Email ou senha inválidos")
          return false
        } else {
          this.setError("Erro ao enviar redação")
          return false
        }
      } catch (error) {
        this.setError("Erro ao transcribir imagem")
        return false
      } finally {
        this.setLoading(false)
      }
    },
  }))
