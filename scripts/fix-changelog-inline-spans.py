#!/usr/bin/env python3
"""Collapse newlines inside inline code (`...`) and inline math ($...$) spans.

The changelog is concatenated from an upstream CHANGELOG.md whose prose is
hard-wrapped to ~80 columns. When that wrapping falls *inside* an inline
`code` span or `$math$` span, the span's text ends up containing a newline.

Docusaurus's MDXCode component (theme-classic .../MDXComponents/Code.tsx)
renders any inline code whose content contains "\n" as a block <CodeBlock>
(<pre>) instead of inline <code>. remark-math emits inline math as
<code class="language-math">, so a wrapped $...$ span is promoted the same
way. A block <pre> nested inside the surrounding list-item <p> is invalid
HTML (<pre>/<div> cannot descend from <p>), which crashes React hydration
(minified error #418 + a removeChild cascade) on the changelog page.

Fixing it is safe: a newline inside `code`/$math$ is insignificant to the
rendered output, so replacing the newline + continuation indent with a single
space keeps the content identical while keeping the span inline.

Only inline spans are touched; fenced code blocks (``` ... ```) are skipped
entirely, and math is only processed outside inline-code segments so a literal
'$' inside `code` is never mistaken for a math delimiter.
"""
import re
import sys


def collapse(span: str) -> str:
    # Replace a newline plus any surrounding horizontal whitespace with one space.
    return re.sub(r"[ \t]*\n[ \t]*", " ", span)


def fix_math(text: str) -> str:
    # Pair single-dollar math delimiters by splitting on unescaped '$'.
    # Odd-indexed segments are the interior of a $...$ span. Only collapse when
    # the dollar count is balanced (even number of segments-1), so a stray '$'
    # in prose can never flip pairing and merge unrelated text.
    if "$$" in text:
        return text  # display math — leave untouched (none in practice)
    segs = re.split(r"(?<!\\)\$", text)
    if len(segs) % 2 == 0:  # odd number of '$' → unbalanced, don't touch
        return text
    for i in range(1, len(segs), 2):
        if "\n" in segs[i]:
            segs[i] = collapse(segs[i])
    return "$".join(segs)


def fix_paragraph(text: str) -> str:
    # Split on backticks: even indices are outside inline code, odd indices are
    # the contents of an inline-code span.
    parts = text.split("`")
    for i, part in enumerate(parts):
        if i % 2 == 1:
            # Inside an inline-code span: collapse any newline.
            if "\n" in part:
                parts[i] = collapse(part)
        else:
            # Outside inline code: collapse newlines inside $...$ math spans.
            parts[i] = fix_math(part)
    return "`".join(parts)


def process(source: str) -> str:
    lines = source.split("\n")
    out = []
    in_fence = False
    para = []

    def flush():
        if para:
            out.append(fix_paragraph("\n".join(para)))
            para.clear()

    for line in lines:
        if re.match(r"\s*```", line):
            flush()
            in_fence = not in_fence
            out.append(line)
            continue
        if in_fence:
            out.append(line)
            continue
        if line.strip() == "":
            flush()
            out.append(line)
            continue
        para.append(line)
    flush()
    return "\n".join(out)


def main():
    for path in sys.argv[1:]:
        with open(path, encoding="utf-8") as f:
            src = f.read()
        fixed = process(src)
        if fixed != src:
            with open(path, "w", encoding="utf-8") as f:
                f.write(fixed)
            print(f"fixed inline spans in {path}")


if __name__ == "__main__":
    main()
