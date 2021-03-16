import {
    getRequest,
    postRequest,
    postupData,
    deleteRequest,
    postFormData,
    postData,
    downloadRequest
} from '@/libs/axios';
import {
    get
} from 'http';
// let baseUrl = process.env.NODE_ENV === 'production' ? '/ict-admin/admin' : '/admin';
// console.log(baseUrl)
// 新增编辑客户账号关联  /customer/customer/account/save




export const customeraccountsave = (params) => {
    return postRequest('/customer/customer/account/save', params)
}
// 新增账号查询 /account/listAccountChoose
export const accountListAccountChoose = (params) => {
    return getRequest('/account/listAccountChoose', params)
}
// 客户管理编辑 /customer/customer/update
export const customerupdate = (params) => {
    return postRequest('/customer/customer/update', params);
}
// 获取客户操作日志  /customer/customer/log/getList
export const customerLogList = (params) => {
    return getRequest('/customer/customer/log/getList', params)
}
// 获取客户账号列表  
export const customerAccountList = (params) => {
    return getRequest(`/customer/customer/account/getList`, params)
}
// 删除客户账号列表 
export const customerAccountRemove = (id) => {
    return deleteRequest(`/customer/customer/account/remove/${id}`)
}
// 关联联系人 /customer/customerContact/info/1
export const customerContactInfo = (params) => {
    return getRequest(`/customer/customerContact/info/${params}`)
}
// 新增联系人
export const contactsaveContact = (params) => {
    return postRequest('/contact/saveContact', params)
}
// 新增编辑关联联系人 /customer/customerContact/save
export const customerContactSave = (params) => {
    return postRequest('/customer/customerContact/save', params)
}
//联系人删除 /customerContact/remove
export const customerRemove = (params) => {
    return deleteRequest('/customer/customerContact/remove', params)
}
// 联系人
export const customerGetlist = (params) => {
    return getRequest('/customer/customerContact/getList', params)
}
export const getUserMenu = () => {
    return getRequest('/sys/menu/getMenuList')
}
// 文件上传接口 
export const financeImport = (params) => {
    return postRequest('/order/import', params)
}
// 删除数据上传  /finance/calTask/remove/{id}
export const calTaskRemove = (id) => {
    return deleteRequest(`/finance/calTask/remove/${id}`)
}
// 数据上传展示接口
export const calTaskList = (params) => {
    return getRequest('/finance/calTask/pageList', params)
}

// 获取验证码
export const getImageCode = () => {
    return getRequest('/common/validateCode/code')
}

// 获取用户id接口  
export const userGetList = (params) => {
    return getRequest('/sys/user/getList', params)
}
// 账号详情
export const accountInfo = (params) => {
    return getRequest('/account/info', params)
}
// 账号更新
export const accountUP = (params) => {
    return postRequest('/account/update', params)
}
// 账号删除 /account/remove
export const accountRemove = (params) => {
    return deleteRequest('/account/remove', params)
}
// 跟进删除
export const delfollowUp = (params) => {
    return deleteRequest("/followUp/delete", params)
}
// 账号新增  
export const addAccount = (params) => {
    return postRequest('/account/addAccount', params)
}
// 账号列表 /account/listAccount
export const accountlistAccount = (params) => {
    return getRequest('/account/listAccount', params)
}
// 新增跟进 /followUp/saveFollow
export const saveFollow = (params) => {
    return postRequest('/followUp/saveFollow', params)
}
// 新增客户/customer/customer/save
export const customerSave = (params) => {
    return postRequest('/customer/customer/save', params)
}
// 更新账号 /account/update
export const updateAccount = (params) => {
    return postRequest('/account/update', params)
}
// 删除账号 /account/remove
export const removeId = (params) => {
    return deleteRequest('/account/remove', params)
}
// 联系人编辑 /contact/updateContact
export const updateContact = (params) => {
    return postRequest('/contact/updateContact', params)
}
//删除联系人/contact/delete
export const contactDel = (params) => {
    return deleteRequest('/contact/delete', params)
}
// 操作日志  /common/log/list
// export const logList = (params) => {
//     return getRequest('/common/log/list', params)
// }
// 账号列表 /account/listAccount
export const listAccount = (params) => {
    return getRequest('/account/listAccount', params)
}
// 查询联系人列表 /contact/getList
export const contactGetList = (params) => {
    return getRequest('/contact/getList', params)
}
//联系人列表 
export const getListPage = (params) => {
    return getRequest('/contact/getListPage', params)
}
// 详情跟进列表 /followUp/getPageList
export const followUpList = (params) => {
    return getRequest('/followUp/getPageList', params)
}
// 客户详情 /customer/customer/info/{id}
export const customerInfo = (id) => {
    return getRequest(`/customer/customer/info/${id}`)
}
// 客户列表 
export const getCustomerList = (params) => {
    return getRequest('/customer/customer/getPageList', params)
}
// 工程师编辑 /engineer/updateByEngineerId
export const updateByEngineerId = (params) => {
    return postRequest('/engineer/updateByEngineerId', params)
}
//  工程师添加 /engineer/addEngineer
export const addEngineer = (params) => {
    return postRequest('/engineer/addEngineer', params)
}
// 删除工程师id /engineer/removeEngineerById
export const removeEngineerById = (params) => {
    return postRequest('/engineer/removeEngineerById', params)
}

