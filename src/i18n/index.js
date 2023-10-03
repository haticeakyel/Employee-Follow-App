// dont remove
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from '@aurora/vue-locale';

Vue.use(VueI18n);

function importAll(r) {
  const locale = {};
  r.keys().forEach(key => {
    locale[key.replace('./', '').replace('.json', '')] = r(key);
  });
  return locale;
}

const messages = {
  'en_US': importAll(require.context('./en_US', true, /.json$/)),
  'zh_CN': importAll(require.context('./zh_CN', true, /.json$/))
};

const i18n = locale.initI18n({ VueI18n, messages })

export default i18n;
