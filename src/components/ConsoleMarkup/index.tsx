import styles from "./styles.module.css";
import useIsBrowser from '@docusaurus/useIsBrowser';

const INDENT = "  ";

function jsxJoin(
  array: React.ReactNode[],
  sep: React.ReactNode,
): React.ReactNode {
  if (array.length === 0) return null;
  return array.reduce((result, item) => (
    <>
      {result}
      {sep}
      {item}
    </>
  ));
}

function sep(str: string): React.ReactNode {
  return <span className={styles.sep}>{str}</span>;
}

function ws(n: number): React.ReactNode {
  return <span className={styles.ws}>{INDENT.repeat(n)}</span>;
}

function renderJson(
  value: any,
  options: { ancestors?: any[]; quote?: string } = { ancestors: [] },
  depth = 0,
): { nodes: React.ReactNode; itemCount: number; lineCount: number } {
  //
  // NULL/UNDEFINED
  //
  if (value === null || value === undefined) {
    return {
      nodes: <span className={styles.null}>{String(value)}</span>,
      itemCount: 1,
      lineCount: 1,
    };
  }

  //
  // BOOLEAN
  //
  if (typeof value === "boolean") {
    return {
      nodes: <span className={styles.boolean}>{String(value)}</span>,
      itemCount: 1,
      lineCount: 1,
    };
  }

  //
  // NUMBER
  //
  if (typeof value === "number") {
    return {
      nodes: <span className={styles.number}>{String(value)}</span>,
      itemCount: 1,
      lineCount: 1,
    };
  }

  //
  // STRING
  //
  if (typeof value === "string") {
    const quote = options.quote ?? "";
    return {
      nodes: (
        <span className={styles.string}>{`${quote}${value}${quote}`}</span>
      ),
      itemCount: 1,
      lineCount: value.split(/\r\n|\r|\n/).length,
    };
  }

  //
  // FUNCTION
  //
  if (typeof value === "function") {
    let functionValue = "";
    if ("toString" in value) functionValue = value.toString();
    else functionValue = String(value);

    return {
      nodes: <span className={styles.function}>ƒ {functionValue}</span>,
      itemCount: 1,
      lineCount: functionValue.split(/\r\n|\r|\n/).length,
    };
  }

  // Avoid infinite recursions (e.g. `window.window`)
  if (depth > 20) return { nodes: sep("(...)"), itemCount: 1, lineCount: 1 };

  //
  // ARRAY
  //
  if (Array.isArray(value)) {
    if (options.ancestors?.includes(value))
      return { nodes: sep("[...]"), itemCount: 1, lineCount: 1 };

    const result = [];
    // To account for sparse array, we can't use map() (it skips over empty slots)
    for (let i = 0; i < value.length; i++) {
      if (Object.keys(value).includes(Number(i).toString())) {
        result.push(
          renderJson(
            value[i],
            { ...options, ancestors: [...options.ancestors, value] },
            depth + 1,
          ),
        );
      } else {
        result.push({
          nodes: <span className={styles.empty}>empty</span>,
          itemCount: 1,
          lineCount: 1,
        });
      }
    }
    const itemCount = result.reduce((acc, val) => acc + val.itemCount, 0);
    const lineCount = result.reduce(
      (acc, val) => Math.max(acc, val.lineCount),
      0,
    );
    if (itemCount > 5 || lineCount > 1) {
      return {
        nodes: (
          <>
            {sep("[")}
            {"\n"}
            {ws(depth + 1)}
            <>
              {jsxJoin(
                result.map((x, i) => (
                  <>
                    <span className={styles.index}>{i}</span>
                    <>{x.nodes}</>
                  </>
                )),
                <>
                  {sep(", ")}
                  {"\n"}
                  {ws(depth + 1)}
                </>,
              )}
              {"\n"}
            </>
            {ws(depth)}
            {sep("]")}
          </>
        ),
        itemCount,
        lineCount: 2 + result.reduce((acc, val) => acc + val.lineCount, 0),
      };
    }
    return {
      nodes: (
        <>
          {sep("[")}
          {jsxJoin(
            result.map((x) => x.nodes),
            sep(", "),
          )}
          {sep("]")}
        </>
      ),
      itemCount: Math.max(1, itemCount),
      lineCount: 1,
    };
  }

  //
  // HTMLElement
  //
  const isBrowser = useIsBrowser();
  if (isBrowser && value instanceof Element) {
    if (options.ancestors?.includes(value))
      return {
        nodes: (
          <span className={styles.object}>
            {`<${value.localName ?? ""}.../>`}
          </span>
        ),
        itemCount: 1,
        lineCount: 1,
      };

    let result = `<${value.localName}`;
    let lineCount = 1;
    Array.from(value.attributes).forEach((x) => {
      result +=
        " " + x.localName + '="' + value.getAttribute(x.localName) + '"';
    });
    result += ">";

    if (value.innerHTML) {
      let content = value.innerHTML.split("\n");
      if (content.length > 4) {
        content = [...content.slice(0, 5), "(...)\n"];
      }
      result += content.join("\n");
      lineCount += content.length;
    }

    result += `</${value.localName}>`;
    return {
      nodes: <span className={styles.object}>{result}</span>,
      itemCount: 1,
      lineCount: lineCount,
    };
  }

  //
  // OBJECT
  //
  if (typeof value === "object") {
    if (options.ancestors.includes(value))
      return {
        nodes: sep("{...}"),
        itemCount: 1,
        lineCount: 1,
      };

    if (value instanceof Map) {
      const kv = Object.fromEntries(value);
      const result = renderJson(
        kv,
        { ...options, ancestors: [...options.ancestors, value] },
        depth,
      );
      return {
        ...result,
        nodes: (
          <>
            <span className={styles.object}>Map</span>
            {result.nodes}
          </>
        ),
      };
    }
    if (value instanceof Set) {
      const elts = Array.from(value);
      const result = renderJson(
        elts,
        { ...options, ancestors: [...options.ancestors, value] },
        depth,
      );
      return {
        ...result,
        nodes: (
          <>
            <span className={styles.object}>Set</span>
            {result.nodes}
          </>
        ),
      };
    }

    if ("toString" in value) {
      const s = value.toString();
      if (s !== "[object Object]")
        return {
          nodes: <>{s}</>,
          itemCount: 1,
          lineCount: 1,
        };
    }
    let props = Object.keys(value);

    Object.getOwnPropertyNames(value).forEach((prop) => {
      if (!props.includes(prop)) {
        props.push(prop);
      }
    });
    props = props.filter((x) => !x.startsWith("_"));
    if (props.length === 0 && typeof props.toString === "function") {
      const result = value.toString();
      if (result === "[object Object]")
        return {
          nodes: sep("{}"),
          itemCount: 1,
          lineCount: 1,
        };
      return {
        nodes: <>result</>,
        itemCount: 1,
        lineCount: result.split(/\r\n|\r|\n/).length,
      };
    }

    const propStrings = props.sort().map((key) => {
      if (typeof value[key] === "object" && value[key] !== null) {
        let result = renderJson(
          value[key],
          { ...options, ancestors: [...options.ancestors, value] },
          depth + 1,
        );
        if (result.itemCount > 500) {
          result = {
            nodes: sep("(...)"),
            itemCount: 1,
            lineCount: 1,
          };
        }
        return {
          ...result,
          nodes: (
            <>
              <span className={styles.property}>{key}</span>
              {sep(": ")}
              {result.nodes}
            </>
          ),
        };
      }
      if (typeof value[key] === "function") {
        return {
          nodes: (
            <>
              <span className={styles.property}>{key}</span>
              {sep(": ")}
              <span className={styles.function}>ƒ (...)</span>
            </>
          ),
          itemCount: 1,
          lineCount: 1,
        };
      }
      const result = renderJson(
        value[key],
        { ...options, ancestors: [...options.ancestors, value] },
        depth + 1,
      );
      return {
        nodes: (
          <>
            <span className={styles.property}>{key}</span>
            {sep(": ")}
            {result.nodes}
          </>
        ),
        itemCount: result.itemCount,
        lineCount: result.lineCount,
      };
    });
    const itemCount = propStrings.reduce((acc, val) => acc + val.itemCount, 0);
    const lineCount = propStrings.reduce((acc, val) => acc + val.lineCount, 0);
    if (itemCount < 5) {
      return {
        nodes: (
          <>
            {sep("{")}
            {jsxJoin(
              propStrings.map((x) => x.nodes),
              sep(", "),
            )}
            {sep("}")}
          </>
        ),
        itemCount,
        lineCount,
      };
    }
    return {
      nodes: (
        <>
          {sep("{")}
          "\n"
          {ws(depth + 1)}
          {jsxJoin(
            propStrings.map((x) => x.nodes),
            <>
              {sep(", ")}
              \n
              {ws(depth + 1)}
            </>,
          )}
          {ws(depth)}
          {sep("}")}
        </>
      ),

      itemCount: itemCount,
      lineCount: lineCount + 2,
    };
  }

  return { nodes: <>String(value)</>, itemCount: 1, lineCount: 1 };
}

export default function ConsoleMarkup({ value, style, quote = '"' }) {
  return (
    <div style={style} className={styles.console}>
      {renderJson(value, { quote, ancestors: [] }).nodes}
    </div>
  );
}