// 工程师列表 
export const listEngineers = (params) => {
    return getRequest('/engineer/listEngineers', params)
}
// 更新工程师团队 /engineerGroup/update
export const enineerUp = (params) => {
    return postRequest('/engineerGroup/update', params)
}
//工程师树状新增 /engineerGroup/insertGroup
export const insertGroup = (params) => {
    return postRequest('/engineerGroup/insertGroup', params)
}
// 销售树状编辑 /smc/salesTeam/update
export const salesTeamUp = (params) => {
    return postRequest('/smc/salesTeam/update', params)
}
// 工程师树状 /engineerGroup/listGroups
export const listGroups = (params) => {
    return getRequest('/engineerGroup/listGroups', params)
}
// /smc/sales/transfor 销售员变更
export const salesTransfor = (params) => {
    return postRequest('/smc/sales/transfor', params)
}
// 编辑销售员
export const salesUpdate = (params) => {
    return postRequest('/smc/sales/update', params)
}
// 设置销售离职 /smc/sales/changeStatus
export const changeDate = (params) => {
    return postRequest('/smc/sales/changeStatus', params)
}
// 销售人员添加 
export const salesSave = (params) => {
    return postRequest('/smc/sales/save', params)
}
// 通过手机号或昵称模糊搜索用户
export const getFuzzyUser = (params) => {
    return getRequest('/sys/user/getAllLike', params)
}
// 获取销售详情
export const getSalesInfo = (params) => {
    return getRequest('/smc/sales/info/' + params)
}
//删除客服人员 /customerService/customerService/delete/{id}
export const customerServiceDel = (params) => {
    return postRequest(`/customerService/customerService/delete/${params}`)
}
//客服人员添加 
export const customerServiceAE = (params) => {
    return postRequest('/customerService/customerService/save', params)
}
// 获取客服详情
export const getServiceInfo = (params) => {
    return getRequest('/customerService/customerService/info/' + params)
}
// 获取工程师详情
export const getEngineerInfo = (params) => {
    return getRequest('/engineer/info/' + params)
}
// 客服团队添加/修改 /customerService/group/save
export const customerServiceSave = (params) => {
    return postRequest('/customerService/group/save', params)
}
// 获取客服列表 /customerService/customerService/getPageList
export const customerServiceList = (params) => {
    return getRequest('/customerService/customerService/getPageList', params)
}
// 客服列表展示 
export const treeWithPerson = () => {
    return getRequest('/customerService/group/treeWithPerson')
}
// 销售分页列表
export const TablelistByPage = (params) => {
    return getRequest('/smc/sales/listByPage', params)
}
// 客服团队树 
export const customerService = () => {
    return getRequest('/customerService/group/tree')
}
//销售渠道管理详情
export const SGetById = (params) => {
    return getRequest("/smc/salesChannel/getById", params)
}
//销售渠道管理添加 
export const salesChannelAdd = (params) => {
    return postRequest('/smc/salesChannel/add', params)
}
//销售渠道管理修改
export const sCupdate = (params) => {
    return postRequest('/smc/salesChannel/update', params)
}
//销售团推管理树接口  /smc/salesTeam/tree
export const salesTeam = () => {
    return getRequest('/smc/salesTeam/tree')
}
// 销售团队管理树添加
export const salesAdd = (params) => {
    return postRequest('/smc/salesTeam/save', params)
}
//返佣设置 -- 刘康 
export const updateRakeBackRule = (params) => {
    return postRequest('/agent/updateRakeBackRule', params)
}
// 二级代理删除v-- 刘康
export const deleteAgentSecond = (params) => {
    return deleteRequest('/agent/delete', params)
}
//二级代理修改 -- 刘康
export const updateAgentSecond = (params) => {
    return postRequest('/agent/updateAgentSecond', params)
}
//二级代理修改返佣比例
export const updateAgentSecondRakebackRule = (params) => {
    return postRequest('/agent/updateAgentSecondRakebackRule', params)
}
//通用地址管理接口 -- 刘康
export const getList = () => {
    return getRequest('/common/address/getList')
}
//代理审核 
export const listByApply = (params) => {
    return getRequest('/apply/listByApply', params)
}
//代理审核通过和拒绝 /apply/auditAgent
export const auditAgent = (params) => {
    return postRequest('/apply/auditAgent', params)
}
//代理审核详情接口
export const applyId = (params) => {
    return getRequest('/apply/getById', params)
}
//销售列表  -- 刘康 
export const salesChannel = (params) => {
    return getRequest('/smc/salesChannel/list', params)
}
//渠道详情接口 -- 刘康
export const getById = (params) => {
    return getRequest('/agent/getById', params)
}
// 获取销售管理树列表
export const treeList = () => {
    return getRequest('/smc/sales/tree')
}
//直销代理列表分页查询
export const listByAgentForTop = (params) => {
    return getRequest('/agent/listByAgentForTop', params)
}
//销售列表 -- 刘康
export const salesList = (params) => {
    return getRequest('/smc/sales/list', params)
}
//平台列表接口 -- 刘康
export const platformUser = (params) => {
    return getRequest('/sys/platformUser/getPageList', params)
}
//渠道代理总列表 --刘康 
export const listByAgentTop = (params) => {
    return getRequest(`/agent/listByAgentTop`, params);
}
// 渠道总编辑
export const updateAgentTop = (params) => {
    return postRequest('/agent/updateAgentTop', params)
}
//渠道总添加 -- 刘康
export const addAgentTop = (params) => {
    return postRequest('/agent/addAgentTop', params)
}
//后台修改密码 --刘康
export const ModifyPassword = (params) => {
    return postRequest('/modifyPassword', params)
}

// 后台登陆-用户名-密码
export const login = (params) => {
    return postRequest(`/pwdLogin`, params);
}





// 文件上传统一接口
export const uploadAction = '/admin/common/file/upload';

// 系统设置-组织架构-获取部门树
export const getListTree = () => {
    return getRequest('/sys/dept/tree');
}

// 系统设置-组织架构-新增部门
export const addDept = (params) => {
    return postRequest('/sys/dept/add', params);
}

// 系统设置-组织架构-获取部门详情
export const getDeptInfo = (params) => {
    return getRequest('/sys/dept/info/' + params);
}

// 系统设置-组织架构-修改部门信息
export const updateDept = (params) => {
    return postRequest('/sys/dept/update', params);
}

// 系统设置-组织架构-搜索部门或员工
export const searchDeptUser = (params) => {
    return getRequest('/sys/dept/searchDeptUser', params);
}

// 系统设置-组织架构-新增部门员工
export const addUserToDept = (params) => {
    return postRequest('/sys/user/addToDept', params);
}

// 系统设置-组织架构-获取用户下拉类表
export const getUserToSearch = (params) => {
    return getRequest('/sys/platformUser/getListLike', params);
}

// 系统设置-组织架构-获取部门右侧成员
export const listByPage = (params) => {
    return getRequest('/sys/user/listByPage', params);
}

// 系统设置-组织架构-获取员工详情
export const getDetailById = (params) => {
    return getRequest('/sys/user/getDetailById', params);
}

// 系统设置-组织架构-获取所有角色
export const selectAllRole = () => {
    return getRequest('/sys/role/selectAllRole');
}

// 系统设置-组织架构-更新员工详情
export const updateEmployee = (params) => {
    return postRequest('/sys/user/update', params);
}

// 系统设置-组织架构-删除部门员工
export const deleteEmployee = (params) => {
    return postRequest('/sys/user/removeFromDept', params);
}

// 系统设置-菜单权限-菜单权限树
export const getAllPermissionList = () => {
    return getRequest('/sys/menu/getAllList');
}

// 系统设置-菜单权限-新增目录/菜单/按钮
export const addPermission = (params) => {
    return postRequest('/sys/menu/save', params);
}

// 系统设置-菜单权限-删除目录/菜单/按钮
export const deletePermission = (params) => {
    return deleteRequest('/sys/menu/batchRemove/' + params);
}

// 系统设置-菜单权限-编辑目录/菜单/按钮
export const editPermission = (params) => {
    return postRequest('/sys/menu/update', params);
}

// 系统设置-菜单权限-搜索
export const searchPermission = (params) => {
    return getRequest('/sys/menu/search', params);
}

// 系统设置-角色权限管理-获取角色数据
export const getRoleList = (params) => {
    return getRequest('/sys/role/listByPage', params);
}

// 系统设置-角色权限管理-添加角色
export const addRole = (params) => {
    return postRequest('/sys/role/save', params);
}

// 系统设置-角色权限管理-删除角色
export const deleteRole = (params) => {
    return deleteRequest(`/sys/role/batchRemove/${params}`);
}

// 系统设置-角色权限管理-编辑角色
export const editRole = (params) => {
    return postRequest('/sys/role/update', params);
}

// 系统设置-角色权限管理-编辑角色
export const allotRoleMenu = (params) => {
    return postRequest('/sys/role/updateRoleMenu', params);
}

// 系统设置-数据权限-新增角色数据权限
export const addRoleData = (params) => {
    return postRequest('/sys/roleData/save', params);
}

// 系统设置-数据权限-获取角色数据权限树
export const getPowerTree = (params) => {
    return getRequest('/sys/roleData/getRoleDataPermissionForRole', params);
}

// 系统设置-数据权限-获取工程师树
export const getEngineerTree = (params) => {
    return getRequest('/engineer/treeWithPersonSelect', params);
}

// 系统设置-数据权限-获取客服树
export const getServiceTree = (params) => {
    return getRequest('/customerService/group/treeWithPersonSelect', params);
}

// 系统设置-数据权限-获取代理
export const getAgencyList = (params) => {
    return getRequest('/agent/getListForSelect', params);
}

// 系统设置-日志管理-获取日志管理数据
export const logData = (params) => {
    return getRequest('/common/log/list', params);
}

// 系统设置-定时任务-获取列表数据
export const getJobList = (params) => {
    return getRequest('/common/job/listByPage', params);
}

// 系统设置-定时任务-保存或者修改定时任务
export const addTaskData = (params) => {
    return postRequest('/common/job/saveAndUpdate', params);
}

// 系统设置-定时任务-保存或者修改定时任务
export const changeTaskStatue = (params) => {
    return postRequest('/common/job/changeJobStatus', params);
}

// 系统设置-定时任务-删除
export const deleteTaskData = (params) => {
    return deleteRequest(`/common/job/batchRemove/${params}`);
}

// 商品管理-商品列表-列表数据
export const getGoodsList = (params) => {
    return getRequest('/product/product/getPageList', params);
}

// 商品管理-商品列表-上下架操作
export const changeStatus = (params) => {
    return postRequest('/product/product/changeStatus', params);
}

// 商品管理-商品分类-分类列表数据
export const getGoodsType = (params) => {
    return getRequest('/product/productCategory/getPageList', params);
}

