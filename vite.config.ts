import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // @types/node 安装依赖包 否则提示报错
import AutoImport from 'unplugin-auto-import/vite' // 自动导入模块 如 全局调用 ref reactive 不用每个页面单独引入
import Components from 'unplugin-vue-components/vite' // 自动导入和注册组件 如 element-plus
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // 使用 ElementPlusResolver 可以让 unplugin-vue-components 插件自动导入和注册 Element Plus 组件，而无需手动导入和注册每个组件
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'

// src 文件路径
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // 获取配置文件  mode 环境  development  production   process.cwd() 为 node 方法 获取当前项目路径地址
  const env = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行是否自动打开浏览器
      proxy: {
        // 跨域
        [env.VITE_APP_BASE_API]: {
          target: 'http://vapi.youlai.tech',
          // target: 'http://localhost:8989',
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '') // 替换 /dev-api 为 target 接口地址
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
          filepath: './.eslintrc-auto-import.json', // 指定自动导入函数 eslint 规则的文件
          globalsPropValue: true
        },
        resolvers: [ElementPlusResolver(), IconsResolver({})],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts') // 自动导入组件类型声明文件位置，默认根目录
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          })
        ],
        dts: path.resolve(pathSrc, 'types', 'components.d.ts') //  自动导入组件类型声明文件位置，默认根目录
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      UnoCSS({
        /* options */
      })
    ],
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //定义 全局 scss 变量
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    }
  }
})
