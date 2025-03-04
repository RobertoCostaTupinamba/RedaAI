import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native"
import { LoginScreen } from "../../app/screens/LoginScreen"
import { NavigationContainer } from "@react-navigation/native"
import { RootStore, RootStoreModel, RootStoreProvider } from "../../app/models"
import { authApi } from "../../app/services/api/auth-api"

// Mock das dependências de navegação
const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}))

// Mock do authApi
jest.mock("../../app/services/api/auth-api", () => ({
  authApi: {
    login: jest.fn(),
  },
}))

describe("LoginScreen", () => {
  let store: RootStore

  beforeEach(() => {
    jest.clearAllMocks()
    store = RootStoreModel.create({
      authenticationStore: {
        authToken: undefined,
        authEmail: "",
        password: "",
        confirmPassword: "",
        name: "",
        isLoading: false,
        error: undefined,
      },
      userStore: {
        name: "",
        email: "",
        score: 0,
        lastAccess: undefined,
        createdAt: undefined,
      },
    })
  })

  const renderLoginScreen = () => {
    return render(
      <RootStoreProvider value={store}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </RootStoreProvider>,
    )
  }

  it("deve renderizar corretamente", () => {
    renderLoginScreen()

    // Verifica se os elementos principais estão presentes
    expect(screen.getByText("RedaAI")).toBeTruthy()
    expect(screen.getByText("Faça login para continuar")).toBeTruthy()
    expect(screen.getByPlaceholderText("Seu email")).toBeTruthy()
    expect(screen.getByPlaceholderText("Sua senha")).toBeTruthy()
    expect(screen.getByText("Entrar")).toBeTruthy()
  })

  it("deve mostrar erro de validação quando campos estão vazios", async () => {
    renderLoginScreen()

    // Tenta fazer login com campos vazios
    fireEvent.press(screen.getByText("Entrar"))

    // Verifica se o erro de validação é exibido
    expect(store.authenticationStore.error).toBe("Email não pode ficar em branco")
  })

  it("deve navegar para HomeDrawer após login bem sucedido", async () => {
    renderLoginScreen()

    // Mock do login bem sucedido
    ;(authApi.login as jest.Mock).mockResolvedValueOnce({
      kind: "ok",
      data: {
        token: "fake-token",
        user: {
          name: "Test User",
          email: "test@example.com",
          score: 0,
          last_access: "2024-03-04",
          created_at: "2024-03-04",
        },
      },
    })

    // Preenche os campos
    fireEvent.changeText(screen.getByPlaceholderText("Seu email"), "test@example.com")
    fireEvent.changeText(screen.getByPlaceholderText("Sua senha"), "password123")

    // Tenta fazer login
    fireEvent.press(screen.getByText("Entrar"))

    // Verifica se navegou para HomeDrawer
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("HomeDrawer")
    })
  })

  it("deve navegar para tela de cadastro ao clicar em Cadastre-se", () => {
    renderLoginScreen()

    // Clica no botão de cadastro
    fireEvent.press(screen.getByText("Cadastre-se"))

    // Verifica se navegou para tela de cadastro
    expect(mockNavigate).toHaveBeenCalledWith("SignUp")
  })

  it("deve mostrar loading durante o processo de login", async () => {
    renderLoginScreen()

    // Mock do login com delay
    ;(authApi.login as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              kind: "ok",
              data: {
                token: "fake-token",
                user: {
                  name: "Test User",
                  email: "test@example.com",
                  score: 0,
                  last_access: "2024-03-04",
                  created_at: "2024-03-04",
                },
              },
            })
          }, 100)
        }),
    )

    // Preenche os campos
    fireEvent.changeText(screen.getByPlaceholderText("Seu email"), "test@example.com")
    fireEvent.changeText(screen.getByPlaceholderText("Sua senha"), "password123")

    // Tenta fazer login
    fireEvent.press(screen.getByText("Entrar"))

    // Verifica se o loading está visível
    await waitFor(() => {
      expect(screen.getByText("Entrando...")).toBeTruthy()
    })
  })
})
