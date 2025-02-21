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

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.h1}>CortexJS</h1>
        <p className={styles.subtitle}>Scientific Computing for Everyone</p>
        <div className={styles.pods}>
          <a href="/mathfield">
            <div className={styles.pod}>
              <Heading as="h2" className={styles.title}>
                Mathfield
              </Heading>
              <p className={styles.description}>
                A web component to <strong>edit math</strong>, rendered with <strong>LaTeX</strong>
              </p>
              <div><button>Learn More</button></div>
            </div>
          </a>

          <a href="/compute-engine/">
            <div className={styles.pod}>
              <Heading as="h2" className={styles.title}>
                Compute Engine
              </Heading>
              <p className={styles.description}>
                A versatile library for <strong>symbolic</strong> and <strong>numerical</strong>  computation
              </p>
              <div><button>Learn More</button></div>
            </div>
          </a>

          <a href="/math-json">
            <div className={styles.pod}>
              <Heading as="h2" className={styles.title}>
                MathJSON
              </Heading>
              <p className={styles.description}>
                A <strong>JSON schema</strong> to represent math expressions in a web-native format
              </p>
              <div><button>Learn More</button></div>
            </div>
          </a>

        </div>
      </div>
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
        <HomepageHeader/>
      </main>
    </Layout>
  );
}
