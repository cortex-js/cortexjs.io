import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HeroImage from "@site/src/components/HeroImage";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <header className={clsx("hero hero--primary", styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro"
//           >
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

function HomepageHeader({ height }) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <HeroImage
        path="/img/hero/farsight.jpg"
        imageStyle={{
          filter: "brightness(0.6) grayscale(0.2)",
        }}
        backgroundStyle={{ background: "black" }}
        style={{ "--container-height": "90vh" }}
      >
        <h1 className={styles.h1}>CortexJS</h1>
        <p className={styles.subtitle}>Scientific Computing for Everyone</p>
        <div className={styles.section}>
          <a href="/mathfield">
            <div className={styles.container}>
              <Heading as="h2" className={styles.title}>
                Mathfield
              </Heading>
              <p className={styles.description}>
                A web component to edit math, rendered with LaTex.
              </p>
            </div>
          </a>

          <a href="/math-json">
            <div className={styles.container}>
              <Heading as="h2" className={styles.title}>
                MathJSON
              </Heading>
              <p className={styles.description}>
                A JSON schema to represent math expressions.
              </p>
            </div>
          </a>

          <a href="/compute-engine/">
            <div className={styles.container}>
              <Heading as="h2" className={styles.title}>
                Compute Engine
              </Heading>
              <p className={styles.description}>
                A versatile Compute Engine for symbolic and numerical
                computation.
              </p>
            </div>
          </a>
        </div>
      </HeroImage>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`CortexJS -- Scientific Computing for Everyone`}
      description="CortexJS: Enhancing scientific computing with user-friendly mathfield for easy math input, MathJSON for a web-native math format, and a versatile Compute Engine for symbolic and numerical computation."
    >
      <main>
        <HomepageHeader height="80vh" />
      </main>
    </Layout>
  );
}
