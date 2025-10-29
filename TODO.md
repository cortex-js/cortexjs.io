
## Suggestions for Improvement

The existing documentation is well-structured and comprehensive. The following suggestions aim to enhance its consistency and clarity further.

#### 1. Standardize Reference Page Structure
The `combinatorics` and `number-theory` reference pages are excellent models. They provide a clear, concise summary for each function before showing the signature and code examples.
*   **Suggestion:** Adopt this "summary-first" structure for all API reference pages (e.g., `arithmetic`, `collections`). A short, descriptive paragraph explaining what a function like `Sum` or `Product` does and its real-world use case would be very helpful before diving into its signatures.

#### 2. Clarify Distinction Between Callouts
The usage of `:::warning` and `:::caution` is sometimes interchangeable.
*   **Suggestion:** Formalize their use cases as defined in the style guide above:
    *   `warning`: For potential errors, unexpected behavior, or things that might not work as a developer expects (e.g., the `file://` protocol limitations).
    *   `caution`: Reserve this for higher-stakes issues, especially those related to security (like CSP and Trusted Types) or irreversible actions.

#### 3. Enhance Inter-linking
The use of `<ReadMore>` is effective, but there are opportunities for more granular, in-context linking.
*   **Suggestion:** Whenever a technical term from another page is mentioned (e.g., "canonical form," "boxed expression," "MathJSON"), link it directly to its definition page on its first use in an article. This helps readers who may not be reading the documentation sequentially.

#### 4. Expand the Tutorials Section
The "Simple Quiz" tutorial is a fantastic, practical example. Building more of these would significantly improve the learning curve for new users.
*   **Suggestion:** Add tutorials covering other common use cases:
    *   **Building a Scientific Calculator:** A tutorial focused on using `expr.evaluate()` and `expr.N()` with a more complex, customized virtual keyboard.
    *   **Creating a Dynamic Worksheet:** Showcase how to use `readonly` fields with multiple `\placeholder` prompts and dynamically update the content.
    *   **Advanced Symbolic Manipulation:** A guide on using `expr.subs()` and `expr.replace()` to build a simple equation solver or expression transformer.

#### 5. Be Explicit About "Mathfield" vs. "MathfieldElement"
The documentation sometimes uses `mathfield` and `MathfieldElement` interchangeably. While context often makes it clear, being explicit can prevent confusion.
*   **Suggestion:**
    *   Use `<math-field>` when referring to the HTML tag.
    *   Use `MathfieldElement` when referring to the JavaScript class or its static properties/methods (`MathfieldElement.computeEngine`).
    *   Use "mathfield" (lowercase) as a general term for an instance of the component on a page.

## Future Expansion

### Interactive Applications Architecture

**Recommended Approach:** Deploy interactive applications as separate React apps on subdomains, keeping them independent from the Docusaurus documentation site.

**Deployment Strategy:**
- Use Cloudflare for subdomain routing and CDN
- Each app deployed to its own subdirectory in the build
- DNS configuration: CNAME records for each subdomain pointing to the main domain
- Cloudflare Workers or Page Rules to route subdomains to appropriate directories

**Implementation Structure:**
```
cortexjs.io/
├── src/
│   ├── pages/          # Docusaurus pages (documentation)
│   ├── components/     # Documentation components
│   └── apps/           # Interactive applications
│       ├── editor/
│       ├── calculator/
│       ├── grapher/
│       └── notebook/
├── build/
│   ├── docs/           # Main documentation site
│   └── apps/           # Built applications
│       ├── editor/     # → editor.mathlive.io
│       ├── calculator/ # → calculator.mathlive.io
│       ├── grapher/    # → grapher.mathlive.io
│       └── notebook/   # → notebook.mathlive.io
```

### Interactive Applications

- **`editor.mathlive.io`** - LaTeX/MathLive Editor
  - Split-pane interface: MathLive mathfield on one side, LaTeX editor on the other
  - Bidirectional real-time synchronization between panels
  - LaTeX side uses CodeMirror or Monaco Editor with LaTeX syntax highlighting
  - Configurable layout: horizontal or vertical split (responsive to device/user preference)
  - Future: Session saving with left sidebar for saved expressions
  - Export options: Copy as LaTeX, MathML, or image

- **`calculator.mathlive.io`** - Scientific Calculator
  - MathLive input field at bottom for expression entry
  - Scrollable history of calculations above
  - Integration with Compute Engine for evaluation
  - "ans" variable to reference previous result (with custom virtual keyboard key)
  - Session persistence using localStorage
  - Export history as text or LaTeX

- **`grapher.mathlive.io`** - Function Graphing Tool
  - Desmos-style interface with function list panel and graph canvas
  - MathLive input for function definitions
  - Automatic detection of function type:
    - 2D Cartesian (y = f(x))
    - 2D Parametric (x(t), y(t))
    - Polar (r = f(θ))
    - 3D surfaces (z = f(x,y))
  - Interactive pan, zoom, and trace features
  - Export graphs as SVG or PNG

- **`notebook.mathlive.io`** - Interactive Math Notebook
  - Jupyter-style cell-based interface
  - MathLive for mathematical input/output
  - Compute Engine for evaluations
  - Markdown cells for documentation
  - Save/load notebooks as JSON
  - Export to LaTeX, PDF, or HTML

### Shared Components Strategy

To ensure consistent header/footer across all applications:

**Shared Component Library** (`src/shared/`)
- **Components**: Reusable Header and Footer components in React
- **Configuration**: Centralized navigation config in JSON format
- **Styles**: Shared CSS variables and brand styles

**Implementation:**
```javascript
// In any React app (Docusaurus or standalone)
import { Header, Footer } from '../shared/components';

function App() {
  return (
    <>
      <Header currentApp="editor" />
      {/* App content */}
      <Footer />
    </>
  );
}
```

**Benefits:**
- Single source of truth for navigation
- Consistent branding across all apps
- Easy updates propagate to all applications
- Dark mode support built-in

### Implementation Phases

**Phase 1: Infrastructure Setup**
- ✅ Create shared component library structure
- ✅ Extract navigation configuration
- ✅ Build reusable Header/Footer components
- Configure build pipeline for multiple apps
- Set up Cloudflare routing for subdomains

**Phase 2: MVP Development**
- Start with editor.mathlive.io as proof of concept
- Implement core split-pane functionality
- Deploy and test subdomain routing

**Phase 3: Full Rollout**
- Develop remaining applications
- Add persistence and sharing features
- Implement analytics and error tracking

**Phase 4: Enhancement**
- User accounts and cloud storage
- Collaborative features
- API for embedding in other sites
