import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { StyleProp, useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"
import {
  type Theme,
  type ThemeContexts,
  type ThemedStyle,
  type ThemedStyleArray,
  lightTheme,
  darkTheme,
} from "@/theme"
import * as SystemUI from "expo-system-ui"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { load, save, remove } from "@/utils/storage/storage"

// Adaptador do MMKV para o Zustand
const mmkvStorage = {
  getItem: (name: string) => {
    const value = load<string>(name)
    return value ?? null
  },
  setItem: (name: string, value: string) => {
    save(name, value)
  },
  removeItem: (name: string) => {
    remove(name)
  },
}

type ThemeStore = {
  isDark: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (isDark) => set({ isDark }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
)

type ThemeContextType = {
  themeScheme: ThemeContexts
  setThemeContextOverride: (newTheme: ThemeContexts) => void
}

// create a React context and provider for the current theme
export const ThemeContext = createContext<ThemeContextType>({
  themeScheme: undefined, // default to the system theme
  setThemeContextOverride: (_newTheme: ThemeContexts) => {
    console.error("Tried to call setThemeContextOverride before the ThemeProvider was initialized")
  },
})

const themeContextToTheme = (themeContext: ThemeContexts): Theme =>
  themeContext === "dark" ? darkTheme : lightTheme

const setImperativeTheming = (theme: Theme) => {
  SystemUI.setBackgroundColorAsync(theme.colors.background)
}

export const useThemeProvider = (initialTheme: ThemeContexts = undefined) => {
  const colorScheme = useColorScheme()
  const [overrideTheme, setTheme] = useState<ThemeContexts>(initialTheme)

  const setThemeContextOverride = useCallback((newTheme: ThemeContexts) => {
    setTheme(newTheme)
  }, [])

  const themeScheme = overrideTheme || colorScheme || "light"
  const navigationTheme = themeScheme === "dark" ? DarkTheme : DefaultTheme

  useEffect(() => {
    setImperativeTheming(themeContextToTheme(themeScheme))
  }, [themeScheme])

  return {
    themeScheme,
    navigationTheme,
    setThemeContextOverride,
    ThemeProvider: ThemeContext.Provider,
  }
}

/**
 * Custom hook that provides the app theme and utility functions for theming.
 *
 * @returns {UseAppThemeReturn} An object containing various theming values and utilities.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useAppTheme = () => {
  const navTheme = useNavTheme()
  const context = useContext(ThemeContext)
  const { isDark, toggleTheme } = useThemeStore()
  const systemColorScheme = useColorScheme()

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  const { themeScheme: overrideTheme, setThemeContextOverride } = context

  const themeContext: ThemeContexts = useMemo(
    () => overrideTheme || (navTheme.dark ? "dark" : "light"),
    [overrideTheme, navTheme],
  )

  const themeVariant: Theme = useMemo(() => themeContextToTheme(themeContext), [themeContext])

  const themed = useCallback(
    <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3)
      const stylesArray = flatStyles.map((f) => {
        if (typeof f === "function") {
          return (f as ThemedStyle<T>)(themeVariant)
        } else {
          return f
        }
      })

      // Flatten the array of styles into a single object
      return Object.assign({}, ...stylesArray) as T
    },
    [themeVariant],
  )

  return {
    navTheme,
    setThemeContextOverride,
    theme: themeVariant,
    themeContext,
    themed,
    isDark: isDark ?? systemColorScheme === "dark",
    toggleTheme,
  }
}
