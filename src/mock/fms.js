// 引入 node 的 fms 模块
var fms = require('fms')

fms.run({
    // Server 启动在 3000 端口
    port: 3000,
    connect: function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        // res.contentType('json')
        // res.header("Content-Type:","json");
        next()
    },
    read: ['/static/'],
    urlRewrite: [
        '/url-rewrite.html', '/index.html',
        '/url1.html', '/index.html'
    ],
    view: {
        data:{
            user: {
                name: "fms",
                type: "free"
            }
        },
        filter: function (req, data) {
            // 不允许重写 data ：
            // 错误： data = {}
            data.PAGE_PATH = req.path // req.path === location.pathname
            data.GET = req.query
            data.POST = req.body
            data.METHOD = req.method
        }
    }
})

fms.doc('> 所有以 `_` 为前缀的属性，均视为对应属性的注释')

fms.ajax({
    type: 'get',
    title: '获取用户名',
    url: '/get_user/',
    request: {
        id: '2',
        _id: "用户ID" // 我们建议在 FMS 中使用 "_ + 属性名" 的方式作为对应属性的注释
    },
    res: {
        ok: {
            status: "success",
            username: "fms"
        },
        err: {
            status: "error",
            msg: "请先登录"
        }
    }
})

fms.ajax({
    type: 'get',
    title: '123',
    url: '/advert/getData.htm',
    res: {
        err: {
            status: "error",
            msg: "请先登录"
        }
    }
})



fms.ajax({
    type: 'get',
    url: '/demo/',
    res: {
        ok: 1,
        err: 0
    }
})

fms.ajax({
    title: "返回JSONP",
    type: 'get',
    url: '/jsonp/',
    dataType: 'jsonp',
    res: {
        ok: {
            status: "success",
            name: 'fms'
        }
    }
})

fms.ajax({
    type: 'get',
    title: "res",
    url: "/res/",
    request: {
        id: 1,
        _id: '用户ID'
    },
    res: {
        ok: false,
        err: false,
        string: "abcdef",
        object: {
            name: 'fms'
        },
        array: [1, 2, 3],
        fn: function (req) {
            var time = new Date().getTime()
            return {
                path: req.path,
                GET: req.query,
                time: time
            }
        }
    }
})

fms.ajax({
    title: "RESTful API",
    type: 'get',
    url: '/user/:id',
    res: {
        ok: {
            status: "success",
            msg: "GET success"
        },
        fn: function (req, res) {
            res.send(req.params['id'])
        }
    }
})


fms.ajax({
    title: "RESTful API",
    type: 'post',
    url: '/user/:id',
    res: {
        ok: {
            status: "success",
            msg: "POST success"
        },
        err: {
            status: "error",
            msg: "POST error"
        }
    }
})


// 根据 fms 中的配置生成文档到 /doc/front-mock-data.html
fms.docFile('./doc/front-mock-data.html')

fms.doc('---')

fms.doc('**对某个 AJAX 的特殊说明: oxoxoxoxxo**')
fms.doc(function () {/*
## 多行 markdown 语法文档
有些内容需要多行文档说明比如写一些代码：
```js
{
    name: "fms"
}
```
*/})

fms.doc({
    name: "fms",
    _name: "向 fms.doc() 允许传入对象"
})

fms.doc('---')

/*
    请切换到当前文件目录执行
    php -S 127.0.0.1:1234 -t ./mock/
    请务必安装 php cli
    https://github.com/vivi2000/vivi.github.io/blob/master/php/php%20cli%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B.md
*/
fms.view({
    title: "PHP直接解析渲染示例",
    // 页面请求方式
    type: 'get',
    // url
    url: '/render/',
    // 模板
    template: "render.php",
    // 数据
    data: {
        title: '标题',
        content: '内容xoxoxoxo',
        list: [
            "a", "b", "c"
        ]
    },
    res: {
        ok: {
            content: "内容"
        },
        err: {
            content: "没有权限"
        },
        wait: {
            content: "等待管理员审核"
        }
    }
})

fms.ajax({
    title: "用户登录",
    type: 'post',
    url: '/login/',
    request: {
        username: "nimo",
        password: "1234",
        verifycode: "2xs2",
        _verifycode: "验证码"
    }
})


fms.view({
    title: '新闻列表',
    type: 'get',
    url: '/news/',
    template: 'news.php',
    data: {
        list: [
            {
                title: "论数据约定在前后端配合中的重要性",
                digest: "FMS 提供了模拟 AJAX 和模板引擎渲染页面的功能，但在具体项目开发中前端不应该随意的模拟数据。而是根据产品原型和设计稿与后端约定数据后再开始利用 FMS 开发页面。",
                time: "2015年10月25日22:45:32",
                link: '/news/detail/?id=1'
            },
            {
                title: "三星弯上瘾！Galaxy S7将有无数个版本",
                digest: "HTC是机海战术的代表，其实三星也一点不弱，出个新机器就能衍生出五花八门的各种版本。如果你在等待下一代的旗舰机Galaxy S7，恐怕会被搞得不知如何选择。",
                time: "2015年10月25日11:30:15",
                link: '/news/detail/?id=2'
            },
            {
                title: "太囧！门前1米无人盯防 郜林……竟然打偏了",
                digest: "郜林面对空门托妞附体 零难度推射竟不中",
                time: "2015年10月25日10:12:31",
                link: '/news/detail/?id=3'
            }
        ]
    }
})

// 支持链式调用
fms.get('/fms.get/', {title: "链式调用"}).ok({
    msg: "ok"
}).err({
    meg: "err"
})
/*
//  第二个参数可以省略
    fms.get('/fms.get/').ok({
        msg: "ok"
    }).err({
        meg: "err"
    })
*/
