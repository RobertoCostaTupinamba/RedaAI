import { api, Api } from "./api"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

/**
 * Interface para os dados de submissão de redação
 */
export interface EssaySubmissionRequest {
  essay_text: string
  email: string
}

/**
 * Interface para os dados de resposta da submissão de redação
 */
export interface EssaySubmissionResponse {
  status: number
  message: string
  request_id: string
  essay_id: string
  correction_status: string
  error?: string
}

/**
 * Interface para requisição de transcrição de imagem
 */
export interface ImageTranscriptionRequest {
  image_base64: string
}

/**
 * Interface para resposta da transcrição de imagem
 */
export interface ImageTranscriptionResponse {
  status: number
  message: string
  extracted_text: string
  error?: string
}

export class EssayApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  // Enviar redaçao para correção
  async submitEssay({
    essay_text,
    email,
  }: EssaySubmissionRequest): Promise<
    { kind: "ok"; data: EssaySubmissionResponse } | GeneralApiProblem
  > {
    try {
      const response = await this.api.apisauce.post<EssaySubmissionResponse>("/dev/submit-text", {
        essay_text,
        email,
      })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      if (!response.data) {
        return { kind: "bad-data" }
      }

      return { kind: "ok", data: response.data }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  // Transcrever texto de uma imagem
  async transcribeImage({
    image_base64,
  }: ImageTranscriptionRequest): Promise<
    { kind: "ok"; data: ImageTranscriptionResponse } | GeneralApiProblem
  > {
    try {
      const response = await this.api.apisauce.post<ImageTranscriptionResponse>(
        "/dev/image-transcription",
        {
          image_base64,
        },
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      if (!response.data) {
        return { kind: "bad-data" }
      }

      return { kind: "ok", data: response.data }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance
export const essayApi = new EssayApi(api)
