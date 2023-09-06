import jwtDefaultConfig from './jwtDefaultConfig';

export default class JwtService {
  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns) {
    this.axiosIns = axiosIns

    // Interceptor to add JWT token to requests
    // this.axiosIns.interceptors.request.use(
    //   config => {
    //     // Get token from localStorage
    //     const accessToken = this.getToken()

    //     // If token is present add it to request's Authorization Header
    //     if (accessToken) {
    //       // eslint-disable-next-line no-param-reassign
    //       config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
    //     }
    //     return config
    //   },
    //   error => Promise.reject(error),
    // )

    // Response Interceptor
    // this.axiosIns.interceptors.response.use(
    //   response => response,
    //   error => {
    //     // const { config, response: { status } } = error
    //     const { config, response } = error
    //     const originalRequest = config

    //     // if (status === 401) {
    //     if (response && response.status === 401) {
    //       if (!this.isAlreadyFetchingAccessToken) {
    //         this.isAlreadyFetchingAccessToken = true
    //         this.refreshToken().then(r => {
    //           this.isAlreadyFetchingAccessToken = false

    //           // Update accessToken in localStorage
    //           this.setToken(r.data.accessToken)
    //           this.setRefreshToken(r.data.refreshToken)

    //           this.onAccessTokenFetched(r.data.accessToken)
    //         })
    //       }
    //       const retryOriginalRequest = new Promise(resolve => {
    //         this.addSubscriber(accessToken => {
    //           // Make sure to assign accessToken according to your response.
    //           // Check: https://pixinvent.ticksy.com/ticket/2413870
    //           // Change Authorization header
    //           originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
    //           resolve(this.axiosIns(originalRequest))
    //         })
    //       })
    //       return retryOriginalRequest
    //     }
    //     return Promise.reject(error)
    //   },
    // )
  }  

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }

  // Test Api
  test() {
    return this.axiosIns.get(this.jwtConfig.base)
  }
}
