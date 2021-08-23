<!-- @format -->

├─ config //webpack 相关配置
├─ public // html(页面容器),ico 等
├─ src // 项目文件夹
│ ├─ \_ _test _ \_ // 测试
│ ├─ common // 公共 css js 图片样式
│ │ ├─ assets //css 图片
│ │ └─ js // js 文件
│ ├─ components // 公共组件库
│ ├─ hooks // 公共 hooks 方法
│ ├─ layout // 项目主框架 导航栏等
│ ├─ mocks // mock 数据
│ ├─ pages
| | |─ Index //一级模块
│ │ │ │─ common // 公共 css js 图片样式
│ │ │ | │─ assets //css 图片
│ │ │ | └─ js // js
│ │ │ ├─ components // 界面组件
│ │ │ ├─ modules // 界面模块
│ │ │ ├─ childrenPage // 二级模块
│ │ │ │─ constants // 页面常量
│ │ │ |─ hooks // hooks
│ │ │ │─ reducers // 状态管理
│ │ │ └─ types // 数据类型统一定义
│ ├─ redux // redux 入口
│ ├─ router // 路由
│ ├─ types // 公共 types
│ ├─ utils // 工具函数 网络请求封装等
│ └─ index.jsx // 入口

.editorconfig
定义规则配置，来避免常见的代码格式不一致和丑陋的 diffs。
EditorConfig: 跨编辑器和 IDE 编写代码，保持一致的简单编码风格；
Prettier: 专注于代码格式化的工具，美化代码；
ESLint：作代码质量检测、编码风格约束等；

```
├─ .cz-config.js
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .jscpd.json
├─ .prettierignore
├─ .prettierrc.js
├─ .travis.yml
├─ README.md
├─ babel.config.js
├─ commitlint.config.js
├─ config
│  ├─ config.js
│  ├─ getLocalIp.js
│  ├─ styles.js
│  ├─ typescriptFormatter.js
│  ├─ webpack.config.common.js
│  ├─ webpack.config.dev.js
│  └─ webpack.config.prod.js
├─ dist
├─ jestconfig.js
├─ jsconfig.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ ico.ico
│  └─ index.html
├─ src
│  ├─ __tests__
│  │  └─ setup.js
│  ├─ common
│  │  ├─ assets
│  │  └─ js
│  ├─ components
│  ├─ hooks
│  ├─ index.tsx
│  ├─ layout
│  │  ├─ Children.tsx
│  │  ├─ Demo.tsx
│  │  ├─ commen
│  │  ├─ index.tsx
│  │  └─ typings
│  ├─ mock
│  │  └─ mockApi.js
│  ├─ pages
│  │  ├─ 404
│  │  │  └─ index.tsx
│  │  ├─ Index
│  │  │  ├─ common
│  │  │  │  └─ assets
│  │  │  │     └─ styles
│  │  │  └─ index.tsx
│  ├─ routes
│  │  ├─ asyncCom.tsx
│  │  ├─ index.tsx
│  │  └─ routerConfigs.tsx
│  ├─ store
│  │  ├─ index.ts
│  │  └─ reducer.ts
│  ├─ typings
│  │  └─ index.d.ts
│  └─ utils
│     ├─ echartsConfig.ts
│     ├─ request
│     │  ├─ BaseRequest.ts
│     │  ├─ BaseSubFormRequest.ts
│     │  └─ BaseSubJsonRequest.ts
│     ├─ styles.ts
│     └─ utils.ts
└─ tsconfig.json
```

npx husky install
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
npx husky add .husky/pre-commit "npm run test:unit"
