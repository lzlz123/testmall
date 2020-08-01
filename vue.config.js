module.exports = {
    //配置别名
    configureWebpack: {
        //解决路径相关
        resolve: {
            //配置别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    }
}