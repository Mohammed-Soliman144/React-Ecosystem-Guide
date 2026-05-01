```bash
# install new vite project:
1. npm create vite@latest project-name
# OR
1. npm create vite@latest
then proceed use last version of vite (vite@version_No)
 yes
then select project-name (current directory use dot .)
 .
then select React (js library)
then select React + TypeScript Compiler
```


```bash
# install tailwindcss
1. npm install tailwindcss @tailwindcss/vite
2. goto vite.config.ts file
3. import tailwindcss from "@tailwindcss/vite"
4. add inside plugins array
    plugins: [
        react(),
        tailwindcss(),
    ]
```


```bash 
# install @ instead of . as relative path
1. npm i path # install === i (shortcut)
2. goto vite.config.ts
    import path from "path"
3. add after plugins array resolve object {}
    plugins: [],
    resolve: {
        # in vite.config.ts do not use wild cards as asterisk *
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
4. goto tsconfig.app.json then add inside "compilerOptions": object {}
    "compilerOptions": {
        "baseUrl": ".",
        # inside tsconfig.app.json use wildcards as asterisk
        "paths": {
            "@/*": "./src/*",
        }
    }
```