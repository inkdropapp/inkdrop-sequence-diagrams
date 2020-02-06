Allows you to draw sequence diagrams using [js-sequence-diagrams](https://bramp.github.io/js-sequence-diagrams/) in Markdown code block.

## Usage

    ```sequence
    Alice->Bob: Hello Bob, how are you?
    Note right of Bob: Bob thinks
    Bob-->Alice: I am good thanks!
    ```

It will be rendered as:

![](https://github.com/inkdropapp/inkdrop-sequence-diagrams/raw/master/docs/images/example-01.png)

## Changelog

### 2.0.2 (2020-02-06)

- fix(preview): Lighter background color for dark UI themes (Thanks [Peilun](https://forum.inkdrop.app/t/low-visibility-of-sequence-diagram-when-using-with-dark-ui-theme/1754))

### 2.0.1 (2020-02-06)

- fix(diagram): Clear error when updating code (Thanks Peilun)

### 1.0.0

- feat(\*): Support Inkdrop 4.x

### 0.1.2

- Remove unused menu

### 0.1.1

- Support Inkdrop@^3.1.1

### 0.1.0 - First Release

- Every feature added
- Every bug fixed
