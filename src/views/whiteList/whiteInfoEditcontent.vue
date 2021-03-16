<template>
<div class="trainlist">
    <Row>
        <div class="header" ref="header">
            <div class="title">
                <span>纠错审核</span>
             
            </div>
        </div>
        <!-- <Divider style="margin: 10px 0" /> -->
    </Row>
    <!-- 搜索 -->

    <div class="form_first" :style="{ height: tableHeight + 'px' }">
        <div class="form">
            <Row>
                <div class="search">
                    <div class="conten_first">
                        <Col span="24">
                        <div class="information">●基本信息(全称)</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">1.机构名称</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">2.机构所在区域</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">3.设立时间</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ orgName }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ areaName }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ establishDate }}</div>
                        </Col>
                        <!-- 统一社会用代码 -->
                        <Col span="8">
                        <div class="information_first">4.统一社会信用代码</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">5.注册地址</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">6.实际经营地址</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ uscCode }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ setAddress }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ businessAddress }}</div>
                        </Col>

                        <!-- 法定代表人-->
                        <Col span="8">
                        <div class="information_first">7.法定代表人姓名</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">8.校长(负责人)姓名</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">9.举办者名称(姓名)</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ legalRep }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ chairman }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ organizer }}</div>
                        </Col>
                        <!--举办者属性-->

                        <Col span="8">
                        <div class="information_first">10.举办者属性</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first"></div>
                        </Col>
                        <Col span="8">
                        <div class="information_first"></div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{orgType}}</div>
                        </Col>
                    </div>

                    <div class="conten_first">
                        <Col span="24">
                        <div class="information">●资质信息</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">1.办学资质说明</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">2.办学许可证号</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">3.发证机关</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">有办学许可证</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ srlNo }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ issuingDepartment }}</div>
                        </Col>

                        <!-- 法定代表人-->

                        <Col span="8">
                        <div class="information_first">4.法人登记部门</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first"></div>
                        </Col>
                        <Col span="8">
                        <div class="information_first"></div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ lprDepartment }}</div>
                        </Col>
                    </div>

                    <!--办学情况-->
                    <div class="conten_first">
                        <Col span="24">
                        <div class="information">●办学情况</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">1.培训类别</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">2.培训内容</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">3.招生对象</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ trainType }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ trainContent }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ enrollmentTarget }}</div>
                        </Col>

                        <Col span="8">
                        <div class="information_first">4.招生范围</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">5.培训方式</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first"></div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ enrollmentScope }}</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{orgTrainform}}</div>
                        </Col>
                    </div>

                    <!--学科培训-->
                    <div class="conten_first">
                        <Col span="24">
                        <div class="information">●学科培训</div>
                        </Col>

                        <Col span="8">
                        <div class="information_first">1.培训学科</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">2.培训方式</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first"></div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ pmSchoolSubject }}</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{pmSchoolType}}</div>
                        </Col>
                    </div>

                    <!--办学条件-->

                    <div class="conten_first">
                        <Col span="24">
                        <div class="information">●办学条件</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">1.场地性质</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">2.建筑面积(平方米)</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">3.教职工数</div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ placeType }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ placeArea }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ staffNum }}</div>
                        </Col>

                        <Col span="8">
                        <div class="information_first">4.专职教师数</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">5.外籍教师数</div>
                        </Col>
                        <Col span="8">
                        <div class="information_first">
                            6.持教师资格证/专业技能证教师数
                        </div>
                        </Col>

                        <Col span="8">
                        <div class="information_firstx">{{ teacherNum }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ fteacherNum }}</div>
                        </Col>
                        <Col span="8">
                        <div class="information_firstx">{{ cteacherNum }}</div>
                        </Col>

                        <Col span="6">
                        <div class="information_first">7.公办中小学在职教师数</div>
                        </Col>
                        <Col span="6">
                        <div class="information_first">8.是否寄宿</div>
                        </Col>
                        <Col span="6">
                        <div class="information_first">9.是否提供餐饮</div>
                        </Col>
                        <Col span="6">
                        <div class="information_first">10.有无餐饮许可证</div>
                        </Col>

                        <Col span="6">
                        <div class="information_firstx">{{ pteacherNum }}</div>
                        </Col>
                        <Col span="6">
                        <div class="information_firstx">{{ ifBoard }}</div>
                        </Col>
                        <Col span="6">
                        <div class="information_firstx">{{ ifFood }}</div>
                        </Col>

                        <Col span="6">
                        <div class="information_firstx">{{ ifCslicense }}</div>
                        </Col>
                    </div>

                    <!--提交-->
                    <!--认证材料-->
                    <div class="conten_first">
                        <Col span="24">
                        <div class="information">●认证材料</div>
                        </Col>

                        <Col span="8">
                        <div class="information_img">
                            <img :src="uscCodeImg" />
                        </div>
                        </Col>
                        <Col span="8">
                        <div class="information_img">
                            <img :src="srlNoImg" />
                        </div>
                        </Col>
                        <Col span="8">
                        <div class="information_img">
                            <img :src="identityNoImg" />
                        </div>
                        </Col>

                        <Col span="8">
                        <div class="information_imgx">营业执照</div>
                        </Col>

                        <Col span="8">
                        <div class="information_imgx">办学许可证</div>
                        </Col>

                        <Col span="8">
                        <div class="information_imgx">法人身份证</div>
                        </Col>

                        <Col span="24">
                        <div class="information_first" style="margin-left: 20px">
                            联系方式
                        </div>
                        </Col>

                        <Col span="24">
                        <div class="information_firstx" style="margin-left: 15px; width: 97%">
                            {{phone}}
                        </div>
                        </Col>
                    </div>

                    <div class="class_buttom">
                        <Col span="8" v-if="state == 1 || state == 2">
                        <div class="information_first"></div>
                        </Col>
                        <Col span="8">
                        <div class="information_button" @click="goBack">返 回</div>
                        </Col>
                        <Col span="8" v-if="state == 1 || state == 2">
                        <div class="information_first"></div>
                        </Col>

                        <Col span="8" v-if="state == 0">
                        <div class="information_button1" @click="erno">不 通 过</div>
                        </Col>

                        <Col span="8" v-if="state == 0">
                        <div class="information_button2" @click="succes">通 过</div>
                        </Col>
                    </div>
                </div>
            </Row>
        </div>
    </div>

    <Modal v-model="modal" width="460" :styles="{ top: '20%' }">
        <p slot="header" style="
          color: #606060;
          text-align: center;
          font-weight: 550;
          padding: 25px 0px;
        ">
            <span v-if="status == 2">审核不通过</span>
        </p>
        <p slot="close" style="
          border: 1px solid #818284;
          border-radius: 100%;
          background: white;
        ">
            <Icon @click.native="addceshi" type="ios-close-circle" style="margin-top: 1px; margin-left: 0px" size="24"></Icon>
        </p>

        <div v-if="status == 1" style="text-align: center; margin-bottom: 50px">
            <span class="queding">确定通过审核?</span>
        </div>

        <div v-if="status == 2" class="tex">
            <Form :model="formLeft" label-position="left" :label-width="100">
                <FormItem label="备注内容">
                    <Input type="textarea" v-model="formLeft.audit" :rows="4" placeholder="请输入审核不通过的原因" />
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button v-if="stats == 1" type="primary" @click="submitAuditx">确 定</Button>
            <Button v-else type="primary" @click="submitAudit">确 定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    formatDate
} from "../../utils/time.js";
import {
    getAddresslist,
    correctdetail,
    correctdone
} from "@/api";
import {
    dateFormat
} from "@/utils/current";
export default {
    data() {
        return {
            isEdit: "add",
            seach_panel: true,
            ex: "",
            cvimg: "",
            institution: "",
            status: "",
            stats: "",
            state: "",
            formLeft: {
                audit: "请提供清晰彩色营业执照照片和法人身份证原件照片",
            },
            modal: false,
            tableHeight: 0,
            addressData: [],
          
            orgName: "",
            areaName: "",
            establishDate: "",
            uscCode: "",
            setAddress: "",
            businessAddress: "",
            legalRep: "",
            chairman: "",
            organizer: "",
            srlNo: "",
            issuingDepartment: "",
            lprDepartment: "",
            trainContent: "",
            enrollmentTarget: "",
            enrollmentScope: "",
            pmSchoolSubject: "",
            placeType: "",
            orgTrainform: "",
            pmSchoolType: "",
            orgType: "",
            placeArea: "",
            staffNum: "",
            teacherNum: "",
            fteacherNum: "",
            cteacherNum: "",
            pteacherNum: "",
            ifBoard: "",
            ifFood: "",
            trainType: "",
            ifCslicense: "",
            uscCodeImg: "",
            phone: "",
            srlNoImg: "",
            identityNoImg: "",
            addressDataSearch: [],
            area: [],
            areaId: [],
            // 判断显示哪个下拉框 0 = 区级/镇级教育局，不显示 ; 1 = 市级教育局，可以选择 区/镇 ; 2 = 省级教育局，可以选 市，区/镇 ; 3 = admin ，可以选 省，市，区/镇。
            showAddInput: 0,
            s_id: "",
            z_id: "",
            q_id: "",
            areaId2: [],

            // 角色 0 = admin ; 1 = 机构 ; 2 = 镇级教育局 ; 3 = 市级教育局 ; 4 省级教育局 ;
            role: "",
        };
    },
    created() {
        this.getUserInfo();
        this.getCourseDetails();
    },
    mounted() {
        this.init();
    },
    destroyed() {
        // 销毁全局方法
        window.onresize = null;
    },
    computed: {
        ...mapState({
            menuBtns: (state) => state.menu.menuBtns,
        }),
    },
    methods: {
        init() {
            // 计算页面高度
            this.pageHeight();
            window.onresize = () => {
                this.pageHeight();
            };
        },

        pageHeight() {
            let pageHeight = Number(
                document.getElementsByClassName("single-page")[0].clientHeight
            );

            let footerHeight = 90;
            this.tableHeight = pageHeight - footerHeight;
            // console.log(this.tableHeight);
        },

        getUserInfo() {
            let userMessage = JSON.parse(sessionStorage.getItem("userInfo"));
            console.log(userMessage);

            let addId_list = [];
            let type = userMessage.type;
            addId_list = userMessage.areaId.split(",");
            console.log(addId_list);
            let s_id;
            let z_id;
            let q_id;
            if (type == "TOWNPRINCIPAL") {
                // 区级/镇级教育局
                let id0 = addId_list[0];
                let id1 = addId_list[1];
                let id2 = addId_list[2];
                s_id = parseInt(id0);
                z_id = parseInt(id1);
                q_id = parseInt(id2);
                this.role = 1;
                this.ex = 1;
                this.institution = 1;
                this.showAddInput = 0;
            } else if (type == "EDUCATIONPRINCIPAL") {
                // 市级教育局
                let id0 = addId_list[0];
                let id1 = addId_list[1];
                s_id = parseInt(id0);
                z_id = parseInt(id1);
                q_id = 0;

                this.areaId2.push(s_id);
                this.areaId2.push(z_id);
                this.areaId2.push(q_id);

                console.log(this.areaId2);
                this.showAddInput = 1;
                this.getTownshipList(s_id, z_id);
            } else if (type == "INNER") {
                // admin
                this.showAddInput = 3;

                s_id = 0;
                z_id = 0;
                q_id = 0;
            } else if (type == "ORGPRINCIPAL" || type == "TRUSTEESHIPORGPRINCIPAL") {
                let id0 = addId_list[0];
                let id1 = addId_list[1];
                let id2 = addId_list[2];
                s_id = parseInt(id0);
                z_id = parseInt(id1);
                // q_id = parseInt(id2);
                q_id = 0;

                this.cvimg = 1;
                this.role = 1;
            }
            // else if(addId_list.length ==1){
            //   // 省级教育局
            //   var id0 = addId_list[0];
            //   var s_id = Integer.parseInt(id0);
            //   this.getCityList(s_id);
            // }
            // this.searchForm.provinceId = s_id;
            // this.searchForm.cityId = z_id;
            // this.searchForm.areaId = q_id;
            console.log("获取地区" + this.showAddInput);
        },

        getCourseDetails() {
            let id = this.$route.query.id;
            let params = {
                id,
            };
            console.log(id);
            correctdetail(params).then((res) => {
                console.log(res);
                if (res.code == 200) {
                    let result = res.result;
                    console.log(result);
                    this.orgName = result.orgName;
                    this.areaName = result.areaName;
                    this.establishDate = result.establishDate;
                    this.uscCode = result.uscCode;
                    this.setAddress = result.setAddress;
                    this.businessAddress = result.businessAddress;
                    this.legalRep = result.legalRep;
                    this.chairman = result.chairman;
                    this.organizer = result.organizer;
                    this.srlNo = result.srlNo;
                    this.issuingDepartment = result.issuingDepartment;
                    this.lprDepartment = result.lprDepartment;
                    this.trainContent = result.trainContent;
                    this.enrollmentTarget = result.enrollmentTarget;
                    this.enrollmentScope = result.enrollmentScope;
                    this.particularsList = result.detailImgs;
                    this.pmSchoolSubject = result.pmSchoolSubject;
                    this.placeType = result.placeType;
                    this.placeArea = result.placeArea;
                    this.staffNum = result.staffNum;
                    this.teacherNum = result.teacherNum;
                    this.fteacherNum = result.fteacherNum;
                    this.cteacherNum = result.cteacherNum;
                    this.pteacherNum = result.pteacherNum;
                    this.ifBoard = result.ifBoard;
                    this.ifFood = result.ifFood;
                    this.ifCslicense = result.ifCslicense;
                    this.trainType = result.trainType;
                    this.orgTrainform = result.orgTrainform;
                    this.pmSchoolType = result.pmSchoolType;
                    this.orgType = result.orgType;
                    this.uscCodeImg = result.uscCodeImg;
                    this.phone = result.phone;
                    this.srlNoImg = result.srlNoImg;
                    this.identityNoImg = result.identityNoImg;
                    this.state = result.status;
                }
            });
        },

        addceshi() {

        },

        // 关闭并返回
        goBack() {
            let route = this.$parent.$route;
            this.$parent.closeTag(route);
            // this.$router.go(-1);
            this.$router.push({
                name: "whiteInfoEdit"
            });
        },

        succes() {
            this.modal = true;

            this.id = this.$route.query.id;
            this.status = 1;
        },

        erno() {
            this.modal = true;
            // console.log(row.orgName);
            this.id = this.$route.query.id;
            this.status = 2;
        },

        submitAudit() {
            console.log(this.$route.query.id);
            let id = this.$route.query.id;
            let reason = this.formLeft.audit;
            console.log(this.formLeft.audit);
            let status = this.status;

            if (status == 1) {
                console.log(status);

                //审核通过
                let status = 1;
                let params = {
                    id,
                    status,
                };
                correctdone(params).then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$Message.success({
                            top: 300,
                            closable: true,
                            duration: 3,
                            content: res.result,
                        });
                        this.getCourseDetails();
                        this.modal = false;
                    } else {
                        this.$Message.error({
                            top: 300,
                            closable: true,
                            duration: 3,
                            content: res.message,
                        });
                    }
                });
            } else {
                let status = 2;
                if (reason == "") {
                    this.$Message.error("请输入审核不通过的理由!");
                } else {
                    let params = {
                        id,
                        status,
                        reason,
                    };
                    correctdone(params).then((res) => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$Message.success({
                                top: 300,
                                closable: true,
                                duration: 3,
                                content: res.result,
                            });
                            this.getCourseDetails();
                            this.modal = false;
                        } else {
                            this.$Message.error({
                                top: 300,
                                closable: true,
                                duration: 3,
                                content: res.message,
                            });
                        }
                    });
                }
            }
        },

    },
};
</script>

