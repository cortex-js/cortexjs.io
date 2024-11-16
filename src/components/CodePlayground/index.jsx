
/**
 * For a change in a slot to take effect, the `slot` attribute 
 * must be removed and then added again. This is per the HTML5 spec, curiously.
 */
function slot(name , content) {
  return { ref: (e) => {
    if (e === null) return null;
    e.removeAttribute("slot");
    e.setAttribute("slot", name) },
    dangerouslySetInnerHTML: {__html: content}
  };
}

export default function CodePlayground({stylesheet, html, js}) {
  return (
    <code-playground>
      {stylesheet && <div {...slot("style", stylesheet)}></div>}
      {html && <div {...slot("html", html)}></div>}
      {js && <div {...slot("javascript", js)}></div>}
    </code-playground>
  );
}