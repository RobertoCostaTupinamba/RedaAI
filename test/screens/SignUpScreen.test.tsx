import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native"
import { SignUpScreen } from "../../app/screens/SignUpScreen"
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
    signUp: jest.fn(),
  },
}))

describe("SignUpScreen", () => {
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

  const renderSignUpScreen = () => {
    return render(
      <RootStoreProvider value={store}>
        <NavigationContainer>
          <SignUpScreen />
        </NavigationContainer>
      </RootStoreProvider>,
    )
  }

  it("deve renderizar corretamente", () => {
    renderSignUpScreen()

    // Verifica se os elementos principais estão presentes
    expect(screen.getByText("RedaAI")).toBeTruthy()
    expect(screen.getByText("Crie sua conta")).toBeTruthy()
    expect(screen.getByPlaceholderText("Seu nome completo")).toBeTruthy()
    expect(screen.getByPlaceholderText("Seu melhor email")).toBeTruthy()
    expect(screen.getByPlaceholderText("Escolha uma senha segura")).toBeTruthy()
    expect(screen.getByPlaceholderText("Digite a senha novamente")).toBeTruthy()
    expect(screen.getByText("Cadastrar")).toBeTruthy()
  })

  it("deve mostrar erro de validação quando campos estão vazios", () => {
    renderSignUpScreen()

    // Tenta fazer cadastro com campos vazios
    fireEvent.press(screen.getByText("Cadastrar"))

    // Verifica se o erro de validação é exibido
    expect(store.authenticationStore.error).toBe("Email não pode ficar em branco")
  })

  it("deve mostrar erro quando senhas não coincidem", () => {
    renderSignUpScreen()

    // Preenche os campos com senhas diferentes
    fireEvent.changeText(screen.getByPlaceholderText("Seu nome completo"), "Test User")
    fireEvent.changeText(screen.getByPlaceholderText("Seu melhor email"), "test@example.com")
    fireEvent.changeText(screen.getByPlaceholderText("Escolha uma senha segura"), "password123")
    fireEvent.changeText(screen.getByPlaceholderText("Digite a senha novamente"), "password456")

    // Tenta fazer cadastro
    fireEvent.press(screen.getByText("Cadastrar"))

    // Verifica se o erro é exibido
    expect(store.authenticationStore.error).toBe("As senhas não coincidem")
  })

  it("deve navegar para Login após cadastro bem sucedido", async () => {
    renderSignUpScreen()

    // Mock do cadastro bem sucedido
    ;(authApi.signUp as jest.Mock).mockResolvedValueOnce({
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
    fireEvent.changeText(screen.getByPlaceholderText("Seu nome completo"), "Test User")
    fireEvent.changeText(screen.getByPlaceholderText("Seu melhor email"), "test@example.com")
    fireEvent.changeText(screen.getByPlaceholderText("Escolha uma senha segura"), "password123")
    fireEvent.changeText(screen.getByPlaceholderText("Digite a senha novamente"), "password123")

    // Tenta fazer cadastro
    fireEvent.press(screen.getByText("Cadastrar"))

    // Verifica se navegou para Login
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("Login")
    })
  })

  it("deve navegar para Login ao clicar em Faça login", () => {
    renderSignUpScreen()

    // Clica no botão de login
    fireEvent.press(screen.getByText("Faça login"))

    // Verifica se navegou para Login
    expect(mockNavigate).toHaveBeenCalledWith("Login")
  })

  it("deve mostrar loading durante o processo de cadastro", async () => {
    renderSignUpScreen()

    // Mock do cadastro com delay
    ;(authApi.signUp as jest.Mock).mockImplementationOnce(
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
    fireEvent.changeText(screen.getByPlaceholderText("Seu nome completo"), "Test User")
    fireEvent.changeText(screen.getByPlaceholderText("Seu melhor email"), "test@example.com")
    fireEvent.changeText(screen.getByPlaceholderText("Escolha uma senha segura"), "password123")
    fireEvent.changeText(screen.getByPlaceholderText("Digite a senha novamente"), "password123")

    // Tenta fazer cadastro
    fireEvent.press(screen.getByText("Cadastrar"))

    // Verifica se o loading está visível
    await waitFor(() => {
      expect(screen.getByText("Cadastrando...")).toBeTruthy()
    })
  })
})