// 商品管理-商品列表-新增商品保存
export const addGoods = (params) => {
    return postFormData('/product/product/save', params);
}

// 商品管理-商品列表-删除商品
export const deleteGoods = (params) => {
    return postRequest('/product/product/delete/' + params);
}

// 商品管理-商品列表-获取商品详情
export const getGoodsDetails = (params) => {
    return getRequest('/product/product/detail/' + params);
}

// 商品管理-商品列表-修改商品详情
export const updateGoods = (params) => {
    return postFormData('/product/product/update', params);
}

// 商品管理-商品分类-新增分类
export const addTypes = (params) => {
    return postRequest('/product/productCategory/add', params);
}

// 商品管理-商品分类-编辑分类
export const updateTypes = (params) => {
    return postRequest('/product/productCategory/update', params);
}

// 商品管理-商品分类-删除分类
export const removeTypes = (params) => {
    return postRequest('/product/productCategory/delete/' + params);
}

// 商品管理-积分商品-积分商品列表
export const getCreditList = (params) => {
    return getRequest('/product/credit/getPageList', params);
}

// 商品管理-积分商品-上下架
export const creditChangeStatus = (params) => {
    return postRequest('/product/credit/changeStatus', params);
}

// 商品管理-积分商品-新增保存
export const creditSave = (params) => {
    return postRequest('/product/credit/save', params);
}

// 商品管理-积分商品-删除
export const creditDelete = (params) => {
    return postRequest('/product/credit/delete/' + params);
}

// 商品管理-积分商品-获取积分商品详情
export const creditDetail = (params) => {
    return getRequest('/product/credit/getInfo/' + params);
}

// 商品管理-积分商品-更新商品详情
export const updateCreditDetail = (params) => {
    return postRequest('/product/credit/update', params);
}

/**
 * 工单管理-工单列表-获取工单列表
 */
export const getWorkList = (params) => {
    return getRequest('/workOrder/listWorkOrderSearch', params);
}

/**
 * 工单管理-工单列表-下拉框工程师列表
 */
export const getEngineer = (params) => {
    return getRequest('/engineer/getAllList', params);
}

/**
 * 工单管理-工单列表-分配
 */
export const allotWork = (params) => {
    return postRequest('/record/addRecord', params);
}

/**
 * 工单管理-工单列表-转交
 */
export const shiftWork = (params) => {
    return postRequest('/record/handOver', params);
}

/**
 * 工单管理-工单列表-处理
 */
export const disposeWork = (params) => {
    return postRequest('/workOrder/accept', params);
}

/**
 * 工单管理-工单列表-完成
 */
export const finishedWork = (params) => {
    return postRequest('/workOrder/solved', params);
}

/**
 * 工单管理-工单列表-关闭
 */
export const closeWork = (params) => {
    return postRequest('/workOrder/close', params);
}

/**
 * 工单管理-工单列表-删除
 */
export const removeWork = (params) => {
    return postRequest('/workOrder/saveDeleteById', params);
}

/**
 * 工单管理-工单列表-退回
 */
export const gobackWork = (params) => {
    return postRequest('/record/back', params);
}

/**
 * 工单管理-新建工单-获取工单模板列表
 */
export const getAddTemplate = () => {
    return getRequest('/workOrder/listTemplate');
}

/**
 * 工单管理-新建工单-获取工单类型列表
 */
export const getAddType = () => {
    return getRequest('/workOrder/getTypeList');
}

/**
 * 工单管理-新建工单-获取工程师组列表
 */
export const getAddGroups = () => {
    return getRequest('/engineerGroup/listGroup');
}

/**
 * 工单管理-新建工单-获取工程师列表
 */
export const getAddPerson = (params) => {
    return getRequest('/engineer/listChooseByGroupId', params);
}

/**
 * 工单管理-新建工单-获取相关客户列表
 */
export const getAddCustomer = (params) => {
    return getRequest('/customer/customer/getListPermit', params);
}

/**
 * 工单管理-新建工单-新建工单保存
 */
export const addOrder = (params) => {
    return postRequest('/workOrder/addWorkOrder', params);
}

/**
 * 工单管理-查看工单-工单详情
 */
export const getOrderInfo = (params) => {
    return getRequest('/workOrder/getWorkOrderInfo', params);
}

/**
 * 工单管理-查看工单-操作历史
 */
export const getListFlow = (params) => {
    return getRequest('/flow/listFlow', params);
}

/**
 * 工单管理-查看工单-订单属性
 */
export const getOrderProterty = (params) => {
    return getRequest('/workOrder/getProductSpecsBywId', params);
}

/**
 * 工单管理-查看工单-根据订单ID查工单
 */
export const getByOrderId = (params) => {
    return getRequest('/workOrder/getByOrderId', params);
}

/**
 * 工单管理-查看工单-备注列表
 */
export const getRemark = (params) => {
    return getRequest('/workOrder/getRemarkPageList', params);
}

/**
 * 工单管理-查看工单-新增备注
 */
export const addRemark = (params) => {
    return postRequest('/workOrder/saveRemark', params);
}

/**
 * 工单管理-查看工单-删除备注
 */
export const removeRemark = (params) => {
    return postRequest('/workOrder/removeRemark', params);
}

/**
 * 工单管理-查看工单-获取验收报告
 */
export const getReport = (params) => {
    return getRequest('/report/getBywId', params);
}

/**
 * 工单管理-查看工单-新增验收报告
 */
export const addReport = (params) => {
    return postRequest('/report/addReport', params);
}

/**
 * 工单管理-查看工单-修改工单
 */
export const updateWorkOrder = (params) => {
    return postRequest('/workOrder/updateWorkOrder', params);
}

/**
 * 工单管理-工单类型-获取工单类型列表
 */
export const getWorkType = (params) => {
    return getRequest('/workOrder/getTypeListPage', params);
}

/**
 * 工单管理-工单类型-新增工单类型
 */
export const addWorkType = (params) => {
    return postRequest('/workOrder/saveType', params);
}

/**
 * 工单管理-工单类型-编辑工单类型
 */
export const updateWorkType = (params) => {
    return postRequest('/workOrder/updateType', params);
}

/**
 * 工单管理-工单类型-删除工单类型
 */
export const removeWorkType = (params) => {
    return postRequest('/workOrder/removeType', params);
}

/**
 * 工单管理-工单自定义字段-获取列表
 */
export const getOrderField = (params) => {
    return getRequest('/workOrder/field/listCustomOrderField', params);
}

/**
 * 工单管理-工单自定义字段-获取所有自定义字段
 */
export const getAllField = (params) => {
    return getRequest('/workOrder/field/getAllField', params);
}

/**
 * 工单管理-工单自定义字段-新增工单自定义字段
 */
export const addOrderField = (params) => {
    return postRequest('/workOrder/field/addFiled', params);
}

/**
 * 工单管理-工单自定义字段-修改工单自定义字段
 */
export const updateOrderField = (params) => {
    return postRequest('/workOrder/field/update', params);
}

/**
 * 工单管理-工单自定义字段-删除工单自定义字段
 */
export const removeOrderField = (params) => {
    return postRequest('/workOrder/field/removeWorkOrderField', params);
}

/**
 * 工单管理-工单自定义模板-获取模板列表
 */
export const getOrederTemplate = (params) => {
    return getRequest('/template/getTemplateList', params);
}

/**
 * 工单管理-工单自定义模板-自定义模板详情
 */
export const getInfoById = (params) => {
    return getRequest('/template/getInfoById', params);
}

/**
 * 工单管理-工单自定义模板-新增工单自定义模板
 */
export const addOrederTemplate = (params) => {
    return postRequest('/template/insertTemplate', params);
}

// 订单管理-系统上云订单-获取订单列表
export const getYunOrder = (params) => {
    return getRequest('/order/yun/list', params);
}

// 订单管理-系统上云订单-修改状态
export const changeYunStatus = (params) => {
    return postRequest('/order/yun/update', params);
}

// 订单管理-系统上云订单-确定按钮
export const changeOderOK = (params) => {
    return postRequest('/order/yun/confirm', params);
}

