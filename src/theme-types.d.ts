// Loads the type declarations of the classic theme's components, such as
// `@theme/NotFound/Content`, so that a swizzled component under `src/theme`
// can import its `Props` type. `@docusaurus/module-type-aliases` declares only
// a handful of `@theme/*` modules; the rest are declared by
// `@docusaurus/theme-classic/src/theme-classic.d.ts`, which TypeScript loads
// only when a file in the program references it. This file is that reference.
/// <reference types="@docusaurus/theme-classic" />
