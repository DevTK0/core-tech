# Intro

This folder contains scripts for calling / testing APIs (Think Postman). Please make sure you have the REST Client extension installed in VS Code to use.

https://marketplace.visualstudio.com/items?itemName=humao.rest-client

# Usage

Some APIs may require authentication in order to utilize. Each API has been configured to access the COOKIE dotenv variable. Please make sure you define this variable in your own dotenv file before using these APIs.

`api.http`

```
Cookie: {{$dotenv %COOKIE}}
```

`dotenv`

```
COOKIE=next-auth.csrf-token=c787e4c6825c08dea27e7b2c84d5d13d01f054d96d12c09970fb8e41d461d4d3%7Cddb801197e91a8377ba57a0a613c096be77775183e9e0acb0f55ca4ab929d66c; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2Fbattle; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..lva-T0UoKUy-5dw1.lTEdXMqOW-0np3xWJV_XVIRIZlm8f9jE995ZY_eyaAniRQJIOzj067WQfvGG_lwHwPmHWKNx3NtobFosJWYlZ0n5Qrd82mHoyvlIbZ_Im3hbuSw3PYeD2kiIuET_Ft2wMH-Xe3NETri33D-Go3JkuxgljISiGNyMHg09W6TZXESbyxP6nTibwB3MifxctYm9s0AAJrVTLBraEA5Bl2uxt8KrgnmB1tTJnleDPUQFHJd1UMaDDWgA0fkWKtIZw_AEpkelUBLOCsihp59SlnCJoS5LUymkzHuSuOF_jnUIvmEe4kjErD2ywXXOT73aeb5UbK9-Vhy8HmiOszEHxYm1LQ2qAZck0HeLTf9wZABKQYxxO00vlOiEzdf2uJ6DkUjFIs2sOrEmxGvh2XNb4zOGFs375-hL8BGj.vqmtxqNOjy6ElTEXNokU6Q
```