//获取快递公司列表, 可模糊搜索, 20条
export const getExpressList = (params) => {
    return getRequest('/common/expressCom/getListLike', params);
}

//标准商品发货接口
export const sendExpress = (params) => {
    return postRequest('/order/standard/deliver', params);
}

// 订单管理-标准订单-获取订单列表
export const getStandard = (params) => {
    return getRequest('/order/standard/list', params);
}

// 订单管理-标准订单-获取订单详情
export const getStandardDetails = (params) => {
    return getRequest('/order/standard/getById', params);
}

// 订单管理-标准订单-关闭订单
export const closeOrder = (params) => {
    return postRequest('/order/standard/cancel', params);
}

// 订单管理-标准订单-改价
export const changeOrderPrice = (params) => {
    return postRequest('/order/standard/alterPrice', params);
}

// 订单管理-非标准订单-获取订单列表
export const getUnstandard = (params) => {
    return getRequest('/order/unstandard/list', params);
}

// 订单管理-非标准订单-新增非标准订单
export const addUnstandard = (params) => {
    return postRequest('/order/unstandard/add', params);
}

// 订单管理-非标准订单-取消订单
export const closeUnstandard = (params) => {
    return postRequest('/order/unstandard/cancel', params);
}

// 订单管理-非标准订单-订单详情
export const getoffstandardDetails = (params) => {
    return getRequest('/order/unstandard/getById', params);
}

// 订单管理-非标准订单-改价
export const changeOffPrice = (params) => {
    return postRequest('/order/unstandard/alterPrice', params);
}

// 订单管理-积分兑换记录-获取列表数据
export const getLogList = (params) => {
    return getRequest('/product/productExchangeOrder/getPageList', params);
}

// 订单管理-积分兑换记录-更新状态
export const updateLogList = (params) => {
    return postRequest('/product/productExchangeOrder/update', params);
}

// 订单管理-积分兑换记录-物流跟踪
export const expressTail = (params) => {
    return getRequest('/product/express/query', params);
}

// 订单管理-订单导出
export const exportOrder = (params) => {
    return downloadRequest('/order/export/platform', params);
}

// 客户管理-客户管理-获取客户列表
export const getCustomer = (params) => {
    return getRequest('/customer/customer/getPageList', params);
}

// 用户管理-用户管理列表-获取用户列表
export const getUserList = (params) => {
    return getRequest('/sys/platformUser/getPageList', params);
}

// 用户管理-用户管理列表-给用户分配销售
export const allotSales = (params) => {
    return postRequest('/sys/platformUser/setBelongSales', params);
}

// 用户管理-用户管理列表-用户封禁&解锁
export const lockUser = (params) => {
    return postRequest('/sys/platformUser/lock', params);
}

// 用户管理-用户管理列表-用户重置密码
export const resetPassword = (params) => {
    return postRequest('/sys/platformUser/resetPassword', params);
}

// 用户管理-用户管理列表-获取用户特殊返佣比例
export const getRebateInfo = (params) => {
    return getRequest('/sys/platformUser/info/rakebackRatio', params);
}

// 用户管理-用户管理列表-配置用户返佣比例
export const updateRebateInfo = (params) => {
    return postRequest('/sys/platformUser/setRakebackRatio', params);
}

// 用户管理-用户详情-基础信息
export const getUserInfo = (params) => {
    return getRequest('/sys/platformUser/info/base/' + params);
}

// 用户管理-用户详情-云账号列表
export const getUserAccount = (params) => {
    return getRequest('/sys/platformUser/info/accountList', params);
}

// 用户管理-用户详情-上云订单列表
export const getUserOrderYun = (params) => {
    return getRequest('/sys/platformUser/info/orderYun/getPageList', params);
}

// 用户管理-用户详情-标准订单列表
export const getUserOrderStandard = (params) => {
    return getRequest('/sys/platformUser/info/orderStandard/getPageList', params);
}

// 用户管理-用户详情-非标准订单列表
export const getUserOrderOff = (params) => {
    return getRequest('/sys/platformUser/info/orderUnStandard/getPageList', params);
}

// 用户管理-用户详情-工单记录列表
export const getUserWorkOrder = (params) => {
    return getRequest('/sys/platformUser/info/workorder/getPageList', params);
}

// 用户管理-用户详情-咨询记录列表
export const getUserConsult = (params) => {
    return getRequest('', params);
}

// 用户管理-用户详情-消费明细列表
export const getUserConsume = (params) => {
    return getRequest('/sys/platformUser/info/consumeDetail/getPageList', params);
}

// 财务管理-发票管理-发票列表
export const getInvoice = (params) => {
    return getRequest('/finance/invoiceRecord/getPageList', params);
}

// 财务管理-发票管理-删除发票
export const removeInvoice = (params) => {
    return deleteRequest('/finance/invoiceRecord/delete/' + params);
}

// 财务管理-发票管理-发票装填变更
export const finishInvoice = (params) => {
    return postRequest('/finance/invoiceRecord/finish/' + params);
}

// 财务管理-发票管理-获取提现列表
export const getCash = (params) => {
    return getRequest('/finance/cashRecord/getPageList', params);
}

// 财务管理-发票管理-变更提现状态
export const finishCash = (params) => {
    return postRequest('/finance/cashRecord/finish/' + params);
}

// 财务管理-对公打款-获取列表
export const getPublicPay = (params) => {
    return getRequest('/finance/publicPay/publicPayList', params);
}

// 财务管理-对公打款-状态变更
export const updatePublicPay = (params) => {
    return postRequest('/finance/publicPay/audit', params);
}





// 轮播图-新增轮播图
export const addBanner = (params) => {
    return postRequest(`/ContentBanner/save`, params);
}

// 轮播图-获取轮播图列表
export const getBannerList = (params) => {
    return getRequest(`/ContentBanner/getPageList`, params);
}

// 轮播图-删除轮播图
export const deleteBanner = (params) => {
    return postRequest(`/ContentBanner/delete/${params}`);
}

// 首页数据-总销售额
export const getSumForSellTotalPrice = () => {
    return getRequest("/DataMonitor/getSumForSellTotalPrice");
}

// 首页数据-返佣总额
export const getSumForRackback = () => {
    return getRequest("/DataMonitor/getSumForRackback");
}

// 首页数据-用户/客户/区域/直销
export const getCountForPerson = () => {
    return getRequest("/DataMonitor/getCountForPerson");
}

// 首页数据-区域代理业绩
export const getAgentPerformance = (params) => {
    return getRequest("/DataMonitor/getAgentPerformance", params);
}

// 首页数据-直销代理业绩
export const getDirectPerformance = (params) => {
    return getRequest("/DataMonitor/getDirectPerformance", params);
}
// 轮播图-修改轮播图信息
export const updateBanner = (params) => {
    return postRequest(`/ContentBanner/update`, params);
}
// 公司信息-获取
export const getCompanyInfo = () => {
    return getRequest("/content/selfCompany/info")
}
// 公司信息-更新
export const updateCompanyInfo = (params) => {
    return postRequest("/content/selfCompany/save", params)
}






// 合作商-新增合作商
export const addPartner = (params) => {
    return postRequest(`/ContentPartner/save`, params);
}

// 合作商-获取合作商列表
export const getPartnerList = (params) => {
    return getRequest(`/ContentPartner/getPageList`, params);
}

// 合作商-删除合作商
export const deletePartner = (params) => {
    return postRequest(`/ContentPartner/delete/${params}`);
}

// 合作商-修改合作商信息
export const updatePartner = (params) => {
    return postRequest(`/ContentPartner/update`, params);
}




// 协议-新增
export const addAgreement = (params) => {
    return postRequest(`/ContentAgreement/save`, params);
}

// 协议-获取协议列表
export const getAgreementList = (params) => {
    return getRequest(`/ContentAgreement/getPageList`, params);
}

// 协议-删除协议
export const deleteAgreement = (params) => {
    return postRequest(`/ContentAgreement/delete/${params}`);
}

