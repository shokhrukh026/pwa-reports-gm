import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import localLangs from '@/utils/locales'
// import useJwt from '@/auth/jwt/useJwt'

Vue.use(VueI18n)
function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

// function detectLang() {
//   try {
//     return useJwt.getUserData().profile.language
//   } catch {
//     return localLangs[1].locale
//   }
// }

export default new VueI18n({
  locale: 'uz',
  fallbackLocale: 'uz',
  messages: loadLocaleMessages(),
})
