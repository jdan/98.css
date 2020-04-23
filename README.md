## 98.css

A design system for building faithful recreations of old UIs.

![a screenshot of a window with the title "My First VB4 Program" and two buttons OK and Cancel, styled like a Windows 98 dialog](https://github.com/jdan/98.css/blob/master/docs/window.png?raw=true)

98.css is a CSS file that takes semantic HTML and makes it look pretty. It does not ship with any JavaScript, so it is compatible with your frontend framework of choice.

### Installation / Usage

The easiest way to use 98.css is to import it from [unpkg](https://unpkg.com/).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>98.css example</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://unpkg.com/98.css" />
  </head>

  <body>
    <div class="window" style="margin: 32px; width: 250px">
      <div class="title-bar">
        <div class="title-bar-text">
          My First VB4 Program
        </div>
      </div>
      <div class="window-body">
        <p>Hello, world!</p>
      </div>
    </div>
  </body>
</html>
```

Alternatively, you can grab 98.css for [the releases page](https://github.com/jdan/98.css/releases) or [npm](https://www.npmjs.com/package/98.css).

```
npm install 98.css
```

Here is an example of [98.css being used with React](https://codesandbox.io/s/objective-chandrasekhar-t5t6h?file=/src/index.js), and [an example with vanilla JavaScript](https://codesandbox.io/s/late-sound-miqho?file=/index.html).

Refer to the [documentation page](https://jdan.github.io/98.css/) for specific instructions on this library's components.

### Issues, Contributing, etc.

Refer to [the GitHub issues page](https://github.com/jdan/98.css/issues) to see bugs in my CSS or report new ones. I'd really like to see your pull requests (especially those new to open-source!) and will happily provide code review. 98.css is a fun, silly project and I'd like to make it a fun place to build your open-source muscle.

Thank you for checking my little project out, I hope it brought you some joy today. Consider [starring/following along on GitHub](https://github.com/jdan/98.css/stargazers) and maybe subscribing to more fun things on [my twitter](https://twitter.com/jdan). 👋

### License

[MIT](https://github.com/jdan/98.css/blob/master/LICENSE)