// 协议-修改协议信息
export const updateAgreement = (params) => {
    return postRequest(`/ContentAgreement/update`, params);
}

// 协议-根据id获取详情
export const getAgreementById = (params) => {
    return getRequest(`/ContentAgreement/getById`, params);
}



// 公告栏-新增公告栏
export const addNotice = (params) => {
    return postRequest(`/ContentNotice/save`, params);
}

// 公告栏-获取公告栏列表
export const getNoticeList = (params) => {
    return getRequest(`/ContentNotice/getPageList`, params);
}

// 公告栏-删除公告栏
export const deleteNotice = (params) => {
    return postRequest(`/ContentNotice/delete/${params}`);
}

// 公告栏-修改公告栏信息
export const updateNotice = (params) => {
    return postRequest(`/ContentNotice/update`, params);
}

// 公告栏-根据id获取详情
export const getNoticeById = (params) => {
    return getRequest(`/ContentNotice/getById`, params);
}






// 帮助中心-添加
export const addHelpArticle = (params) => {
    return postRequest(`/article/saveArticle`, params);
}

// 帮助中心-根据搜索内容搜索文章--列表分页展示
export const getHelpArticleList = (params) => {
    return getRequest(`/article/search`, params);
}

// 帮助中心-删除
export const deleteHelpArticle = (params) => {
    return postRequest(`/article/delete`, params);
}

// 帮助中心-更新
export const updateHelpArticle = (params) => {
    return postRequest(`/article/updateArticle`, params);
}

// 帮助中心-根据id获取详情
export const getHelpArticleById = (params) => {
    return getRequest(`/article/getInfo`, params);
}











// 帮助中心-新增分类
export const addHelpClassifyArticle = (params) => {
    return postRequest(`/article/classify/save`, params);
}

// 帮助中心-通过搜索获取分类列表
export const getHelpClassifyListSearch = (params) => {
    return getRequest(`/article/classify/search`, params);
}

// 帮助中心-获取分类所有数据
export const getHelpClassifyListAll = (params) => {
    return getRequest(`/article/classify/listAll`, params);
}

// 帮助中心-删除分类
export const deleteHelpClassify = (params) => {
    return postRequest(`/article/classify/delete`, params);
}

// 帮助中心-获取分类列表
export const updateHelpClassify = (params) => {
    return postRequest(`/article/classify/update`, params);
}

// 呼叫中心-获取用户信息
export const getCallUser = (params) => {
    return getRequest('/sys/platformUser/info', params);
}

// 呼叫中心-获取客户信息
export const getClient = (params) => {
    return getRequest('/customer/customer/listLike', params);
}


// 佳信接口
export const getJxToken = (params) => {
    return postRequest('/jiaxin/login', params)
}


/* 员工管理模块 */

// 销售组-删除
export const deleteMarketGroup = (params) => {
    return deleteRequest(`/smc/salesTeam/remove`, params);
}
// 工程师组-删除
export const deleteEngineGroup = (params) => {
    return deleteRequest(`/engineerGroup/delete`, params);
}
// 客服组-删除
export const deleteServertGroup = (params) => {
    return deleteRequest(`/customerService/group/remove`, params);
}


// 删除部门
export const deleteDept = (params) => {
    return deleteRequest(`/sys/dept/delete`, params);
}

// 返佣数据明细-订单明细
export const getOrderRebate = (params) => {
    return getRequest('/agent/order/list', params);
}

// 返佣数据明细-返佣明细
export const getRebate = (params) => {
    return getRequest('/agent/order/listForRackback', params);
}

// 评价中心-评价管理
export const getEvaluationList = (params) => {
    return getRequest('/evaluate/getEvaluationList', params)
}

// 获取订单类型ID
export const getOrderId = (params) => {
    return getRequest("/evaluate/getId", params)
}

// 返佣数据-文件
export const getRebateLst = (params) => {
    return getRequest('/agent/rakebackfileRecord/getPageList', params)
}

// 用户代理管理-列表
export const getIsvList = (params) => {
    return getRequest('/agent/listByAgentForIsv', params)
}

// 用户代理管理-新增
export const addAgentIsv = (params) => {
    return postRequest('/agent/addAgentIsv', params)
}
// 用户代理管理-编辑
export const editAgentIsv = (params) => {
    return postRequest('/agent/updateAgentIsv', params)
}
// 用户代理管理-指派销售
export const assignSales = (params) => {
    return postRequest('/agent/assignSales', params)
}
// 用户代理管理-详情
export const getByIsvId = (params) => {
    return getRequest('/agent/getByIsvId', params)
}

// 直销/用户代理列表
export const getlistByAgentDirectOrIsv = (params) => {
    return getRequest('/agent/listByAgentDirectOrIsv', params)
}
// 直销代理-编辑
export const editAgentDirect = (params) => {
    return postRequest('/agent/updateAgentDirect', params)
}
// 直销代理-详情
export const getByDirectId = (params) => {
    return getRequest('/agent/getByDirectId', params)
}

// 销售业绩管理-列表
export const getSalesPerformance = (params) => {
    return getRequest('/sales/SalesPerformance/getPageList', params)
}


/* 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */

// 健康-机构列表
export const getOrgList = (params) => {
    return getRequest('/org/getPageList', params)
}

//微信扫码获取用户信息
export const wxCheckLogin = (params) => {
    return getRequest('/wxCheckLogin', params)
}

//微信绑定账户信息
export const openIdLock = (params) => {
    return postRequest('/openIdLock', params)
}


//用户注册
export const register = (params) => {
    return postRequest('/register', params)
}

//用户验证码登录
export const smsLogin = (params) => {
    return postRequest('/smsLogin', params)
}


//获取短信验证码
export const mobileValidator = (params) => {
    return getRequest('/getMobileValidator', params)
}

//获取找回密码的短信验证码 新增
export const resetPwdValidator = (params) => {
    return getRequest('/getResetPwdValidator', params)
}

//用户找回密码
export const getPassword = (params) => {
    return postRequest('/resetPwd', params)
}

//获取教育机构列表,用于下拉选择
export const orgList = (params) => {
    return getRequest('/org/getList', params)
}

//手机号密码登录
export const pwdLogin = (params) => {
    return postRequest('/pwdLogin', params)
}

// 通用地址-省市联级
export const getAddresslist = (params) => {
    return getRequest('/address/getListSearch', params)
}
// 新增教育机构
export const addOrg = (params) => {
    return postRequest('/checkorg/addOrg', params)
}
// 编辑教育机构
export const editOrg = (params) => {
    return postRequest('/org/edit', params)
}
//新编辑机构
export const checkorg = (params) => {
    return postRequest('/checkorg/updateOrg', params)
}


//新机构列表查询

export const getPageList = (params) => {
    return getRequest('/checkorg/getPageList', params)
}

//超级管理员通过机构
export const pass = (params) => {
    return postRequest('/checkorg/pass', params)
}

//超级管理员不通过机构

export const failed = (params) => {
    return postRequest('/checkorg/failed', params)
}


//删除机构
export const deleteById = (params) => {
    return postRequest('/checkorg/deleteById', params)
}


//识别营业执照,办学许可
export const disc = (params) => {
    return postRequest('/checkorg/disc', params)
}




// 机构列表-健康申报-教师列表
export const getTeacherList = (params) => {
    return getRequest('/teacher/getPageList', params)
}
// 机构列表-健康申报-学生列表
export const getStudentList = (params) => {
    return getRequest('/student/getPageList', params)
}

// 复学申请列表
export const getAuditlist = (params) => {
    return getRequest('/common/resumeApprove/searchList', params)
}
// 复学申请删除
export const deletApprove = (params) => {
    return deleteRequest('/common/resumeApprove/delete', params)
}
// 复学申请新增
export const addApprove = (params) => {
    return postRequest('/common/resumeApprove/insert', params)
}
//提交复学审批表
export const applySubmit = (params) => {
    return postFormData('/common/resumeApprove/insert', params, 'json')
}
//审核复学审批表
export const applyList = (params) => {
    return postRequest('/common/resumeApprove/audit', params)
}



