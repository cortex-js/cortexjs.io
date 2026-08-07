// Wraps the default doc layout to advertise the page's raw markdown twin.
//
// The llms-txt plugin emits /epsil/mcp.md alongside /epsil/mcp/. Because
// GitHub Pages cannot negotiate content types, a client holding the HTML URL
// has no way to ask for the markdown one — this link is how it finds out.

import React from "react";
import Layout from "@theme-original/DocItem/Layout";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useDoc } from "@docusaurus/plugin-content-docs/client";

import { markdownPath } from "@site/plugins/llms-txt/markdown-path";

export default function DocItemLayout(props) {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="text/markdown"
          href={markdownPath(metadata.permalink, siteConfig.baseUrl)}
        />
      </Head>
      <Layout {...props} />
    </>
  );
}
