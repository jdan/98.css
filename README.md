## 98.css

[![npm](https://98badges.now.sh/api/version)](http://npm.im/98.css)
[![gzip size](https://98badges.now.sh/api/size)](https://unpkg.com/98.css)

A design system for building faithful recreations of old UIs.

<img alt="a screenshot of a window with the title 'My First VB4 Program' and two buttons OK and Cancel, styled like a Windows 98 dialog" src="https://github.com/jdan/98.css/blob/main/docs/window.png?raw=true" height="133"> <img alt="a magnified view showing pixel-perfect borders on a scrollbar and button element" src="https://github.com/jdan/98.css/blob/main/docs/zoom.png?raw=true?raw=true" height="133">

98.css is a CSS file that takes semantic HTML and makes it look pretty. It does not ship with any JavaScript, so it is compatible with your frontend framework of choice.

Be sure to check out [XP.css](https://botoxparty.github.io/XP.css/) and [7.css](https://khang-nd.github.io/7.css/) as well.

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

### Developing

First, run `npm install`.

[`style.css`](https://github.com/jdan/98.css/blob/main/style.css) is where everything happens.

You can use `npm start` to start a development environment that will watch for file changes and rebuild 98.css, reloading your browser in the process.

You can run a build manually with `npm run build`. This will write to the `dist/` directory.

### Issues, Contributing, etc.

Refer to [the GitHub issues page](https://github.com/jdan/98.css/issues) to see bugs in my CSS or report new ones. I'd really like to see your pull requests (especially those new to open-source!) and will happily provide code review. 98.css is a fun, silly project and I'd like to make it a fun place to build your open-source muscle.

Thank you for checking my little project out, I hope it brought you some joy today. Consider [starring/following along on GitHub](https://github.com/jdan/98.css/stargazers) and maybe subscribing to more fun things on [my twitter](https://twitter.com/jdan). 👋

### License

[MIT](https://github.com/jdan/98.css/blob/main/LICENSE)