//通过ID查询复学审批表
export const applyDetailById = (params) => {
    return getRequest('/common/resumeApprove/detail', params)
}

//通用地址获取接口
export const adressInfo = (params) => {
    return getRequest('/address/getListSearch', params)
}

// 新增用户
export const addUser = (params) => {
    return postRequest('/sys/platformUser/add', params)
}
// 删除用户
export const deleteUser = (params) => {
    return postRequest('/sys/platformUser/delete/' + params)
}
// 编辑用户
export const editUser = (params) => {
    return postRequest('/sys/platformUser/edit', params)
}
// 提交人员健康申报表
export const personHealth = (params) => {
    return postRequest('/common/personnelHealth/insert', params)
}

// 导出数据
export const exportData = () => {
    return getRequest('/common/resumeApprove/export')
}
//通过ID查询人员健康申报表
export const personHealthDetail = (params) => {
    return getRequest('/common/personnelHealth/detail', params)
}
// 通过用户ID查询健康申报表
export const personHealthByUser = (params) => {
    return getRequest('/common/personnelHealth/byUser', params)
}

// 通过日健康信息的日期列表
export const getDateList = (params) => {
    return getRequest('/common/dailyHealth/dateList', params)
}

// 学生提交健康日报信息表
export const studentHealth = (params) => {
    return postRequest('/common/dailyHealth/insert', params)
}

// 获取有健康日报信息的日期列表
export const healthList = (params) => {
    return getRequest('/common/dailyHealth/dateList', params)
}

// 教师批量编辑学生的健康日报信息表
export const saveTemperature = (params) => {
    return postFormData('/common/dailyHealth/batchEdit', params)
}


// 条件搜索健康日报信息列表
export const healthDetails = (params) => {
    return getRequest('/common/dailyHealth/searchList', params)
}

//托管机构新增
export const trusteeshipAdd = (params) => {
    return postRequest('/common/nurseryApprove/insert', params)
}










// 健康日报信息列表
export const getEveryDayInfoList = (params) => {
    return getRequest('/common/dailyHealth/searchList', params)
}

// 机构填写体温
export const setOrgTemplate = (params) => {
    return postRequest('/common/dailyHealth/setOrgTemplate', params)
}

// 删除机构
export const deleteOrg = (params) => {
    return postRequest('/org/delete', params)
}

// 托管机构列表
export const getNurserylist = (params) => {
    return getRequest('/common/nurseryApprove/searchList', params)
}

// 托管机构查收申请
export const putNuersery = (params) => {
    return postRequest('/common/nurseryApprove/audit', params)
}
// 托管机构获取详情
export const getNurseryInfo = (params) => {
    return getRequest('/common/nurseryApprove/detail', params)
}

//健康日报
export const getDailyHealth = (params) => {
    return getRequest('/common/dailyHealth/allList', params)
}

// 添加健康日报（学生还没填报）
export const addOrgTemplate = (params) => {
    return postRequest('/common/dailyHealth/addOrgTemplate', params)
}

// 添加学生
export const addStudent = (params) => {
    return postRequest('/common/dailyHealth/addStudent', params)
}


// 授课老师管理
// 所在机构列表
export const getMyOrgList = (params) => {
    return getRequest('/mall/common/myOrgList', params)
}

// 授课老师列表
export const getLecturerList = (params) => {
    return getRequest('/mall/lecturer/list', params)
}

// 授课老师详情
export const getLecturerDetails = (params) => {
    return getRequest('/mall/lecturer/get', params)
}

// 添加授课老师
export const addLecturer = (params) => {
    return postRequest('/mall/lecturer/add', params)
}

// 编辑授课老师
export const editLecturer = (params) => {
    return postRequest('/mall/lecturer/edit', params)
}

// 删除授课老师
export const delLecturer = (params) => {
    return postRequest('/mall/lecturer/del', params)
}

// 机构的授课老师列表
export const getOrgLecturerList = (params) => {
    return getRequest('/mall/lecturer/orgLecturerList', params)
}

//授课老师评价列表

export const courseEvaluateList = (params) => {
    return getRequest('/mall/lecturer/courseEvaluateList', params)
}

//授课老师课程列表

export const courseLecturerList = (params) => {
    return getRequest('/mall/lecturer/courseLecturerList', params)
}

//授课打卡

export const studentAttendList = (params) => {
    return getRequest('/mall/lecturer/studentAttendList', params)
}

//授课列表

export const courseAttendList = (params) => {
    return getRequest('/mall/lecturer/courseAttendList', params)
}

// 课程管理

// 年级列表
export const getGradeList = (params) => {
    return getRequest('/mall/common/gradeList', params)
}

// 科目列表
export const getSubjectList = (params) => {
    return getRequest('/mall/common/subjectList', params)
}

// 课程列表
export const getCourseList = (params) => {
    return getRequest('/mall/course/list', params)
}

// 课程详情
export const getCourseDetails = (params) => {
    return getRequest('/mall/course/detail', params)
}

// 添加课程
export const addCourse = (params) => {
    return postRequest('/mall/course/add', params)
}

// 编辑课程
export const editCourse = (params) => {
    return postRequest('/mall/course/edit', params)
}

// 删除课程
export const delCourse = (params) => {
    return postRequest('/mall/course/del', params)
}

// 课程上架
export const putonCourse = (params) => {
    return postRequest('/mall/course/puton', params)
}

// 课程下架
export const pulloffCourse = (params) => {
    return postRequest('/mall/course/pulloff', params)
}


// 消课列表
export const courseClassList = (params) => {
    return getRequest('/mall/course/courseClassList', params)
}




// 机构的授课老师
export const getOrgLectures = (params) => {
    return getRequest('/mall/course/orgLectures', params)
}

// 课程的报名名单
export const getReportList = (params) => {
    return getRequest('/mall/course/reportList', params)
}

// 课程图片列表
export const getImgList = (params) => {
    return getRequest('/mall/course/imgList', params)
}

// 添加课程图片
export const addImg = (params) => {
    return postRequest('/mall/course/addImg', params)
}

// 编辑课程图片
export const editImg = (params) => {
    return postRequest('/mall/course/editImg', params)
}

// 删除课程图片
export const delImg = (params) => {
    return postRequest('/mall/course/delImg', params)
}

// 课程大纲列表
export const getOutlineList = (params) => {
    return getRequest('/mall/course/outlineList', params)
}

// 添加课程大纲
export const addOutline = (params) => {
    return postRequest('/mall/course/addOutline', params)
}
//最新添加大纲接口

export const saveOutline = (params) => {
    return postData('/mall/course/saveOutline', params)
}
// 编辑课程大纲
export const editOutline = (params) => {
    return postRequest('/mall/course/editOutline', params)
}

// 删除课程大纲
export const delOutline = (params) => {
    return postRequest('/mall/course/delOutline', params)
}

// 规则排课课时数
export const ruleCount = (params) => {
    return postRequest('/mall/course/ruleCount', params)
}

// 规则排课
export const ruleSchedule = (params) => {
    return postData('/mall/course/ruleSchedule', params)
}

// 日历排课
export const caleSchedule = (params) => {
    return postData('/mall/course/caleSchedule', params)
}

// 排课详情
export const schedule = (params) => {
    return getRequest('/mall/course/schedule', params)
}

// 导出 健康日报
//通过ID查询复学审批表
export const exportAll = (params) => {
    return getRequest('/common/dailyHealth/exportAll', params)
}

// 告知书
// 家长签名
export const collectAdd = (params) => {
    return postRequest('/collect/add', params)
}

// 学校列表
export const schList = (params) => {
    return getRequest('/collect/schList', params)
}

// 学校统计列表
export const schStatList = (params) => {
    return getRequest('/collect/schStatList', params)
}

// 班级统计列表
export const classStatList = (params) => {
    return getRequest('/collect/classStatList', params)
}

// 签名列表
export const signlist = (params) => {
    return getRequest('/collect/signlist', params)
}

// 签名导出
export const collectExport = (params) => {
    return getRequest('/collect/export', params)
}

//推荐课程

export const recommend = (params) => {
    return postRequest('/mall/course/recommend', params)
}

