import { api, Api } from "./api"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends LoginCredentials {
  name: string
}

export interface AuthResponse {
  statusCode: number
  body: AuthResponseBody
}

export interface AuthResponseBody {
  message: string
  token: string
  user: {
    last_access: string
    created_at: string
    score: number
    name: string
    email: string
  }
}

export class AuthApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  /**
   * Faz login do usuário
   */
  async login(
    credentials: LoginCredentials,
  ): Promise<{ kind: "ok"; data: AuthResponseBody } | GeneralApiProblem> {
    try {
      //logar os headers
      console.log("headers", this.api.apisauce.headers)
      const response = await this.api.apisauce.post<AuthResponse>("/dev/login", credentials)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      if (!response.data?.body) {
        return { kind: "bad-data" }
      }

      return { kind: "ok", data: response.data.body }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  /**
   * Registra um novo usuário
   */
  async signUp(
    credentials: SignUpCredentials,
  ): Promise<{ kind: "ok"; data: AuthResponse } | GeneralApiProblem> {
    try {
      const response = await this.api.apisauce.post<AuthResponse>("/dev/register-user", credentials)

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

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<{ kind: "ok" } | GeneralApiProblem> {
    try {
      const response = await this.api.apisauce.post("/auth/logout")

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok" }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  /**
   * Recupera a senha do usuário
   */
  async forgotPassword(email: string): Promise<{ kind: "ok" } | GeneralApiProblem> {
    try {
      const response = await this.api.apisauce.post("/auth/forgot-password", { email })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok" }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  /**
   * Reseta a senha do usuário
   */
  // async resetPassword(
  //   token: string,
  //   password: string,
  // ): Promise<{ kind: "ok" } | GeneralApiProblem> {
  //   try {
  //     const response = await this.apisauce.post("/auth/reset-password", { token, password })

  //     if (!response.ok) {
  //       const problem = getGeneralApiProblem(response)
  //       if (problem) return problem
  //     }

  //     if (!response.data) {
  //       return { kind: "bad-data" }
  //     }

  //     return { kind: "ok", data: response.data }
  //   } catch (error) {
  //     return { kind: "bad-data" }
  //   }
  // }
}

// Singleton instance
export const authApi = new AuthApi(api)