<style lang="scss" scoped>
.trainlist {
    padding: 12px 16px;

    .header {
        display: flex;
        justify-content: space-between;
        padding: 0 6px;

        .title {
      color: #373737;
      font-weight: 600;
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
      margin-left: 45px;
      position: relative;
    }

    .title::before {
      bottom: 5px;
      width: 27px;
      height: 5px;
      border-radius: 30px;
      background: #9fbffe;
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    }


    .search {
        padding: 0 6px;
        margin-bottom: 10px;
        // overflow: hidden;

        border-radius: 15px;
        float: left;
        width: 100%;

        .ivu-form {
            .ivu-form-item {
                margin: 10px 0;
                margin-right: 12px;
            }
        }
    }

    .footer {
        margin-top: 10px;
    }
}

.trainlist::after {
    content: "";
    background: #fff;
    left: -16px;
    top: -16px;
    position: absolute;
    width: 110%;
    height: 110%;
    z-index: -1;
}

.footer_btn {
    .ivu-btn {
        height: 40px;
        width: 40%;
        margin-right: 6.66666%;
    }
}

.conten_first {
    float: left;
    width: 100%;
}

.information {
    height: 35px;
    float: left;
    margin-top: 20px;
    width: 90%;
    margin-left: 1%;
    font-size: 18px;
    font-weight: 550;
    line-height: 35px;
    padding-left: 18px;
    color: #4581f5;
}

.information_first {
    height: 35px;
    float: left;
    margin-top: 15px;
    width: 90%;
    font-size: 16px;
    margin-left: 5%;
    font-weight: 550;
    line-height: 35px;
    padding-left: 15px;
    color: #20295f;
}

.information_img {
    float: left;
    margin-top: 15px;
    width: 80%;
    height: 350px;
    font-size: 16px;
    margin-left: 10%;
    font-weight: 550;
    line-height: 35px;
    padding-left: 15px;
    color: #20295f;
}

.information_img img {
    float: left;
    width: 100%;
    height: 100%;
}

.information_imgx {
    height: 35px;
    float: left;
    margin-top: 15px;
    width: 80%;
    text-align: center;
    font-size: 16px;
    margin-left: 10%;
    font-weight: 550;
    line-height: 35px;
    padding-left: 15px;
    color: #20295f;
}

.information_button {
    height: 50px;
    float: left;
    margin-top: 15px;
    width: 80%;
    text-align: center;
    font-size: 14px;
    margin-left: 10%;
    font-weight: 550;
    line-height: 50px;
    padding-left: 15px;
    color: #bbbbbc;
    border: 2px solid #bbbbbc;
    border-radius: 10px;
    cursor: pointer;
}

.information_button1 {
    height: 50px;
    float: left;
    margin-top: 15px;
    width: 80%;
    text-align: center;
    font-size: 14px;
    margin-left: 10%;
    font-weight: 550;
    line-height: 50px;
    padding-left: 15px;
    background: #fa455e;
    color: white;
    border: 2px solid #fa455e;
    border-radius: 10px;
    cursor: pointer;
}

.information_button2 {
    height: 50px;
    float: left;
    margin-top: 15px;
    width: 80%;
    text-align: center;
    font-size: 14px;
    margin-left: 10%;
    font-weight: 550;
    line-height: 50px;
    padding-left: 15px;
    background: #417df4;
    color: white;
    border: 2px solid #417df4;
    border-radius: 10px;
    cursor: pointer;
}

.information_firstx {
    height: 40px;
    float: left;
    margin-top: 20px;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 550;
    line-height: 40px;
    padding-left: 15px;
    color: #83a8f2;
    background: white;
    border-radius: 10px;
}

.CourseDetails {
    float: left;
    width: 100%;
    height: 10px;
}

.form {
    height: calc(100vh - 250px);
    overflow: auto;
    padding: 0px;
}

.form_first {
    padding: 15px 0px;
    background: #f0f2f7;
    border: 1px solid #f0f2f7;
    border-radius: 10px;
    margin-top: 10px;
}

.class_buttom {
    float: left;
    width: 70%;
    margin-left: 15%;
    height: 50px;
    margin-top: 40px;
    margin-bottom: 50px;
}

.queding {
    font-size: 18px;
    font-weight: 550;
}

textarea.ivu-input {
    height: 160px;
}

.tex {
    text-align: center;
    height: 65px;
    margin-bottom: 30px;
    width: 90%;
    margin-left: 0%;
}

/deep/ .ivu-modal-close {
    z-index: 1;
    font-size: 12px;
    position: absolute;
    right: -8px;
    top: -8px;
    overflow: hidden;
    cursor: pointer;
    background: none !important;
    color: #515a6e;
    // border-radius: 50%;
}

/deep/ .ivu-modal-content {
    border-radius: 20px;
}

/deep/ .ivu-modal-header {
    border: 0px;
}

/deep/ .ivu-input {
    border-radius: 10px;
    height: 65px;
    overflow: hidden;
}

/deep/ .ivu-modal-footer {
    border-top: none;
}

/deep/ .ivu-form-item-content p {
    text-align: left;
    font-size: 12px;
    // color: #c8c8c8;
    line-height: 22px;
}

/deep/ .ivu-modal-footer .ivu-btn {
    margin-right: 51%;
    transform: translateX(50%);
    height: 46px;
    border-radius: 10px;
    background: #417df4;
    width: 220px;
    margin-bottom: 10px;
}
</style>
