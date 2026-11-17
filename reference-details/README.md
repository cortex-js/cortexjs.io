# Reference details

The pages of the Epsil library reference on epsil.dev
(`docs/epsil/reference/<library>.md`) are generated in the compute-engine
repo from the library definitions. Those definitions ship in the engine
bundle, so they stay short: a summary, a signature and an example, which
`epsil doc` and the editor also show.

The long text of an entry is written here, in `<library>.md`, and
`scripts/sync-epsil-docs.mjs` splices it into the page. The Compute Engine
team edits these files in this repo.

## Format

- `## <MathJSON name>` starts the detail of the entry with that MathJSON
  name (`## Sum`, not `## sum`).
- The text before a `### MathJSON` line is shown under the entry. Write it in
  Epsil terms. A subsection is a `####` heading.
- The text after `### MathJSON` goes in the entry's MathJSON disclosure,
  which is closed by default and headed by the MathJSON name and the LaTeX
  commands of the definition. It has no headings.
- `## Section: <Heading>` is a section of the page's overview: it is
  inserted as `## <Heading>` before the definitions. Its subsections are
  `###` headings.

On a page with a detail file, the MathJSON name of every entry that has
LaTeX commands or a MathJSON part moves from the line under the heading into
that heading. With LaTeX commands and no MathJSON part, the heading is a line
that does not open.

## Examples

- Write Epsil examples in `epsil` fences, each result on a `// ➔` line.
  `npm run verify:details` runs every fence with the `epsil` CLI of
  `../compute-engine` and checks the results. A program whose result cannot
  be printed, such as a random draw, comes after the last `// ➔` line of its
  fence: it is run and must not fail.
- MathJSON examples go in the MathJSON part.
- JavaScript API examples (`ce.parse`, `.subs`, …) do not go here: link to
  the Compute Engine guide that covers them.
- In prose, keep `{…}` and `<…>` in code spans: the pages are MDX.

## Moving a hand-written MathJSON reference page

When every entry of a page of `docs/compute-engine/*-reference-*.md` has
moved here, replace the page with a `<ReferenceMoved>` stub. It keeps every
old anchor, so links to them still pass the build's checks, and sends each
one to its new entry. A MathJSON name goes to its entry by itself; give the
other anchors in its `anchors` map.
