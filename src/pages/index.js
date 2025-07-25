import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  const posterImages = [
    "/posters/folon.jpg",
    "/posters/escher.jpg",
    "/posters/herge.jpg",
    "/posters/hokusai.jpg"
  ];

  const [visible, setVisible] = useState(true);
  const [posterA, setPosterA] = useState(posterImages[0]);
  const [posterB, setPosterB] = useState(posterImages[1]);

  const indexRef = useRef(1);
  const visibleRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (indexRef.current + 1) % posterImages.length;
      const next = posterImages[nextIndex];

      if (visibleRef.current) {
        setPosterB(next);
      } else {
        setPosterA(next);
      }

      setVisible(prev => {
        visibleRef.current = !prev;
        return !prev;
      });

      indexRef.current = nextIndex;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.h1}>MathLive</h1>
        <img alt="MathLive Logo" height="384" width="384" src="/img/logo.webp"></img>
        <p className={styles.subtitle}>Scientific Computing for Everyone</p>
      </header>

      <div className={styles.pods}>
        <a href="/mathfield">
          <div className={clsx(styles.pod, styles.mathfieldPod)}>
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
          <div className={clsx(styles.pod, styles.computeEnginePod)}>
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
          <div className={clsx(styles.pod, styles.mathJsonPod)}>
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

      {/* <div className={styles.posterContainer}>
        <img
          src={posterA}
          className={clsx(styles.poster, visible ? styles.fadeIn : styles.fadeOut)}
          alt="Poster A"
        />
        <img
          src={posterB}
          className={clsx(styles.poster, !visible ? styles.fadeIn : styles.fadeOut)}
          alt="Poster B"
        />
      </div> */}

    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Scientific Computing for Everyone`}
      description="CortexJS: Enhancing scientific computing with user-friendly mathfield for easy math input, MathJSON for a web-native math format, and a versatile Compute Engine for symbolic and numerical computation."
    >
      <main>
        <HomepageHeader/>
      </main>
    </Layout>
  );
}
