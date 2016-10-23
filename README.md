# sequence-diagrams

A plugin for drawing flowchart using [js-sequence-diagrams](https://bramp.github.io/js-sequence-diagrams/) in Markdown code block.

## Install

```shell
ipm install sequence-diagrams
```

## Usage

    ```sequence
    Alice->Bob: Hello Bob, how are you?
    Note right of Bob: Bob thinks
    Bob-->Alice: I am good thanks!
    ```

It will be rendered as:

![](https://github.com/inkdropapp/inkdrop-sequence-diagrams/raw/master/docs/images/example-01.png)
