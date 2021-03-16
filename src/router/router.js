// import login from "@/views/Login"
export const routers = [
    //h5路由start
    // 协议
    {
        path: '/h5-agreement',
        name: 'h5-agreement',
        component: () =>
            import("@/views/h5/agreement"),
        meta: {
            // 页面标题title
            title: '给全体中小学生和家长的一封信'
        }
    },

    // 化州市
    {
        path: '/h5-agreement_huazhou',
        name: 'h5-agreement_huazhou',
        component: () =>
            import("@/views/h5/agreement_huazhou"),
        meta: {
            // 页面标题title
            title: '致全体中小学生和家长的一封信'
        }
    },

    // 签收确认
    {
        path: '/h5-sign',
        name: 'h5-sign',
        component: () =>
            import("@/views/h5/sign"),
        meta: {
            // 页面标题title
            title: '签收确认'
        }
    },

    // 教师登录

    {
        path: '/h5-teacherRegister',
        name: 'h5-teacherRegister',
        component: () =>
            import("@/views/h5/teacher/teacherRegister"),
        meta: {
            // 页面标题title
            title: '用户登录'
        }
    },

    // 教师课表
    {
        path: '/h5-courseTimetable',
        name: 'h5-courseTimetable',
        component: () =>
            import("@/views/h5/teacher/courseTimetable"),
        meta: {
            // 页面标题title
            title: '我的课程表'
        }
    },

    // 教师点名

    {
        path: '/h5-callNames',
        name: 'h5-callNames',
        component: () =>
            import("@/views/h5/teacher/callNames"),
        meta: {
            // 页面标题title
            title: '学生列表'
        }
    },

    {
        path: '/h5-wRegister',
        name: 'h5-wRegister',
        component: () =>
            import("@/views/h5/whiteList/register"),
        meta: {
            // 页面标题title
            title: '登录'
        }
    },

    {
        path: '/h5-orgManage',
        name: 'h5-orgManage',
        component: () =>
            import("@/views/h5/whiteList/orgManage"),
        meta: {
            // 页面标题title
            title: '机构管理'
        }
    },

    {
        path: '/h5-addOrg',
        name: 'h5-addOrg',
        component: () =>
            import("@/views/h5/whiteList/addOrg"),
        meta: {
            // 页面标题title
            title: '添加机构'
        }
    },

    {
        path: '/h5-eidtOrg',
        name: 'h5-eidtOrg',
        component: () =>
            import("@/views/h5/whiteList/eidtOrg"),
        meta: {
            // 页面标题title
            title: '修改管理'
        }
    },

    {
        path: '/h5-modification',
        name: 'h5-modification',
        component: () =>
            import("@/views/h5/whiteList/modification"),
        meta: {
            // 页面标题title
            title: '机构管理-排查'
        }
    },

    // 答题
    {
        path: '/h5-select',
        name: 'h5-select',
        component: () =>
            import("@/views/h5/answer/select"),
        meta: {
            // 页面标题title
            title: '选择机构'
        }
    },

    {
        path: '/h5-answer',
        name: 'h5-answer',
        component: () =>
            import("@/views/h5/answer/answer"),
        meta: {
            // 页面标题title
            title: '答题'
        }
    },

    {
        path: '/h5-agree',
        name: 'h5-agree',
        component: () =>
            import("@/views/h5/agree"),
        meta: {
            // 页面标题title
            title: '教培云平台服务协议'
        }
    },

    // 提示页面 用于小程序绑定公众号 
    {
        path: '/h5-reminder',
        name: 'h5-reminder',
        component: () =>
            import("@/views/h5/reminder"),
        meta: {
            // 页面标题title
            title: '升级提示'
        }
    },

    //公众号二维码

    {
        path: '/h5-code',
        name: 'h5-code',
        component: () =>
            import("@/views/h5/code"),
        meta: {
            // 页面标题title
            title: '关注公众号'
        }
    },

    //h5路由end



    {
        path: '/login',
        name: 'login',
        component: () =>
            import("@/views/Login"),
    },
    {
        path: '/main',
        name: 'main',
        component: () =>
            import("@/views/Main"),
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: '首页',
                    icon: 'md-home'
                },
                component: () =>
                    import("@/views/home/index")
                    // import("@/views/trainManger/everyDay")
            },
            {
                /* 组织架构 */
                path: "/organiZation",
                name: "organiZation",
                meta: {
                    parent: "系统设置",
                    parentName: 'sysSettings',
                    title: '组织架构',
                },
                component: () =>
                    import("@/views/sysSetting/organiZation")
            }, {
                /* 菜单管理 */
                path: "/menuManage",
                name: "menuManage",
                meta: {
                    parent: "系统设置",
                    parentName: 'sysSettings',
                    title: '菜单管理',
                },
                component: () =>
                    import("@/views/sysSetting/menuManage")
            }, {
                /* 角色权限管理 */
                path: "/roleManage",
                name: "roleManage",
                meta: {
                    parent: "系统设置",
                    parentName: 'sysSettings',
                    title: '角色权限管理',
                },
                component: () =>
                    import("@/views/sysSetting/roleManage")
            }, {
                /* 定时任务 */
                path: "/timeTask",
                name: "timeTask",
                meta: {
                    parent: "系统设置",
                    parentName: 'sysSettings',
                    title: '定时任务',
                },
                component: () =>
                    import("@/views/sysSetting/timeTask")
            }, {
                /* 日志管理 */
                path: "/logManage",
                name: "logManage",
                meta: {
                    parent: "系统设置",
                    parentName: 'sysSettings',
                    title: '日志管理',

                },
                component: () =>
                    import("@/views/sysSetting/logManage")
            },
            {
                /* 用户管理列表 */
                path: "/userList",
                name: "userList",
                meta: {
                    parent: "用户管理",
                    parentName: 'userManger',
                    title: '用户管理列表',
                },
                component: () =>
                    import("@/views/userManger/userList")
            }, {
                /* 账号管理 */
                path: '/AccountList',
                name: 'AccountList',
                meta: {
                    parent: "用户管理",
                    parentName: 'userManger',
                    title: '账号管理',
                },
                component: () =>
                    import('@/views/Account/index')
            }, {
                /* 用户管理-详情 */
                path: "/userDetails",
                name: "userDetails",
                meta: {
                    parent: "用户管理",
                    parentName: 'userManger',
                    title: '用户详情',
                },
                component: () =>
                    import("@/views/userManger/userDetails")
            }, {
                /* 客户列表 */
                path: "/clientList",
                name: "clientList",
                meta: {
                    parent: "客户管理",
                    parentName: 'customerManger',
                    title: '客户列表',
                },
                component: () =>
                    import("@/views/customerManger/clientList")
            }, {
                /* 客户详情 */
                path: "/clientDetails",
                name: "clientDetails",
                meta: {
                    parent: "客户管理",
                    parentName: 'customerManger',
                    title: '客户详情',
                },
                component: () =>
                    import("@/views/customerManger/clientDetails")
            }, {
                /* 客户查询 */
                path: "/customerQuery",
                name: "customerQuery",
                meta: {
                    parent: "客户管理",
                    parentName: 'customerManger',
                    title: '客户查询',
                },
                component: () =>
                    import("@/views/customerManger/customerQuery")
            }, {
                /* 个人中心 */
                path: "/userCenter",
                name: "userCenter",
                meta: {
                    title: '个人中心',
                },
                component: () =>
                    import("@/views/others/userCenter")
            }, {
                /* 培训机构列表 */
                path: "/TrainList",
                name: "TrainList",
                meta: {
                    parent: "机构管理",
                    parentName: 'trainManger',
                    title: '培训机构列表',
                },
                component: () =>
                    import("@/views/trainManger/TrainList")
            }, {
                /* 健康日报信息列表 */
                path: "/everyDay",
                name: "everyDay",
                meta: {
                    parent: "机构管理",
                    parentName: 'trainManger',
                    title: '健康信息列表',
                },
                component: () =>
                    import("@/views/trainManger/everyDay")
            }, {
                /* 托管机构列表 */
                path: "/EntrustList",
                name: "EntrustList",
                meta: {
                    parent: "机构管理",
                    parentName: 'trainManger',
                    title: '托管机构列表',
                },
                component: () =>
                    import("@/views/trainManger/EntrustList")
            }, {
                /* 培训复学申请列表 */
                path: "/goBackList",
                name: "goBackList",
                meta: {
                    // parent: "复学申请管理",
                    parent: "疫情防控",
                    parentName: 'controlManage',
                    title: '培训复学申请列表',
                },
                component: () =>
                    import("@/views/goBackApply/goBackList")
            }, {
                /* 托管复学申请列表 */
                path: "/EntrustApplyList",
                name: "EntrustApplyList",
                meta: {
                    // parent: "复学申请管理",
                    parent: "疫情防控",
                    parentName: 'controlManage',
                    title: '托管复学申请列表',
                },
                component: () =>
                    import("@/views/goBackApply/EntrustApplyList")
            }, {
                /* 学生&教师 */
                path: "/personInfo",
                name: "personInfo",
                meta: {
                    parent: "学生教师",
                    parentName: 'person',
                    title: '学生教师信息列表',
                },
                component: () =>
                    import("@/views/person/personInfo")
            }, {
                /* 新增培训机构审批 */
                path: "/addApprove",
                name: "addApprove",
                meta: {
                    parent: "复学申请管理",
                    parentName: 'goBackApply',
                    title: '新增培训机构复学审批',
                },
                component: () =>
                    import("@/views/goBackApply/addApprove")
            }, {
                /* 新增托管机构审批 */
                path: "/addEntrust",
                name: "addEntrust",
                meta: {
                    parent: "复学申请管理",
                    parentName: 'goBackApply',
                    title: '新增托管机构复学审批',
                },
                component: () =>
                    import("@/views/goBackApply/addEntrust")
            }, {
                /* 培训详情审批 */
                path: "/detailApprove",
                name: "detailApprove",
                meta: {
                    parent: "复学申请管理",
                    parentName: 'goBackApply',
                    title: '培训机构复学审批详情',
                },
                component: () =>
                    import("@/views/goBackApply/detailApprove")
            }, {
                /* 托管详情审批 */
                path: "/detailEntrust",
                name: "detailEntrust",
                meta: {
                    parent: "复学申请管理",
                    parentName: 'goBackApply',
                    title: '托管机构复学审批详情',
                },
                component: () =>
                    import("@/views/goBackApply/detailEntrust")
            }, {
                /* 疫情防控 列表 */
                path: "/dailyList",
                name: "dailyList",
                meta: {
                    parent: "疫情防控",
                    parentName: 'controlManage',
                    title: '健康信息列表',
                },
                component: () =>
                    import("@/views/controlManage/dailyList")
            }, {
                /* 授课老师管理 */
                path: "/lecturerManage",
                name: "lecturerManage",
                meta: {
                    parent: "商城管理",
                    parentName: 'controlMall',
                    title: '授课老师管理',
                },
                component: () =>
                    import("@/views/controlMall/lecturerManage")
            }, {
                /* 课程管理 */
                path: "/courseManage",
                name: "courseManage",
                meta: {
                    parent: "商城管理",
                    parentName: 'courseAdmin',
                    title: '课程管理',
                },
                component: () =>
                    import("@/views/controlMall/courseManage")
            }, {
                /* 课程管理 新增 */
                path: "/courseManage",
                name: "added",
                meta: {
                    parent: "商城管理",
                    parentName: 'controlMall',
                    title: '新增',
                },
                component: () =>
                    import("@/views/controlMall/added")
            }, {
                /* 课程管理 修改 */
                path: "/courseManage",
                name: "modification",
                meta: {
                    parent: "商城管理",
                    parentName: 'controlMall',
                    title: '修改',
                },
                component: () =>
                    import("@/views/controlMall/modification")
            }, {
                /* 课程管理 查看 */
                path: "/courseManage",
                name: "examine",
                meta: {
                    parent: "商城管理",
                    parentName: 'controlMall',
                    title: '查看',
                },
                component: () =>
                    import("@/views/controlMall/examine")
            }, {
                /* 签名管理 查看 */
                path: "/signList",
                name: "signList",
                meta: {
                    parent: "签名管理",
                    parentName: 'signManger',
                    title: '学校列表',
                },
                component: () =>
                    import("@/views/signManger/signList")
            },
            {

                path: "/signList",
                name: "gradeList",
                meta: {
                    parent: "签名管理",
                    parentName: 'signManger',
                    title: '班级列表',
                },
                component: () =>
                    import("@/views/signManger/gradeManger")
            },
            {

                path: "/signList",
                name: "schoolSignature",
                meta: {
                    parent: "签名管理",
                    parentName: 'signManger',
                    title: '学校签名列表',
                },
                component: () =>
                    import("@/views/signManger/schoolSignature")
            },
            {

                path: "/signList",
                name: "gradeSignature",
                meta: {
                    parent: "签名管理",
                    parentName: 'signManger',
                    title: '班级签名列表',
                },
                component: () =>
                    import("@/views/signManger/gradeSignature")
            },

            {
                path: "/fundSupervision",
                name: "fundSupervision",
                meta: {
                    parent: "资金监管",
                    parentName: 'fundSupervision',
                    title: '资金监管',
                },
                component: () =>
                    import("@/views/fundSupervision/fundSupervision"),
            },

            {
                path: "/bank",
                name: "bank",
                meta: {
                    parent: "资金监管",
                    parentName: 'fundSupervision',
                    title: '资金监管',
                },
                component: () =>
                    import("@/views/fundSupervision/bank"),
            },

            {
                /* 课程管理 教材备案 （教育局）*/
                path: "/bookManage",
                name: "bookManage",
                meta: {
                    parent: "课程管理",
                    parentName: 'courseAdmin',
                    title: '教材备案',
                },
                component: () =>
                    import("@/views/controlMall/bookManage")
            },
            {
                /* 课程管理 教材备案 （机构）*/
                path: "/orgBookManage",
                name: "orgBookManage",
                meta: {
                    parent: "课程管理",
                    parentName: 'courseAdmin',
                    title: '教材备案',
                },
                component: () =>
                    import("@/views/controlMall/orgBookManage")
            },

            //机构我的账户
            {

                path: "/myAccount",
                name: "myAccount",
                meta: {
                    parent: "商城管理",
                    parentName: 'verifyRecord',
                    title: '我的账户',
                },
                component: () =>
                    import("@/views/controlMall/myAccount")
            },

            {

                path: "/refundManage",
                name: "refundManage",
                meta: {
                    parent: "商城管理",
                    parentName: 'verifyRecord',
                    title: '退款管理',
                },
                component: () =>
                    import("@/views/refundManage/refundManage")
            },

            {

                path: "/refudCourse",
                name: "refudCourse",
                meta: {
                    parent: "商城管理",
                    parentName: 'verifyRecord',
                    title: '退款管理',
                },
                component: () =>
                    import("@/views/refundManage/refudCourse")
            },

            //超级管理员的提现审核 ,银行卡账号审核

            {

                path: "/cashOutCheck",
                name: "cashOutCheck",
                meta: {
                    parent: "财务对账",
                    parentName: 'verifyRecord',
                    title: '提现审核',
                },
                component: () =>
                    import("@/views/controlMall/cashOutCheck")
            },

            {

                path: "/bankAccountCheck",
                name: "bankAccountCheck",
                meta: {
                    parent: "财务对账",
                    parentName: 'verifyRecord',
                    title: '银行账号审核',
                },
                component: () =>
                    import("@/views/controlMall/bankAccountCheck")
            },
            {
                /* 管理员课程管理 */
                path: "/courseManageNew",
                name: "courseManageNew",
                meta: {
                    parent: "收费监管",
                    parentName: 'courseAdmin',
                    title: '课程列表',
                },
                component: () =>
                    import("@/views/controlMall/courseManage")
            },
            {
                /* 课程管理 */
                path: "/consumeManage",
                name: "consumeManage",
                meta: {
                    parent: "课程管理",
                    parentName: 'courseAdmin',
                    title: '消课管理',
                },
                component: () =>
                    import("@/views/controlMall/consumeManage")
            },

            {
                /* 课程管理 */
                path: "/consumeManagelist",
                name: "consumeManagelist",
                meta: {
                    parent: "课程管理",
                    parentName: 'courseAdmin',
                    title: '课程详情',
                },
                component: () =>
                    import("@/views/teacherManage/courseXian")
            },
            //市教育局的课程管理

            {
                /* 课程管理 查看 */
                path: "/orderManage",
                name: "orderManage",
                meta: {
                    parent: "财务对账",
                    parentName: 'verifyRecord',
                    title: '订单列表',
                },
                component: () =>
                    import("@/views/controlMall/orderManage")
            },

            //教育局订单列表
            {

                path: "/orderManageNew",
                name: "orderManageNew",
                meta: {
                    parent: "收费监管",
                    parentName: 'chargeManage',
                    title: '订单列表',
                },
                component: () =>
                    import("@/views/controlMall/orderManage")
            },

            {
                /* 售后管理 */
                path: "/evaluateManage",
                name: "evaluateManage",
                meta: {
                    parent: "售后管理",
                    parentName: 'serviceManage',
                    title: '评价管理',
                },
                component: () =>
                    import("@/views/serviceManage/serviceManage")
            },

            /* 超级管理员白名单机构审核 */

            {
                path: "/whiteRegCheck",
                name: "whiteRegCheck",
                meta: {
                    parent: "教培白名单",
                    parentName: 'whiteList',
                    title: '注册审核',
                },
                component: () =>
                    import("@/views/whiteList/whiteRegCheck"),
                children: [{
                        path: '/collection',

                        component: () =>
                            import("@/views/whiteList/whiteRegCheckcontent")
                    },

                ]
            },


            {
                /* 查看详情 */
                path: "/Checkcontent",
                name: "Checkcontent",
                meta: {
                    parent: "教培白名单",
                    parentName: 'whiteList',
                    title: '注册详情',
                },
                component: () =>
                    import("@/views/whiteList/whiteRegCheckcontent")
            },

            {
                path: "/whiteOrgCheck",
                name: "whiteOrgCheck",
                meta: {
                    parent: "教培白名单",
                    parentName: 'whiteList',
                    title: '机构审核',
                },
                component: () =>
                    import("@/views/whiteList/whiteOrgCheck"),
            },

            
            {
                path: "/invoiceInfo",
                name: "invoiceInfo",
                meta: {
                    parent: "教培白名单",
                    parentName: 'whiteList',
                    title: '发票信息',
                },
                component: () =>
                    import("@/views/whiteList/invoiceInfo"),
            },

            {
                path: "/whiteInfoEdit",
                name: "whiteInfoEdit",
                meta: {
                    parent: "教培白名单",
                    parentName: 'whiteList',
                    title: '信息纠错',
                },
                component: () =>
                    import("@/views/whiteList/whiteInfoEdit"),
            },

            {
                path: "/whiteInfoEditcontent",
                name: "whiteInfoEditcontent",
                meta: {
                    parent: "教培白名单",
                    parentName: 'whiteList',
                    title: '信息纠错详情',
                },
                component: () =>
                    import("@/views/whiteList/whiteInfoEditcontent"),
            },
            {
                path: "/testcontrolMall",
                name: "testcontrolMall",
                meta: {
                    parent: "教培白名单",
                    parentName: 'testcontrolMall',
                    title: '测试',
                },
                component: () =>
                    import("@/views/whiteList/whiteInfoEditcontent"),
            },

            {
                /* 新闻中心 */
                path: "/bannerManage",
                name: "bannerManage",
                meta: {
                    parent: "新闻中心",
                    parentName: 'newsCenter',
                    title: '编辑轮播',
                },
                component: () =>
                    import("@/views/newsManage/bannerManage")
            },

            {
                path: "/newsList",
                name: "newsList",
                meta: {
                    parent: "新闻中心",
                    parentName: 'newsCenter',
                    title: '新闻列表',
                },
                component: () =>
                    import("@/views/newsManage/newsList"),
            },

            // 机构审核
            {
                path: "/orgCheck",
                name: "orgCheck",
                meta: {
                    parent: "机构管理",
                    parentName: 'orgManageNew',
                    title: '机构审核',
                },
                component: () =>
                    import("@/views/orgManageNew/orgCheck"),
            },
            {
                path: "/orgAgency",
                name: "orgAgency",
                meta: {
                    parent: "机构管理",
                    parentName: 'orgManageNew',
                    title: '机构详情',
                },
                component: () =>
                    import("@/views/orgManageNew/orgAgency"),
            },

            {
                path: "/userManger",
                name: "userManger",
                meta: {
                    parent: "系统设置",
                    parentName: 'sysSettings',
                    title: '用户管理',
                },
                component: () =>
                    import("@/views/userManger/userList"),
            },


            // 内部管理
            {
                path: "/staff",
                name: "staff",
                meta: {
                    parent: "员工管理",
                    parentName: 'internal',
                    title: '员工管理',
                },
                component: () =>
                    import("@/views/internal/staff"),
            },
            {
                path: "/organ",
                name: "organ",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '机构管理',
                },
                component: () =>
                    import("@/views/internal/organ"),
            },
            {
                path: "/accrInstitution",
                name: "accrInstitution",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '机构认证',
                },
                component: () =>
                    import("@/views/internal/accrInstitution"),
            },
           

            {
                path: "/startCertification",
                name: "startCertification",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '开始认证',
                },
                component: () =>
                    import("@/views/internal/startCertification"),
            },

            {
                path: "/persCertificate",
                name: "persCertificate",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '个人认证',
                },
                component: () =>
                    import("@/views/internal/persCertificate"),
            },

            {
                path: "/bianCertificate",
                name: "bianCertificate",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '个人认证',
                },
                component: () =>
                    import("@/views/internal/bianCertificate"),
            },

            {
                path: "/enteCertification",
                name: "enteCertification",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '企业认证',
                },
                component: () =>
                    import("@/views/internal/enteCertification"),
            },

            {
                path: "/bianenteCertification",
                name: "bianenteCertification",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '编辑企业认证',
                },
                component: () =>
                    import("@/views/internal/bianenteCertification"),
            },
            {
                path: "/mitCertification",
                name: "mitCertification",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '提交认证',
                },
                component: () =>
                    import("@/views/internal/mitCertification"),
            },
            {
                path: "/addAgency",
                name: "addAgency",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '添加机构',
                },
                component: () =>
                    import("@/views/internal/addAgency"),
            },
            {
                path: "/staffAdd",
                name: "staffAdd",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '添加人员',
                },
                component: () =>
                    import("@/views/internal/staffAdd"),
            },
            {
                path: "/staffEdit",
                name: "staffEdit",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '编辑人员',
                },
                component: () =>
                    import("@/views/internal/staffEdit"),
            },

            {
                path: "/roleManagement",
                name: "roleManagement",
                meta: {
                    parent: "机构管理",
                    parentName: 'internal',
                    title: '角色管理',
                },
                component: () =>
                    import("@/views/internal/roleManagement"),
            },

            {
                path: "/student",
                name: "student",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '学生管理',
                },
                component: () =>
                    import("@/views/eduAffairs/student"),
            },

            {
                path: "/course",
                name: "course",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '课程管理',
                },
                component: () =>
                    import("@/views/eduAffairs/course"),
            },

            {
                path: "/courseCategory",
                name: "courseCategory",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '课程类别',
                },
                component: () =>
                    import("@/views/eduAffairs/courseCategory"),
            },

            {
                path: "/courseAdd",
                name: "courseAdd",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '新建课程',
                },
                component: () =>
                    import("@/views/eduAffairs/courseAdd"),
            },
            

            {
                path: "/clasz",
                name: "clasz",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '班级管理',
                },
                component: () =>
                    import("@/views/eduAffairs/clasz"),
            },

            {
                path: "/claszAdd",
                name: "claszAdd",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '新建班级',
                },
                component: () =>
                    import("@/views/eduAffairs/claszAdd"),
            },

            {
                path: "/schedule",
                name: "schedule",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '排课',
                },
                component: () =>
                    import("@/views/eduAffairs/schedule"),
            },

            {
                path: "/attend",
                name: "attend",
                meta: {
                    parent: "教务中心",
                    parentName: 'eduAffairs',
                    title: '上课记录',
                },
                component: () =>
                    import("@/views/eduAffairs/attend"),
            },

        ]
    },
    {
        path: "/502",
        meta: {
            title: "502-权限不足"
        },
        name: "error-502",
        component: () => import("@/views/error-page/403.vue")
    },
    {
        path: "/",
        redirect: "/home" //重定向<首页>
    }
]