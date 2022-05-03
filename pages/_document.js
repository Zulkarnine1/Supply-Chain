import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/faavicon.ico" />
          <script
            src="https://assets.flex.twilio.com/releases/flex-webchat-ui/2.9.1/twilio-flex-webchat.min.js"
            integrity="sha512-yBmOHVWuWT6HOjfgPYkFe70bboby/BTj9TGHXTlEatWnYkW5fFezXqW9ZgNtuRUqHWrzNXVsqu6cKm3Y04kHMA=="
            crossOrigin={"true"}
          ></script>

          <script type="text/javascript" src="/assets/data/configs.js"></script>
        </Head>
        <body className="px-0">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
