// 自定义一个配置，之后该配置会和公共的配置合并
module.exports = {
    // 写上configurewebpack，代表配置它
    configureWebpack: {
        // 配置路径用resolve
        resolve: {
            // 路径别名：
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            },
        }
    }
}

