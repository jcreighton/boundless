<!---
THIS IS AN AUTOGENERATED FILE. EDIT PACKAGES/BOUNDLESS-DIALOG/INDEX.JS INSTEAD.
-->
# Dialog

A dialog differs from a modal in that it does not come with a masking layer (to obscure the rest of the page)
and the user can choose to shift focus away from the dialog contents via mouse click or a keyboard shortcut.

If you decide to provide a header inside your dialog, it's recommended to configure the [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) attribute, which can be added to `props.dialogProps`.

## Installation

```bash
npm i boundless-dialog --save
```

Then use it like:


```jsx
import React from 'react';
import {findDOMNode} from 'react-dom';
import Button from 'boundless-button';
import Dialog from 'boundless-dialog';

export default class DialogDemo extends React.PureComponent {
    state = {
        showDialog: false,
    }

    componentDidMount() {
        const node = findDOMNode(this.refs.trigger);

        this.setState({
            leftPosition: node.offsetLeft + node.offsetWidth + 10 + 'px',
            topPosition: node.offsetTop + 'px',
        });
    }

    toggleDialog = () => {
        this.setState({showDialog: !this.state.showDialog});
    }

    renderDialog() {
        if (this.state.showDialog) {
            return (
                <Dialog
                    closeOnEscKey={true}
                    closeOnOutsideClick={true}
                    onClose={this.toggleDialog}
                    style={{
                        left: this.state.leftPosition,
                        top: this.state.topPosition,
                    }}>
                    <iframe
                        className='dialog-demo-video-frame'
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/HEheh1BH34Q?autoplay=1&showinfo=0&autohide=1'
                        frameBorder='0'
                        title='A youtube video showcasing the relative size of celestial objects.'
                        allowFullScreen />
                    <Button
                        className='dialog-demo-close-button'
                        title='Close'
                        onPressed={this.toggleDialog} />
                </Dialog>
            );
        }
    }

    render() {
        return (
            <div>
                <Button ref='trigger' onPressed={this.toggleDialog}>Launch Video</Button>
                {this.renderDialog()}
            </div>
        );
    }
}
```



Dialog can also just be directly used from the main [Boundless library](https://www.npmjs.com/package/boundless). This is recommended when you're getting started to avoid maintaining the package versions of several components:

```bash
npm i boundless --save
```

the ES6 `import` statement then becomes like:

```js
import { Dialog } from 'boundless';
```



## Props

> Note: only top-level props are in the README, for the full list check out the [website](http://boundless.js.org/Dialog).

### Required Props

There are no required props.


### Optional Props

- __`*`__ &middot; any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)

  Expects | Default Value
  -       | -
  `any` | `n/a`

- __`after`__ &middot; arbitrary content to be rendered after the dialog in the DOM

  Expects | Default Value
  -       | -
  `any renderable` | `null`

- __`before`__ &middot; arbitrary content to be rendered before the dialog in the DOM

  Expects | Default Value
  -       | -
  `any renderable` | `null`

- __`captureFocus`__ &middot; determines if focus is allowed to move away from the dialog

  Expects | Default Value
  -       | -
  `bool` | `true`

- __`closeOnEscKey`__ &middot; enable detection of "Escape" keypresses to trigger `props.onClose`; if a function is provided, the return
  value determines if the dialog will be closed

  Expects | Default Value
  -       | -
  `bool or function` | `false`

- __`closeOnInsideClick`__ &middot; enable detection of clicks inside the dialog area to trigger `props.onClose`; if a function is provided, the return
  value determines if the dialog will be closed

  Expects | Default Value
  -       | -
  `bool or function` | `false`

- __`closeOnOutsideClick`__ &middot; enable detection of clicks outside the dialog area to trigger `props.onClose`; if a function is provided, the return
  value determines if the dialog will be closed

  Expects | Default Value
  -       | -
  `bool or function` | `false`

- __`closeOnOutsideFocus`__ &middot; enable detection of focus outside the dialog area to trigger `props.onClose`; if a function is provided, the return
  value determines if the dialog will be closed

  Expects | Default Value
  -       | -
  `bool or function` | `false`

- __`closeOnOutsideScroll`__ &middot; enable detection of scroll and mousewheel events outside the dialog area to trigger `props.onClose`; if a function
  is provided, the return value determines if the dialog will be closed

  Expects | Default Value
  -       | -
  `bool or function` | `false`

- __`component`__ &middot; override the type of `.b-dialog-wrapper` HTML element

  Expects | Default Value
  -       | -
  `string` | `'div'`

- __`dialogComponent`__ &middot; override the type of `.b-dialog` HTML element

  Expects | Default Value
  -       | -
  `string` | `'div'`

- __`dialogProps`__

  Expects | Default Value
  -       | -
  `object` | `{}`

- __`onClose`__ &middot; a custom event handler that is called to indicate that the dialog should be unrendered by its parent; the event occurs if one or more of the "closeOn" props (`closeOnEscKey`, `closeOnOutsideClick`, etc.) are passed as `true` and the dismissal criteria are satisfied

  Expects | Default Value
  -       | -
  `function` | `() => {}`


## Reference Styles
### Stylus
```stylus
// Bring in Boundless's base Stylus variables
@require "node_modules/boundless-dialog/variables"

// Redefine any variables as desired, e.g.
color-accent = royalblue

// Bring in the component styles; they will be autoconfigured based on the above
@require "node_modules/boundless-dialog/style"
```

### CSS
If desired, a precompiled plain CSS stylesheet is available for customization at `/build/style.css`, based on Boundless's [default variables](https://github.com/enigma-io/boundless/blob/master/variables.styl).

