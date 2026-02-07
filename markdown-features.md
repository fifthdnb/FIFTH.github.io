# Markdown Features Showcase

Dit document bevat alle belangrijke Markdown features met voorbeelden.

## Headers

# H1 Header

## H2 Header

### H3 Header

#### H4 Header

##### H5 Header

###### H6 Header

## Text Formatting

**Bold text** of __bold text__

*Italic text* of _italic text_

***Bold en italic*** of ___bold en italic___

~~Strikethrough text~~

==Highlighted text== (sommige parsers)

## Lists

### Unordered List

- Item 1
- Item 2
    - Subitem 2.1
    - Subitem 2.2
        - Subitem 2.2.1
- Item 3
- Alternatief met asterisk
- Of met plus

### Ordered List

1. Eerste item
2. Tweede item
3. Derde item
    1. Subitem 3.1
    2. Subitem 3.2
4. Vierde item

### Task List

- [ ] Completed task
- [ ] Incomplete task
- [ ] Another task
    - [ ] Subtask completed

## Links

[Link naar Google](https://www.google.com)

[Link met title](https://www.google.com "Google Homepage")

<https://www.example.com>

[Reference style link][reference]

[reference]: https://www.example.com "Reference link"

## Images

![Alt text](img/example.jpg)

![Alt text met title](img/example.jpg "Image title")

## Code

### Inline Code

Dit is `inline code` in een zin.

Gebruik `npm install` om packages te installeren.

### Code Blocks

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

greet("World");
```

```py3
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
```

```html
<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

## Blockquotes

> Dit is een blockquote.
>
> Het kan meerdere regels hebben.

> ## Blockquote met header
>
> Je kunt ook andere markdown gebruiken in een blockquote.
>
> - Lists
> - **Bold text**
> - `code`

> Geneste blockquotes:
>
> > Niveau 2
> >
> > > Niveau 3

## Horizontal Rules

---

---

---

## Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cel 1    | Cel 2    | Cel 3    |
| Cel 4    | Cel 5    | Cel 6    |

### Table met alignment

| Links | Midden | Rechts |
| :---- | :----: | -----: |
| links | midden | rechts |
| a     | b      | c      |
| 1     | 2      | 3      |

## Escaping Characters

\* Geen italic \*

\_ Geen italic \_

\# Geen header

\[Geen link\](url)

## Line Breaks

Tekst met twee spaties aan het einde  

zorgt voor een line break.

Of gebruik een lege regel

voor een nieuwe paragraaf.

## Footnotes

Hier is een zin met een footnote.[^1]

Een andere footnote.[^note]

[^1]: Dit is de footnote inhoud.

[^note]: Dit is een named footnote met meer tekst.

## Emojis

:smile: :heart: :thumbsup: :rocket: :star:

😀 🎵 🎸 ✨ 🔥

## Mathematical Expressions (KaTeX/LaTeX)

Inline math: $E = mc^2$

Block math:

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n
$$

## HTML in Markdown

<div style="color: blue; font-weight: bold;">
  HTML content in markdown
</div>

<details>
<summary>Click to expand</summary>

Hidden content hier!

- List item
- Another item

</details>

## Definition Lists (sommige parsers)

Term 1

: Definition 1

Term 2

: Definition 2a

: Definition 2b

## Abbreviations (sommige parsers)

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language

*[W3C]: World Wide Web Consortium

## Superscript en Subscript

H~2~O (subscript)

E = mc^2^ (superscript)

## Highlight/Mark

Dit is ==gemarkeerde tekst==.

## Keyboard Input

Druk op <kbd>Ctrl</kbd> + <kbd>C</kbd> om te kopiëren.

## Progress Bar (sommige parsers)

[progress 70%]

## Mermaid Diagrams (in sommige parsers)

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## Special Characters

© Copyright &copy;  

® Registered &reg;  

™ Trademark &trade;  

← → ↑ ↓ Arrows  

« » Quotes

---

## Combinaties

Je kunt verschillende features combineren:

- **Bold list item** met `code`
- *Italic with [link](https://example.com)*
- ~~Strikethrough with **bold**~~

> **Bold blockquote** met een [link](https://example.com) en `code`

| **Bold**   | *Italic*  | `Code`    |
| ---------- | --------- | --------- |
| ~~Strike~~ | [Link](/) | ![img](/) |

---

**Einde van het document!** 🎉