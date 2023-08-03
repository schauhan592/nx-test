/* eslint-disable react/display-name */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} />,
        enhanceComponent: (Component) => Component,
      });

    const intialProps = await Document.getInitialProps(ctx);

    return { ...intialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          {/* <link rel="shortcut icon" href="/assets/a.png" /> */}
          <link rel="shortcut icon" href="./favicon/android-chrome-192x192.png" />

          {/* <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Sora&display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Sora&display=swap"
            rel="stylesheet"
          />
          {this.props.styles}
          <title>Alfred</title>
        </Head>
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');`,
          }}
        />
        <body style={{ margin: 0, height: '100%', minHeight: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
