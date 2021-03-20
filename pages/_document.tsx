import { ServerStyleSheets as MaterialSheets } from "@material-ui/core/styles";
import Document from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const materialSheet = new MaterialSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
          materialSheet.collect(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheet.getStyleElement()}
          </>
        ),
      }
    } finally {
    }
  }
}