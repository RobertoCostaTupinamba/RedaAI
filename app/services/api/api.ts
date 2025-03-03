/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, ApiFeedResponse } from "./api.types"
import type { EpisodeSnapshotIn } from "../../models/Episode"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "x-api-key": "5G7M64vftt5Ti3kRgkN664NDYL9bxrcT2IojLjgX",
      },
    })
  }

  // setupRequestInterceptor(apisauceInstance: ApisauceInstance) {
  //   apisauceInstance.axiosInstance.interceptors.request.use(
  //     (config) => {
  //       config.headers["x-api-key"] = "5G7M64vftt5Ti3kRgkN664NDYL9bxrcT2IojLjgX"
  //       return config
  //     },
  //     (error) => Promise.reject(error),
  //   )
  // }
}

// Singleton instance of the API for convenience
export const api = new Api()
