# DEX  @cheeseswapv2/ui-sdk

[![Version](https://img.shields.io/npm/v/@cheeseswapv2/ui-sdk)](https://www.npmjs.com/package/@cheeseswapv2/ui-sdk) [![Size](https://img.shields.io/bundlephobia/min/@cheeseswapv2/ui-sdk)](https://www.npmjs.com/package/@cheeseswapv2/ui-sdk)

@cheeseswapv2/ui-sdk is a set of React components and hooks used to build pages on DEX apps. It also contains a theme file for dark and light mode.

## Install

`yarn add @cheeseswapv2/ui-sdk`

## Setup

### Theme

Before using @cheeseswapv2/ui-sdk, you need to provide the theme file to styled-component.

```
import { ThemeProvider } from 'styled-components'
import { light, dark } from '@cheeseswapv2/ui-sdk'
...
<ThemeProvider theme={isDark}>...</ThemeProvider>
```

### Reset

A reset CSS is available as a global styled component.

```
import { ResetCSS } from '@cheeseswapv2/ui-sdk'
...
<ResetCSS />
```

### Types

This project is built with Typescript and export all the relevant types.

## How to use the UIkit

If you want to use components from the UIkit, check the [Storybook documentation](https://github.com/cheeseswapbsc/cheeseswap-ui-sdk)
