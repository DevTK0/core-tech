# Use "d.ts" files to supplement type information to js objects

d.ts files contains the type annotations of a javascript file. For example, 

```
    my-module.js
    my-module.d.ts
```
By providing a d.ts file, you can provide type annotations to corresponding javascript objects. 

In addition, you can also use this to provide additional fields to existing objects. 
```
declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: string;
    };
  }
}
```

Here we suppliment the DefaultUser with an additional `id` field.

See 
- https://stackoverflow.com/questions/21247278/about-d-ts-in-typescript#:~:text=The%20"d.,those%20from%20your%20typescript%20code.
- https://stackoverflow.com/questions/44058101/typescript-declare-third-party-modules

