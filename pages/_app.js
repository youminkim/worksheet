import '@shopify/polaris/styles.css';
import '../style.css'
import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
        <AppProvider 
            i18n={translations}
            features={{newDesignLanguage: true}}>
            <Component {...pageProps} />
        </AppProvider>
    </React.Fragment>
  )
}
