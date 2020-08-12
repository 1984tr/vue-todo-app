const path = require('path')

module.exports = {
    // 진입점 : 이 프로젝트에서 가장 먼저 실행되는 파일
    entry: {
        app: path.join(__dirname, 'main.js') // 별칭 app
    },
    // 결과물에 대한 설정
    output: {
        filename: '[name].js', // entry의 별칭이 설정됨
        path: path.join(__dirname, 'dist')
    },
    module: {

    },
    plugins: []
}