//取消课程

export const norecommend = (params) => {
    return postRequest('/mall/course/norecommend', params)
}


//订单列表
export const orderManage = (params) => {
    return getRequest('/mall/order/orderList', params)
}

//更改订单状态为已使用接口

export const orderused = (params) => {
    return postRequest('/mall/order/used', params)
}

// 提现
//我的账户
export const myAccount = (params) => {
    return getRequest('/mall/cash/myAccount', params)
}

// 绑定账户
export const bindAccount = (params) => {
    return postRequest('/mall/cash/bindAccount', params)
}

// 查询绑定账户验证信息
export const checkInfo = (params) => {
    return getRequest('/mall/cash/checkInfo', params)
}

// 提现操作
export const cashOut = (params) => {
    return postRequest('/mall/cash/out', params)
}

// 我的提现列表
export const outList = (params) => {
    return getRequest('/mall/cash/outList', params)
}

// 银行账户审核列表
export const accCheckList = (params) => {
    return getRequest('/mall/cash/accCheckList', params)
}

// 审核银行账户操作
export const checkAccount = (params) => {
    return postRequest('/mall/cash/checkAccount', params)
}

// 提现审核列表
export const outCheckList = (params) => {
    return getRequest('/mall/cash/outCheckList', params)
}

// 审核提现操作
export const checkOut = (params) => {
    return postRequest('/mall/cash/checkOut', params)
}


// 白名单机构审核列表
export const whiteList = (params) => {
    return getRequest('/white/auth/list', params)
}


// 白名单机构详情
export const whiteListdetail = (params) => {
    return getRequest('/white/auth/detail', params)
}

// 白名单机构认证
export const whiteListdone = (params) => {
    return postRequest('/white/auth/done', params)
}


// 白名单发票信息列表
export const whiteinvoiceList = (params) => {
    return getRequest('/white/invoice/list', params)
}

// 白名单开票操作
export const whiteinvoiceopen = (params) => {
    return postRequest('/white/invoice/open', params)
}

// 白名单注册审核列表
export const loginlist = (params) => {
    return getRequest('/white/login/list', params)
}

// 白名单注册审核列表详情
export const logindetail = (params) => {
    return postRequest('/white/login/detail', params)
}


// 白名单注册机构审核认证
export const logindone = (params) => {
    return postRequest('/white/login/done', params)
}


// 白名单纠错列表
export const correctlist = (params) => {
    return getRequest('/white/correct/list', params)
}

// 白名单纠错列表审核认证
export const correctdone = (params) => {
    return postRequest('/white/correct/done', params)
}

// 白名单纠错列表审核详情
export const correctdetail = (params) => {
    return postRequest('/white/correct/detail', params)
}

//管理员查询白名单数据
export const getByOrgName = (params) => {
    return postRequest('/checkorg/getByOrgName', params)
}

//管理员关联白名单数据
export const relationTrainOrg = (params) => {
    return postRequest('/checkorg/relationTrainOrg', params)
}

//管理员创建白名单机构
export const createAndRelation = (params) => {
    return postRequest('/checkorg/createAndRelation', params)
}


//管理员获取首页数据一
export const basic = (params) => {
    return postRequest('/homepage/admin/basic', params)
}


//管理员获取首页数据二
export const detail = (params) => {
    return postRequest('/homepage/admin/detail', params)
}


//管理员查询地区镇
export const getAreaName = (params) => {
    return getRequest('/address/getAreaName', params)
}


//管理员获取统计数据
export const statistics = (params) => {
    return postRequest('/homepage/admin/statistics', params)
}

//教育局获取统计数据一
export const edubasic = (params) => {
    return postRequest('/homepage/edu/basic', params)
}

//教育局获取统计数据一
export const edudetail = (params) => {
    return postRequest('/homepage/edu/detail', params)
}


//教育局获取统计数据一
export const edustatistics = (params) => {
    return postRequest('/homepage/edu/statistics/org', params)
}

//教育局获取统计数据二
export const edulec = (params) => {
    return postRequest('/homepage/edu/statistics/lec', params)
}


//机构管理员获取首页数据一
export const orguserbasic = (params) => {
    return postRequest('/homepage/orguser/basic', params)
}
//机构管理员获取首页数据二
export const orguserdetail = (params) => {
    return postRequest('/homepage/orguser/detail', params)
}

//机构管理员获取统计数据
export const orguserstatistics = (params) => {
    return postRequest('/homepage/orguser/statistics', params)
}

// 添加教材备案
export const addBook = (params) => {
    return postData('/book/add', params)
}

// 编辑教材备案
export const editBook = (params) => {
    return postData('/book/edit', params)
}

// 删除教材备案
export const delBook = (params) => {
    return postRequest('/book/del', params)
}

// 教材备案统计
export const summary = (params) => {
    return getRequest('/book/summary', params)
}

// 教材备案列表
export const bookList = (params) => {
    return getRequest('/book/list', params)
}

// 教材备案详情
export const bookDetail = (params) => {
    return getRequest('/book/detail', params)
}

// 年级列表
export const bookGradeList = (params) => {
    return getRequest('/book/gradeList', params)
}

//个人中心修改头像等

export const updateUserNameImg = (params) => {
    return postRequest('/sys/user/updateUserNameImg', params)
}


//民族查询列表
export const lecturerNationList = (params) => {
    return getRequest('/mall/common/lecturerNationList', params)
}


//政治面貌

export const lecturerPoliticalStatusList = (params) => {
    return getRequest('/mall/common/lecturerPoliticalStatusList', params)
}


//宗教列表

export const lecturerReligionList = (params) => {
    return getRequest('/mall/common/lecturerReligionList', params)
}

// 学生列表
export const studentList = (params) => {
    return getRequest('/student/list', params)
}

// 添加学生选择课程
export const selcourses = (params) => {
    return getRequest('/student/selcourses', params)
}

// 添加学生
export const addStudents = (params) => {
    return postData('/student/add', params)
}

// 学生详情
export const studentDetail = (params) => {
    return getRequest('/student/detail', params)
}

// 编辑学生
export const editStudent = (params) => {
    return postData('/student/edit', params)
}

// 删除学生
export const delStudent = (params) => {
    return postRequest('/student/del', params)
}

// 学生的课程列表
export const courses = (params) => {
    return getRequest('/student/courses', params)
}

// 课程打卡记录
export const attends = (params) => {
    return getRequest('/student/attends', params)
}

// 评价列表
export const evaluateList = (params) => {
    return getRequest('/aftersale/evaluateList', params)
}

// 退款列表
export const refundDetailList = (params) => {
    return getRequest('/finance/refundDetailList', params)
}

// 处理退款
export const financeDone = (params) => {
    return postRequest('/finance/done', params)
}


//后台机构属性的选项列表
export const orgAttrs = (params) => {
    return postRequest('/white/correct/orgAttrs', params,

    )
}



//管理机构列表
export const whiteTrainOrgList = (params) => {
    return getRequest('/white/check/whiteTrainOrgList', params)
}

// 添加机构
export const addWhiteOrg = (params) => {
    return postData('/white/action/add', params)
}

// 修改机构
export const updateWhiteOrg = (params) => {
    return postData('/white/action/update', params)
}

// 导入机构
export const WhiteOrgdo = (params) => {
    return postupData('/white/import/do', params)
}


//导入记录
export const whitehistory = (params) => {
    return getRequest('/white/import/history', params)
}
//机构详情
export const whitegetById = (params) => {
    return getRequest('/white/action/getById', params)
}

// 更改机构状态
export const changeWhiteOrgStatus = (params) => {
    return postRequest('/white/check/changeWhiteOrgStatus', params)
}

// 更改排查状态
export const updateCheckIns = (params) => {
    return postRequest('/white/check/updateCheckIns', params)
}

// 添加排查状态
export const addCheckIns = (params) => {
    return postRequest('/white/check/addCheckIns', params)
}

// 历史排查
export const historyList = (params) => {
    return postRequest('/white/check/historyList', params)
}

//测试
export const orgAttrstest = (params) => {
    return postupData('/white/correct/orgAttrs', params,

    )
}

