---
date: Last Modified
title: Matrix Editor
slug: /mathfield/matrix/
toc_max_heading_level: 2
---

<Intro>
A matrix is a useful way to represent and manipulate linear transformations. They are also used to represent systems of linear equations and many 
other mathematical structures.

Mathfields can display and edit matrices in a variety of ways.
</Intro>


## Creating a Matrix

There are several methods to create a matrix in a mathfield.

### Using Keyboard Shortcuts

**To create a matrix using the keyboard:** 

1. Type a parenthesis, square bracket, or curly brace.
2. Type the first element of the matrix.
3. Type the <kbd>ALT/OPTION</kbd>+<kbd>TAB</kbd> key to move to the next column: this will automatically
   transform the expression into a matrix
4. Type the <kbd>ALT/OPTION</kbd>+<kbd>RETURN</kbd> key to move to the next row.

### Using the Context Menu

The mathfield context menu provides a convenient way to create a matrix.

**To access the context menu** right click (or <kbd>CTRL</kbd>+click) on the 
mathfield. The menu is also available by typing <kbd>ALT</kbd>+<kbd>SPACE</kbd>, 
or by tapping on the menu button in the mathfield.



**To insert a matrix using the context menu** select the **Insert Matrix** 
menu, then select the number of rows and columns of the matrix.


## Matrix Borders

The borders of a matrix are parentheses by default. They can 
be changed to square brackets, curly braces, vertical bars, or none.

**To change the border of a matrix** right click (or <kbd>CTRL</kbd>+click) on the
matrix, then select the desired border from the **Matrix Border** menu.


In LaTeX, matrices are represented using the `\\begin\{\}...\\end\{\}` syntax. The argument to the `begin` command determines the type of matrix and is called
the **environment**.

Inside the environment, the matrix is specified using the `&` character to separate columns and the `\\\\` character to separate rows.

The following environments are supported:

| Environment | Description |
| --- | --- |
| `matrix` | A matrix with no delimiters |
| `pmatrix` | A matrix surrounded by parentheses |
| `bmatrix` | A matrix surrounded by square brackets |
| `Bmatrix` | A matrix surrounded by curly braces |
| `vmatrix` | A matrix surrounded by vertical bars |
| `Vmatrix` | A matrix surrounded by double vertical bars |
| `smallmatrix` | A matrix with no delimiters, in a smaller font |
| `array` | A matrix with no delimiters, with control over column alignment |

---
<Latex flow="column">{`
\\begin\{matrix\}
  a & b \\\\
  c & d
\\end\{matrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{pmatrix\}
  a & b \\\\
  c & d
\\end\{pmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{bmatrix\}
  a & b \\\\
  c & d
\\end\{bmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{Bmatrix\}
  a & b \\\\
  c & d
\\end\{Bmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{vmatrix\}
  a & b \\\\
  c & d
\\end\{vmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{Vmatrix\}
  a & b \\\\
  c & d
\\end\{Vmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{smallmatrix\}
  a & b \\\\
  c & d
\\end\{smallmatrix\}
`}</Latex>
---

<Latex flow="column">{`
\\begin\{array\}\{cc\}
  a & b \\\\
  c & d
\\end\{array\}
`}</Latex>


## Changing the Shape of a Matrix

**To add or remove rows or columns** right click (or <kbd>CTRL</kbd>+click) on the
matrix, then select the desired action from the menu. Rows and columns 
get added or removed relative to the cell the cursor is in.


## Spacing

### Changing the spacing of an individual row

The spacing between rows can be adjusted by setting an 
optional argument to the `\\\\` command. The argument is a length, and can be positive or negative.

For example, the following matrix has no space between columns and a double space between rows:

<Latex flow="column">{`
\\begin\{pmatrix\}
  a & b \\\\[1.5em]
  c & d
\\end\{pmatrix\}
`}</Latex>

Units can be specified using the following abbreviations:
- `em` (the width of the letter `M` in the current font)
- `mu` (math unit, 1/18 em)
- `ex` (the height of the letter `x` in the current font)
- `pt` (a point, 1/72.27 inch)
- `pc` (a pica, 12 points)
- `px` (a pixel, 1/96 inch)
- `cm` (a centimeter)
- `mm` (a millimeter)
- `in` (an inch)
- `bp` (a big point, 1/72 inch)
- `dd` (a didot point, 1238/1157 mm)
- `cc` (a cicero, 12 didot points)
- `sp` (a scaled point, 65536 sp = 1 pt)

### Changing the spacing of all rows

The spacing between rows can be controlled by setting the `arraystretch` 
register. The default value is `1.0`.

The value of a register can also be modified by using the `\renewcommand` command.
In general, modifying registers using `mf.registers` is preferred, but
using `\renewcommand` might be handy, for example when rendering static LaTeX.


```json
mf.registers.arraystretch = 2.5
```

<Latex flow="column">{`
\\renewcommand\{\\arraystretch\}\{2.5\}
\\begin\{pmatrix\}
  a & b \\\\
  c & d
\\end\{pmatrix\}
`}</Latex>

<Latex flow="column">{`
\\renewcommand\{\\arraystretch\}\{0.5\}
\\begin\{pmatrix\}
  a & b \\\\
  c & d
\\end\{pmatrix\}
`}</Latex>

