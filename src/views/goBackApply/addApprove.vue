<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-24 11:03:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-30 21:51:49
--> 
<template>
  <div class="add">
    <Row>
      <div class="header" ref="header">
        <div class="title">
          <span>新增培训机构复学审批</span>
        </div>
      </div>
      <Divider style="margin:10px 0" />
    </Row>
    <div class="form">
      <Form ref="formValidate" :model="form" label-position="top" :rules="ruleValidate">
        <FormItem label="1.机构名称（全称）" prop="organizationName">
          <!-- <Input v-model="form.organizationName" placeholder="请输入"></Input> -->
          <Select v-model="form.organizationId" @on-change="selectOrganization">
            <Option v-for="(item,index) in orgList" :key="index" :value="item.id">{{item.orgName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="2.机构所在镇区（街县）" prop="organizationTown">
          <Input v-model="form.organizationTown" placeholder="请输入"></Input>
          <!-- <vueCityPicker @success="chooseCity"></vueCityPicker> -->
        </FormItem>
        <FormItem label="3.详细地址" prop="address">
          <Input v-model="form.address" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="4.教育部门办学许可证号">
          <Input v-model="form.schoolPermitNo" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="5.市场监管部门注册证号">
          <Input v-model="form.marketRegulationNo" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="6.民政部门登记证号">
          <Input v-model="form.civilAffairsNo" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="7.人社部门登记证号">
          <Input v-model="form.mohrssNo" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="8.机构负责人" prop="organizationPrincipal">
          <Input v-model="form.organizationPrincipal" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="9.负责人电话" prop="principalPhone">
          <Input v-model="form.principalPhone" placeholder="请输入" maxlength="11"></Input>
        </FormItem>
        <FormItem label="10.填报人" prop="filledName">
          <Input v-model="form.filledName" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="11.填报人电话" prop="filledPhone">
          <Input v-model="form.filledPhone" placeholder="请输入" maxlength="11"></Input>
        </FormItem>
        <FormItem label="12.复学教职工总人数（人）" prop="teacherCount">
          <InputNumber :min="0" v-model="form.teacherCount" placeholder="请输入" style="width:100%"></InputNumber>
        </FormItem>
        <FormItem label="13.复学教职员工核酸检测阴性人数（人）" prop="negativeTeacherCount">
          <InputNumber
            :min="0"
            v-model="form.negativeTeacherCount"
            placeholder="请输入"
            style="width:100%"
          ></InputNumber>
        </FormItem>
        <FormItem label="14.复学学生人数（人）" prop="stuCount">
          <InputNumber :min="0" v-model="form.stuCount" placeholder="请输入" style="width:100%"></InputNumber>
        </FormItem>
        <FormItem label="15.来自境外、重点疫区学员人数（人）" prop="outStuCount">
          <InputNumber :min="0" v-model="form.outStuCount" placeholder="请输入" style="width:100%"></InputNumber>
        </FormItem>
        <FormItem label="16.来自境外、重点疫区学生核酸检测阴性人数(人)" prop="negativeOutStuCount">
          <InputNumber
            :min="0"
            v-model="form.negativeOutStuCount"
            placeholder="请输入"
            style="width:100%"
          ></InputNumber>
        </FormItem>
        <FormItem label="17.申请复学时间（月日）" prop="startDate">
          <DatePicker @on-change="selectDate1" type="date" placeholder="选择日期" style="width: 100%;"></DatePicker>
        </FormItem>
        <FormItem label="18.机构自查完成时间（月日）" prop="readyDate">
          <DatePicker @on-change="selectDate2" type="date" placeholder="选择日期" style="width: 100%;"></DatePicker>
        </FormItem>
        <FormItem label="19.计划镇区专班验收时间（月日）" prop="acceptanceDate">
          <DatePicker @on-change="selectDate3" type="date" placeholder="选择日期" style="width: 100%;"></DatePicker>
        </FormItem>
        <FormItem label="20.计划报送市专班时间（月日）" prop="submitDate">
          <DatePicker @on-change="selectDate4" type="date" placeholder="选择日期" style="width: 100%;"></DatePicker>
        </FormItem>
        <FormItem label="21.机构自查是否符合复学条件？" prop="eligible">
          <RadioGroup v-model="form.eligible">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <p style="margin-bottom:10px">
          <span
            style="display:inline-block;margin-right:4px;line-height:1;font-family:SimSun;font-size:14px;color:#ed4014;"
          >*</span> 22.自查情况：（必填）
        </p>
        <!-- <FormItem label=""> -->
        <div style="margin-left:16px">
          <FormItem
            prop="checka"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checka">
              <span style="margin-right:20px">是否制定突发公共卫生事件应急预案</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkb"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkb">
              <span style="margin-right:20px">是否全面排查教职员工基本信息，建立“一人一档”</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkc"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkc">
              <span style="margin-right:20px">是否发放疫情防控资料，开展员工疫情防控培训</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkd"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkd">
              <span style="margin-right:20px">是否建立日常消杀和保洁制度，且有专人负责</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checke"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checke">
              <span style="margin-right:20px">是否对复学学生基本情况进行排摸，建立学生信息台账</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem
            prop="checkf"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkf">
              <span style="margin-right:20px">是否对全体教职员工和来自境外、国内重点地区的学生返校前7天进行核酸检测</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem
            prop="checkg"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkg">
              <span style="margin-right:20px">是否建立师生进入登记、测温，以及异常健康人员信息上报制度</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem
            prop="checkh"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkh">
              <span style="margin-right:20px">是否确保学生之间距离不少于1米</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem
            prop="checki"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checki">
              <span style="margin-right:20px">是否明确辖区发热门诊、辖区疾控机构联系方式</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkj"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkj">
              <span style="margin-right:20px">是否做到“封闭式”管理，严控人员进出</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkk"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkk">
              <span style="margin-right:20px">是否进行应急预案的演练</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkl"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkl">
              <span style="margin-right:20px">是否设置有临时观察区</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkm"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkm">
              <span style="margin-right:20px">是否通风良好（自然通风效果不佳可增加机械辅助通风设施）</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkn"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkn">
              <span style="margin-right:20px">是否设置足够洗手设施或免洗手消毒剂（含乙醇60%以上）</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem
            prop="checko"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checko">
              <span style="margin-right:20px">是否对本机构全体教师进行了一次《中山市中小学疫情防控下返校心理建设指引》专题培训？</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            prop="checkp"
            :rules="{required: true,message:'请选择',trigger: 'change', type:'number'}"
          >
            <RadioGroup v-model="form.checkp">
              <span style="margin-right:20px">是否制定接送车辆防疫预案和日常消毒制度</span>
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
            <!-- </FormItem> -->
          </FormItem>
        </div>
        <FormItem label="机构疫情防控物资情况（口罩、测温仪器、消杀用品等））">
          <Table ref="myTable" border :columns="columns" :data="form.supplies" size="small"></Table>
          <ButtonGroup>
            <Button type="error" size="small" style="width:60px;" @click.native="deletItem">删除行</Button>
            <Button type="primary" size="small" style="width:60px;" @click.native="addItem">添加行</Button>
          </ButtonGroup>
        </FormItem>
        <FormItem label="23.本机构已知晓并承诺：" prop="protocol">
          <p>严格落实《中华人民共和国传染病防治法》，按照国家、省、市相关要求，认真履行主体责任，完善应急预案，已经落实各项防范措施（详见上面自查情况），保障教职员工、学生的生命安全和身体健康，确保不发生传染性疫情事件。若因防范措施不到位或者管理不当，发生疫情并导致疫情传播，产生重大影响，立即停课并承担相应的法律后果。</p>
          <RadioGroup v-model="form.protocol">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
    <Divider />
    <div class="button-ground">
      <Button type="primary" @click.native="submit('formValidate')" style="margin-right:6px">申请</Button>
      <Button type="default" @click.native="goBack('formValidate')">返回列表</Button>
    </div>
  </div>
</template>
<script>
import { applySubmit, orgList } from "@/api";
export default {
  data() {
    return {
      userId: "",
      orgList: [],
      form: {
        supplies: [
          {
            id: 1,
            name: "", //名称
            unit: "", //单位
            number: "" //数量
          }
        ],
        organizationTown: "", //机构所在镇区（街县）
        organizationName: "", //机构名称（全称）
        address: "", //详细地址
        schoolPermitNo: "", //教育部门办学许可证号
        marketRegulationNo: "", //市场监管部门注册证号
        civilAffairsNo: "", //民政部门登记证号
        mohrssNo: "", //人社部门登记证号
        organizationPrincipal: "", //机构负责人
        principalPhone: "", //负责人电话
        filledName: "", //填报人
        filledPhone: "", //填报人电话
        teacherCount: null, //复学教职工总人数（人）
        negativeTeacherCount: null, //复学教职员工核酸检测阴性人数（人）
        stuCount: null, //复学学生人数（人）
        outStuCount: null, //来自境外、重点疫区学员人数（人）
        negativeOutStuCount: null, //来自境外、重点疫区学生核酸检测阴性人数（人）
        startDate: "", //申请复学时间（月日）
        readyDate: "", //机构自查完成时间（月日）
        acceptanceDate: "", //计划镇区专班验收时间（月日）
        submitDate: "", //计划报送市专班时间（月日）
        checka: "", //
        checkb: "", //
        checkc: "", //
        checkd: "", //
        checke: "", //
        checkf: "", //
        checkg: "", //
        checkh: "", //
        checki: "", //
        checkj: "", //
        checkk: "", //
        checkl: "", //
        checkm: "", //
        checkm: "", //
        checkn: "", //
        checko: "", //
        checkp: "", //
        protocol: "" //本机构已知晓并承诺（1是，0否）
      },
      ruleValidate: {
        organizationTown: [
          {
            required: true,
            message: "机构所在镇区不能为空",
            trigger: "blur",
            trigger: "change"
          }
        ],
        organizationName: [
          {
            required: true,
            message: "机构名称不能为空",
            trigger: "blur",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "详细地址不能为空",
            trigger: "blur",
            trigger: "change"
          }
        ],
        organizationPrincipal: [
          {
            required: true,
            message: "机构负责人不能为空",
            trigger: "blur",
            trigger: "change"
          }
        ],
        principalPhone: [
          { required: true, message: "负责人电话不能为空", trigger: "blur" },
          {
            type: "number",
            required: true,
            message: "请填写正确的手机号",
            trigger: "blur",
            trigger: "change",
            transform(value) {
              var myreg = /^[1][0-9]{10}$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            }
          }
        ],
        filledName: [
          { required: true, message: "填报人不能为空", trigger: "blur" }
        ],
        filledPhone: [
          { required: true, message: "填报人电话不能为空", trigger: "blur" }
        ],

        teacherCount: [
          {
            required: true,
            message: "复学教职工总人数不能为空",
            trigger: "blur",
            type: "number"
          }
        ],
        negativeTeacherCount: [
          {
            required: true,
            message: "复学教职员工核酸检测阴性人数不能为空",
            trigger: "blur",
            type: "number"
          }
        ],
        stuCount: [
          {
            required: true,
            message: "复学学生人数不能为空",
            trigger: "blur",
            type: "number"
          }
        ],
        outStuCount: [
          {
            required: true,
            message: "来自境外、重点疫区学员人数不能为空",
            trigger: "blur",
            type: "number"
          }
        ],
        negativeOutStuCount: [
          {
            required: true,
            message: "来自境外、重点疫区学生核酸检测阴性人数不能为空",
            trigger: "blur",
            type: "number"
          }
        ],
        startDate: [
          { required: true, message: "申请复学时间不能为空", trigger: "blur" }
        ],
        readyDate: [
          {
            required: true,
            message: "机构自查完成时间不能为空",
            trigger: "blur"
          }
        ],
        acceptanceDate: [
          {
            required: true,
            message: "计划镇区专班验收时间不能为空",
            trigger: "blur"
          }
        ],
        submitDate: [
          {
            required: true,
            message: "计划报送市专班时间不能为空",
            trigger: "blur"
          }
        ],
        eligible: [
          {
            required: true,
            message: "机构自查是否符合复学条件不能为空",
            trigger: "change",
            type: "number"
          }
        ],
        protocol: [
          {
            required: true,
            message: "本机构已知晓并承诺必选",
            trigger: "change",
            type: "number"
          }
        ]
      },
      columns: [
        {
          title: "名称",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: ""
              },
              on: {
                input: val => {
                  this.form.supplies[params.index].name = val;
                }
              }
            });
          }
        },
        {
          title: "单位",
          key: "unit",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: ""
              },
              on: {
                input: val => {
                  this.form.supplies[params.index].unit = val;
                }
              }
            });
          }
        },
        {
          title: "数量",
          key: "number",
          render: (h, params) => {
            return h("Input", {
              props: {
                value: "",
                type: "number"
              },
              on: {
                input: val => {
                  this.form.supplies[params.index].number = val;
                }
              }
            });
          }
        }
      ]
    };
  },
  created() {
    this.userId = JSON.parse(sessionStorage.getItem("userInfo")).id;
    this.getOrgList();
  },
  methods: {
    getOrgList() {
      orgList({ principalId: this.userId, type: "EDUCATION" }).then(res => {
        if (res.code == 200) {
          this.orgList = res.result;
        }
      });
    },
    selectOrganization(val) {
      this.orgList.forEach(item => {
        if (item.id == val) {
          this.form.organizationPrincipal = item.principalName;
          this.form.principalPhone = item.principalMobile;
          this.form.organizationTown = item.area;
          this.form.address = item.areaDetail;
          this.form.organizationName = item.orgName;
        }
      });
    },
    selectDate1(v) {
      this.form.startDate = v;
    },
    selectDate2(v) {
      this.form.readyDate = v;
    },
    selectDate3(v) {
      this.form.acceptanceDate = v;
    },
    selectDate4(v) {
      this.form.submitDate = v;
    },
    deletItem() {
      //删除行
      if (this.form.supplies.length === 1) return;
      this.form.supplies.pop();
    },
    addItem() {
      //添加行
      let obj = {
        id: this.form.supplies.length + 1,
        name: "", //名称
        unit: "", //单位
        number: "" //数量
      };
      this.form.supplies.push(obj);
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        this.form.supplies.forEach(item => {
          item.number = item.number * 1;
        });

        if (valid) {
          let obj = JSON.stringify(this.form);
          applySubmit(obj).then(res => {
            if (res.code === 200) {
              this.$Message.success("新增复学审批成功");
              this.goBack();
            }
          });
        }
      });
    },
    goBack() {
      this.$router.push({ name: "goBackList" });
    }
  }
};
</script>
<style lang="scss" scoped>
.add {
  padding: 16px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    .title {
      color: #2d8cf0;
      font-weight: bold;
      line-height: 32px;
    }
  }
  .form {
    height: calc(100vh - 300px);
    overflow: auto;
    padding: 0 20px;
  }
  .button-ground {
    text-align: center;
  }
}
</style>