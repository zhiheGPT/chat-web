import { computed, watch } from 'vue'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useAppStore } from '@/stores'

export function useTheme() {
  const appStore = useAppStore()
  const OsTheme = useOsTheme()

  const isDark = computed(() => {
    if (appStore.theme === 'auto')
      return OsTheme.value === 'dark'
    else
      return appStore.theme === 'dark'
  })

  const theme = computed(() => {
    return isDark.value ? darkTheme : undefined
  })

  const themeOverrides = computed(() => {
    if (isDark.value) {
      return {
        common: {

          primaryColor: '#eeeeee',
          primaryColorHover: "#ffffff",
        },
      }
    }
    return {
      common: {
        primaryColor: '#111111',
        primaryColorHover: "#333333",
      },
    }
  })

  watch(
    () => isDark.value,
    (dark) => {
      if (dark)
        document.documentElement.classList.add('dark')
      else
        document.documentElement.classList.remove('dark')
    },
    { immediate: true },
  )

  return { theme, themeOverrides }
}