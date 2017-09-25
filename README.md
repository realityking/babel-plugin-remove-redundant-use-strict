# babel-plugin-remove-redundant-use-strict

[![Greenkeeper badge](https://badges.greenkeeper.io/realityking/babel-plugin-remove-redundant-use-strict.svg)](https://greenkeeper.io/)

Removes `'use strict';` declarations that are unecessary because they're declared in an already strict context.

## Example

**In**

```javascript
'use strict';

function useless() {
  'use strict';

  return 1;
}

module.exports = useless;
```

**Out**

```javascript
'use strict';

function useless() {

  return 1;
}

module.exports = useless;
```

## Installation

```sh
npm install babel-plugin-remove-redundant-use-strict
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["remove-redundant-use-strict"]
}
```

### Via CLI

```sh
babel --plugins remove-redundant-use-strict script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["remove-redundant-use-strict"]
});
```
