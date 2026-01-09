# Publishing to npm 📦

This guide explains how to publish **Tickr** as a public package on the npm registry.

## Prerequisites
1.  **npm Account**: Create one at [npmjs.com](https://www.npmjs.com/signup).
2.  **Unique Name**: The name `tickr` is likely taken. You might need to rename it in `package.json` (e.g., `tickr-cli-app` or scoped like `@yourusername/tickr`).

## Steps

### 1. Login to npm
Run this command in your terminal and follow the prompts:
```bash
npm login
```

### 2. Prepare the Package
Ensure your `package.json` has the correct version.
```json
{
  "name": "your-unique-package-name",
  "version": "1.0.0",
  ...
}
```

### 3. Publish
Run the publish command:
```bash
npm publish
```
*Note: If you are using a scoped name like `@username/tickr`, use `npm publish --access public`.*

### 4. Install Globally
Once published, anyone can install your tool:
```bash
npm install -g your-unique-package-name
```

## Updating
To release a new version:
1.  Update the version number:
    ```bash
    npm version patch  # 1.0.0 -> 1.0.1
    # OR
    npm version minor  # 1.0.0 -> 1.1.0
    ```
2.  Publish again:
    ```bash
    npm publish
    ```
