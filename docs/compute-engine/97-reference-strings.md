---
title: Strings
slug: /compute-engine/reference/strings/
---

A string is a sequence of characters such as `"Hello, World!"` or `"42"`.

In the Compute Engine, strings are composed of encoding-independent Unicode
characters and provide access to those characters through a variety of Unicode
representations.

<nav className="hidden">
### BaseForm
</nav>



<FunctionDefinition name="BaseForm">

<Signature name="BaseForm" returns="string">_value:integer_</Signature>

<Signature name="BaseForm" returns="string">_value_:integer, _base_</Signature>

Format an _integer_ in a specific _base_, such as hexadecimal or binary.

If no _base_ is specified, use base-10.

The sign of _integer_ is ignored.

- _value_ should be an integer.
- _base_ should be an integer from 2 to 36.

```json example
["Latex", ["BaseForm", 42, 16]]

// ➔ (\text(2a))_{16}
```

```cortex
Latex(BaseForm(42, 16))
// ➔ (\text(2a))_{16}
String(BaseForm(42, 16))
// ➔ "'0x2a'"
```

</FunctionDefinition>