//合同备案查询列表
export const getConOrgList = (params) => {
    return getRequest('/contract/getConOrgList', params)
}


// 添加合同
export const addcontract = (params) => {
    return postRequest('/contract/add', params)
}

// 删除合同
export const delcontract = (params) => {
    return postRequest('/contract/del', params)
}


//合同备案机构查询列表
export const getContractOrgByUserId = (params) => {
    return getRequest('/contract/getContractOrgByUserId', params)
}


//合同备案教育局查询列表
export const getContractByOrgId = (params) => {
    return getRequest('/contract/getContractByOrgId', params)
}


// 答题-查询机构列表
export const getAnswerOrgList = (params) => {
    return getRequest('/answer/orgList', params)
}


// 新闻列表
export const getNewsList = (params) => {
    return getRequest('/news/list', params)
}


// 头条新闻列表 
export const getHeadLines = (params) => {
    return getRequest('/news/headLines', params)
}

// 新闻详情
export const getNewsDetail = (params) => {
    return getRequest('/news/detail', params)
}

// 编辑新闻 
export const newsEdit = (params) => {
    return postRequest('/news/edit', params)
}

// 添加新闻 
export const newsAdd = (params) => {
    return postRequest('/news/add', params)
}

// 删除新闻
export const newsDel = (params) => {
    return postRequest('/news/del', params)
}

// 展示隐藏新闻
export const newsDone = (params) => {
    return postRequest('/news/done', params)
}

// 新闻列表（添加新闻头条）
export const getSelList = (params) => {
    return getRequest('/news/selList', params)
}

// 添加新闻头条
export const newsAddHeadLine = (params) => {
    return postData('/news/addHeadLine', params)
}

// 头条banner列表
export const getBannerIndexs = (params) => {
    return getRequest('/news/bannerIndexs', params)
}

// 添加banner选择课程
export const getSelCourses = (params) => {
    return getRequest('/news/selCourses', params)
}

// 添加轮播 
export const newsAddBanner = (params) => {
    return postData('/news/addBanner', params)
}

//(学校)疫情防控管理-健康日报 
export const allSchoolList = (params) => {
    return getRequest('/common/dailyHealth/allSchoolList', params)
}



// h5

// 老师登录
export const attendLogin = (params) => {
    return postRequest('/lecturer/attend/login', params)
}

// 公众号授权回调
export const checkAuth = (params) => {
    return postRequest('/lecturer/attend/checkAuth', params)
}

// 根据openId获取老师信息
export const attendGetInfo = (params) => {
    return getRequest('/lecturer/attend/getInfo', params)
}

// 老师某天课程信息
export const dayCourses = (params) => {
    return getRequest('/lecturer/attend/dayCourses', params)
}

// 课程大纲详情
export const attendOutlineDetail = (params) => {
    return getRequest('/lecturer/attend/outlineDetail', params)
}

// 课程的大纲列表
export const attendOutlines = (params) => {
    return getRequest('/lecturer/attend/outlines', params)
}

// 老师打卡操作
export const checkDone = (params) => {
    return postRequest('/lecturer/attend/done', params)
}

// 老师上课日期列表
export const attendCalendar = (params) => {
    return getRequest('/lecturer/attend/calendar', params)
}

// 机构列表
export const wOrgList = (params) => {
    return getRequest('/white/h5/list', params)
}

// 添加机构
export const wAdd = (params) => {
    return postData('/white/h5/add', params)
}

// 编辑机构 
export const wEdit = (params) => {
    return postData('/white/h5/edit', params)
}

// 机构详情
export const wOrgDetail = (params) => {
    return getRequest('/white/h5/detail', params)
}

// 排查情况列表 
export const insList = (params) => {
    return getRequest('/white/h5/insList', params)
}

// 提交排查信息
export const submitIns = (params) => {
    return postData('/white/h5/submitIns', params)
}

// 排查操作
export const doIns = (params) => {
    return postData('/white/h5/doIns', params)
}

// 查询下级地市信息 
export const getAreaList = (params) => {
    return getRequest('/white/h5/getAreaList', params)
}

// 答题-查询机构列表
export const aOrgList = (params) => {
    return getRequest('/answer/orgList', params)
}

// 答题-生成试卷（临时账号）
export const genPaper = (params) => {
    return postRequest('/answer/genPaper', params)
}

// 答题-题目详情
export const questionDetail = (params) => {
    return getRequest('/answer/questionDetail', params)
}

// 答题-答题操作
export const aDone = (params) => {
    return postRequest('/answer/done', params)
}

// 答题-答题结果
export const aResult = (params) => {
    return getRequest('/answer/result', params)
}

// 指定地市或学习列表
export const areaSchList = (params) => {
    return getRequest('/collect/areaSchList', params)
}


// 员工管理

// 角色列表
export const roleList = (params) => {
    return getRequest('/staff/role/list', params)
}

// 菜单按钮列表
export const allFunList = (params) => {
    return getRequest('/staff/role/allFunList', params)
}

// 添加角色
export const roleAdd = (params) => {
    return postData('/staff/role/add', params)
}

// 编辑角色
export const roleEdit = (params) => {
    return postData('/staff/role/edit', params)
}

// 删除角色
export const roleDel = (params) => {
    return postRequest('/staff/role/del', params)
}

// 员工列表
export const userList = (params) => {
    return getRequest('/staff/user/list', params)
}

// 查询角色权限列表
export const myFunList = (params) => {
    return getRequest('/staff/role/myFunList', params)
}

// 添加员工
export const userAdd = (params) => {
    return postData('/staff/user/add', params)
}

// 编辑员工
export const userEdit = (params) => {
    return postData('/staff/user/edit', params)
}

// 删除员工
export const userDel = (params) => {
    return postRequest('/staff/user/del', params)
}

// 设置员工在职状态
export const setTeaching = (params) => {
    return postRequest('/staff/user/setTeaching', params)
}


// 添加审核机构接口
export const addCheckOrg = (params) => {
    return postRequest('/checkorg/addCheckOrg', params)
}


//更改审核机构接口
export const updateCheckOrg = (params) => {
    return postRequest('/checkorg/updateCheckOrg', params)
}

// 添加机构按钮判断
export const goAddCheckOrg = (params) => {
    return getRequest('/checkorg/goAddCheckOrg', params)
}

// 机构管理列表
export const checkOrgList = (params) => {
    return getRequest('/checkorg/checkOrgList', params)
}

// 机构详情
export const checkOrgDetail = (params) => {
    return getRequest('/checkorg/checkOrgDetail', params)
}

// 查看认证机构列表
export const checkOrgAuthenList = (params) => {
    return getRequest('/checkorg/checkOrgAuthenList', params)
}

//（个人）认证新机构

export const personalAuthenAdd = (params) => {
    return postRequest('/checkorg/personalAuthenAdd', params)
}
// 查看（个人）认证
export const personalAuthenDetail = (params) => {
    return getRequest('/checkorg/personalAuthenDetail', params)
}

// 添加自动填充
export const authenDetail = (params) => {
    return getRequest('/checkorg/authenDetail', params)
}

//（个人）修改认证机构

export const personalAuthenUpdate = (params) => {
    return postRequest('/checkorg/personalAuthenUpdate', params)
}

//企业认证
export const companyAuthenAdd = (params) => {
    return postRequest('/checkorg/companyAuthenAdd', params)
}

//企业编辑

export const companyAutheUpdate = (params) => {
    return postRequest('/checkorg/companyAuthenUpdate', params)
}

//查看企业详情
export const companyAuthenDetail = (params) => {
    return getRequest('/checkorg/companyAuthenDetail', params)
}


// 课程类别列表
export const categoryList = (params) => {
    return getRequest('/course/category/list', params)
}

// 添加课程类别
export const categoryAdd = (params) => {
    return postData('/course/category/add', params)
}

// 编辑课程类别
export const categoryEdit = (params) => {
    return postData('/course/category/edit', params)
}

// 删除课程类别
export const categoryDel = (params) => {
    return postRequest('/course/category/del', params)
}



