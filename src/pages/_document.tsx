import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='application-name' content='EduBridge' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='EduBridge' />
        <meta name='description' content='Your app description' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#3b82f6' />

        <link rel='apple-touch-icon' href='/pic1.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/logo.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}