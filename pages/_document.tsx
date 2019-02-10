import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <html>
      <Head>
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
      </Head>
      <body className='custom_class'>
      <Main />
      <NextScript />
      </body>
      </html>
    )
  }
}
