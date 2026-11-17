<!-- The detail of the entries of /reference/trigonometry/. Format: README.md. -->

## InverseFunction

`inverseFunction(f)` is the inverse of the function `f`, such as `arcsin` for
`sin`. It is an operator: it takes a function and gives a function.

```epsil
inverseFunction(sin)(x)
// ➔ arcsin(x)
```

### MathJSON

`["InverseFunction", f]`. In LaTeX: `\sin^{-1}(x)`.

```json example
[["InverseFunction", "Sin"], "x"]
```
