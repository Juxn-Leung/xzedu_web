<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-05-23 14:14:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-05-30 23:11:17
-->

<template>
  <div class="container Oxford-blue">
    <div class="tab_panel">
      <div class="tab_head">
        <Tabs :value="$router.currentRoute.name">
          <TabPane label="编辑认证信息" name="bianenteCertification"></TabPane>
        </Tabs>
      </div>

      <div class="tab_content" :style="`height:${tableHeight}px;`">
        <!--  -->
        <div class="yuan_first">
          <div class="yuan_lan">
            <!-- <Steps :current="current" :size="60">
            <Step class="blue" title="填写基本信息" style="width: 25%"> </Step>
            <Step class="blue" title="填写经营信息" style="width: 25%"> </Step>
          </Steps> -->
            <div
              class="yuan"
              :class="{
                tabsactive:
                  current == 0 || current == 1 || current == 2 || current == 3,
              }"
            >
              1
            </div>
            <div
              class="yuan_xian"
              :class="{
                tabsactivexian: current == 1 || current == 2 || current == 3,
              }"
            ></div>
            <div
              class="yuan"
              :class="{
                tabsactive: current == 1 || current == 2 || current == 3,
              }"
            >
              2
            </div>
            <div
              class="yuan_xian"
              :class="{ tabsactivexian: current == 2 || current == 3 }"
            ></div>
            <div
              class="yuan"
              :class="{ tabsactive: current == 2 || current == 3 }"
            >
              3
            </div>
            <div
              class="yuan_xian"
              :class="{ tabsactivexian: current == 3 }"
            ></div>
            <div class="yuan" :class="{ tabsactive: current == 3 }">4</div>
            <div class="yuan_title">
              <div class="tit1">填写主体信息</div>
              <div
                class="tit2x"
                :class="{
                  tabsactiveti: current == 1 || current == 2 || current == 3,
                }"
              >
                填写法人/举办人信息
              </div>
              <div
                class="tit3x"
                :class="{ tabsactiveti: current == 2 || current == 3 }"
              >
                填写经营信息
              </div>
              <div class="tit3" :class="{ tabsactiveti: current == 3 }">
                填写办学条件
              </div>
            </div>
          </div>
        </div>

        <div v-show="current === 0">
          <div class="information">
            <div class="title">
              <p>主体信息</p>
            </div>

            <Form
              ref="formData1"
              :model="formData1"
              :rules="ruleValidate"
              :label-width="180"
              style="width: 100%"
            >
              <div class="taba">
                <FormItem label="机构名称:" prop="trainOrgname">
                  <Input
                    :disabled="shu"
                    v-model="formData1.trainOrgname"
                    placeholder="请输入机构名称"
                  ></Input>
                </FormItem>

                <FormItem label="机构联系电话:" prop="trainOrgmobile">
                  <Input
                    :disabled="shu"
                    v-model="formData1.trainOrgmobile"
                    placeholder="请输入机构联系电话"
                  ></Input>
                </FormItem>

                <!-- <FormItem label="联系电话:" prop="principalMobile">
                  <Input
                    v-model="formData1.principalMobile"
                    placeholder="请输入联系电话"
                  ></Input>
                </FormItem> -->

                <FormItem label="机构所在地址:" prop="areaIdx">
                  <Cascader
                    :disabled="shu"
                    @on-visible-change="clickArea"
                    ref="cascader"
                    :data="addressData"
                    :value="formData1.areaIdx"
                    @on-change="changeArea"
                    :load-data="loadData"
                    transfer
                  ></Cascader>
                </FormItem>

                <FormItem>
                  <Input
                    :disabled="shu"
                    v-model="formData1.businessAddress"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10 }"
                    placeholder="请填写详细地址"
                  ></Input>
                </FormItem>

                <FormItem label="登记单位:" prop="areaIdx2">
                  <Cascader
                    @on-visible-change="clickArea2"
                    ref="cascader"
                    :data="addressData2"
                    :value="formData1.areaIdx2"
                    @on-change="changeArea2"
                    :load-data="loadData2"
                    transfer
                  ></Cascader>
                </FormItem>

                <FormItem label="设立时间:" prop="createTime">
                  <DatePicker
                    type="date"
                    format="yyyy年MM月dd日"
                    placeholder="请选择"
                    v-model="formData1.createTime"
                    :value="formData1.createTime"
                    @on-change="changeDate"
                  ></DatePicker>
                </FormItem>

                <FormItem label="统一社会信用代码:" prop="uscCode">
                  <Input
                    :disabled="shu"
                    v-model="formData1.uscCode"
                    placeholder="请输入统一社会信用代码"
                  ></Input>
                </FormItem>

                <h5 style="color: #7aa8ff">
                  请输入15位登记证书号或18位的统一社会信用代码
                </h5>

                <FormItem label="营业执照:">
                  <div
                    class="demo-upload-list2"
                    v-for="(item, index) in avatarList2"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="shu == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove2(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon2(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    :disabled="shu"
                    v-if="avatarList2.length < 1"
                    ref="upload"
                    :on-success="handleSuccess2"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError2"
                    :on-exceeded-size="handleMaxSize2"
                    :before-upload="avatarUpload2"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 185px"
                  >
                    <div class="tjban">
                      <img :src="tj" class="tj" />
                      <div class="title_img">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible2">
                    <img :src="eyeUrl" v-if="visible2" style="width: 100%" />
                  </Modal>

                  <p class="tp" :class="{ tpactive: tipg == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>

                <FormItem label="办学许可证号编号:">
                  <Input
                    :disabled="shu"
                    v-model="formData1.srlNo"
                    placeholder="请输入办学许可证号编号"
                  ></Input>
                </FormItem>

                <FormItem label="办学许可证照:">
                  <div
                    class="demo-upload-list3"
                    v-for="(item, index) in avatarList3"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="shu == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove3(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon3(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    :disabled="shu"
                    v-if="avatarList3.length < 1"
                    ref="upload"
                    :on-success="handleSuccess3"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError3"
                    :on-exceeded-size="handleMaxSize3"
                    :before-upload="avatarUpload3"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 233px"
                  >
                    <div class="tjban3">
                      <img :src="tj" class="tj3" />
                      <div class="title_img3">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible3">
                    <img :src="eyeUrl" v-if="visible3" style="width: 100%" />
                  </Modal>

                  <p class="tp3" :class="{ tpactive3: tipg2 == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>

                <!-- <FormItem label="主营范围:">
                  <Input
                    v-model="formItem.scopeBusiness"
                    placeholder="请输入培训学科办学内容(如：数学、语文等)"
                  ></Input>
                </FormItem> -->
              </div>
            </Form>
          </div>
        </div>

        <div v-show="current === 1">
          <div class="information">
            <div class="title">
              <p>法人/举办人信息</p>
            </div>

            <Form
              ref="formData2"
              :model="formData2"
              :rules="ruleValidate2"
              :label-width="180"
              style="width: 100%"
            >
              <div class="taba">
                <FormItem label="举办人登记部门" prop="lprDepartment">
                  <Select v-model="formData2.lprDepartment" @on-change="lprDe">
                    <Option
                      v-for="item in lprDepts"
                      :value="item.id"
                      :key="item.name"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>

                <FormItem label="举办人姓名:" prop="organizer">
                  <Input
                    v-model="formData2.organizer"
                    placeholder="请输入举办人姓名"
                  ></Input>
                </FormItem>

                <FormItem label="举办人身份证号码:" prop="organizerIdentityId">
                  <Input
                    v-model="formData2.organizerIdentityId"
                    placeholder="请输入举办人身份证号码"
                  ></Input>
                </FormItem>

                <FormItem label="举办人电话:" prop="organizerMobile">
                  <Input
                    v-model="formData2.organizerMobile"
                    placeholder="请输入举办人电话"
                  ></Input>
                </FormItem>

                <!--   //步骤2举办人信息图片上传-->
                <FormItem label="举办人身份证照:" prop="img">
                  <div
                    class="demo-upload-list3"
                    v-for="(item, index) in avatarList2x"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="disabled2x == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove2x(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon2x(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    v-if="avatarList2x.length < 1"
                    ref="upload"
                    :on-success="handleSuccess2x"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError2x"
                    :on-exceeded-size="handleMaxSize2x"
                    :before-upload="avatarUpload2x"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 233px"
                  >
                    <div class="tjban3">
                      <img :src="tj" class="tj3" />
                      <div class="title_img3">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible2x">
                    <img :src="eyeUrl" v-if="visible2x" style="width: 100%" />
                  </Modal>

                  <p class="tp3" :class="{ tpactive3: tipgx == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>

                <FormItem>
                  <div
                    class="demo-upload-list3"
                    v-for="(item, index) in avatarList1x"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="disabled1x == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove1x(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon1x(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    v-if="avatarList1x.length < 1"
                    ref="upload"
                    :on-success="handleSuccess1x"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError1x"
                    :on-exceeded-size="handleMaxSize1x"
                    :before-upload="avatarUpload1x"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 233px"
                  >
                    <div class="tjban3">
                      <img :src="tj" class="tj3" />
                      <div class="title_img3">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible1x">
                    <img :src="eyeUrl" v-if="visible1x" style="width: 100%" />
                  </Modal>

                  <p class="tp3" :class="{ tpactive3: tipg1x == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>

                <FormItem>
                  <div
                    class="demo-upload-list3"
                    v-for="(item, index) in avatarList3x"
                    :key="index"
                  >
                    <template v-if="item !== ''">
                      <img :src="item" />
                      <Icon
                        v-if="disabled3x == false"
                        class="removeIcon"
                        type="ios-close-circle"
                        @click="avatarRemove3x(item)"
                      />
                      <Icon
                        class="eyeIcon"
                        type="ios-eye-outline"
                        @click.native="eyeIcon3x(item)"
                      ></Icon>
                    </template>
                  </div>
                  <Upload
                    v-if="avatarList3x.length < 1"
                    ref="upload"
                    :on-success="handleSuccess3x"
                    :format="['jpg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError3x"
                    :on-exceeded-size="handleMaxSize3x"
                    :before-upload="avatarUpload3x"
                    multiple
                    type="drag"
                    action
                    style="display: inline-block; width: 233px"
                  >
                    <div class="tjban3">
                      <img :src="tj" class="tj3" />
                      <div class="title_img3">点击上传</div>
                    </div>
                  </Upload>
                  <Modal title="查看" :closable="false" v-model="visible3x">
                    <img :src="eyeUrl" v-if="visible3x" style="width: 100%" />
                  </Modal>

                  <p class="tp3" :class="{ tpactive3: tipg2x == true }">
                    <a
                      >请注意保持清晰各项描述可见，且申请时间在有效范围时间之内</a
                    >
                    <a
                      >文件小于20M，支持jpg、gif、png或bmp格式的图片支持jpg、jpeg、bmp、gif、png格式照片，大小不超过5M</a
                    >
                  </p>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>

        <div v-show="current === 2">
          <div class="information">
            <div class="title">
              <p>经营信息</p>
            </div>

            <Form
              ref="formData3"
              :model="formData3"
              :rules="ruleValidate3"
              :label-width="180"
              style="width: 100%"
            >
              <div class="taba">
                <FormItem
                  label="培训类别"
                  style="width: 855px"
                  prop="orgTraintype"
                >
                  <CheckboxGroup v-model="formData3.orgTraintype">
                    <Checkbox
                      v-for="item in questionTypes"
                      :label="item.id"
                      :key="item.id"
                      ref="checkboxGroup"
                    >
                      <span>{{ item.name }}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <div class="duan">(可多选)</div>
                <FormItem label="培训内容:">
                  <Input
                    v-model="formData3.orgTraincontent"
                    placeholder="请输入培训内容"
                  ></Input>
                </FormItem>

                <FormItem label="招生范围:" prop="enrollmentScope">
                  <Select
                    v-model="formData3.enrollmentScope"
                    @on-change="entScope"
                  >
                    <Option
                      v-for="item in enrollmentScopes"
                      :value="item.id"
                      :key="item.name"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>

                <FormItem label="培训学科:">
                  <Input
                    v-model="formData3.pmSchoolSubject"
                    placeholder="请输入培训学科"
                  ></Input>
                </FormItem>

                <FormItem label="招生对象:">
                  <Input
                    v-model="formData3.enrollmentTarget"
                    placeholder="请输入招生对象"
                  ></Input>
                </FormItem>

                <FormItem
                  label="培训形式"
                  style="width: 855px"
                  prop="pmSchoolType"
                >
                  <CheckboxGroup v-model="formData3.pmSchoolType">
                    <Checkbox
                      v-for="item in trainForms"
                      :label="item.id"
                      :key="item.id"
                      ref="checkboxGroup"
                    >
                      <span>{{ item.name }}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <div class="duan">(可多选)</div>
              </div>
            </Form>
          </div>
        </div>

        <div v-show="current === 3">
          <div class="information">
            <div class="title">
              <p>办学条件</p>
            </div>

            <Form
              ref="formData4"
              :model="formData4"
              :rules="ruleValidate4"
              :label-width="250"
              style="width: 100%"
            >
              <div class="taba">
                <FormItem label="场地性质:" prop="placeTypeId">
                  <Select v-model="formData4.placeTypeId" @on-change="eTypeI">
                    <Option
                      v-for="item in placeTypes"
                      :value="item.id"
                      :key="item.name"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>

                <FormItem label="建筑面积:">
                  <Input
                   type="number"
                    v-model="formData4.placeArea"
                    placeholder="请输入建筑面积"
                  ></Input>
                </FormItem>
                <div class="duanx">m2</div>
                <FormItem label="教职工数:" prop="staffNum">
                  <Input
                   type="number"
                    v-model="formData4.staffNum"
                    placeholder="请输入教职工数"
                  ></Input>
                </FormItem>

                <FormItem label="专职工数:">
                  <Input
                  type="number"
                    v-model="formData4.teacherNum"
                    placeholder="请输入专职工数"
                  ></Input>
                </FormItem>

                <FormItem label="外籍教师数:">
                  <Input
                   type="number"
                    v-model="formData4.fTeacherNum"
                    placeholder="请输入外籍教师数"
                  ></Input>
                </FormItem>

                <FormItem label="公办中小学在职教师数:">
                  <Input
                   type="number"
                    v-model="formData4.pTeacherNum"
                    placeholder="请输入公办中小学在职教师数"
                  ></Input>
                </FormItem>

                <FormItem
                  label="持教师资格证专业技能教师数:"
                  style="line-height: 30px"
                >
                  <Input
                   type="number"
                    v-model="formData4.cTeacherNum"
                    placeholder="请输入请输入持证教师数"
                  ></Input>
                </FormItem>

                <FormItem label="是否寄宿:" prop="ifBoard">
                  <!-- <CheckboxGroup v-model="formData4.ifBoard">
                    <Checkbox label="1">是</Checkbox>
                    <Checkbox label="0">否</Checkbox>
                  </CheckboxGroup> -->
                  <CheckboxGroup v-model="formData4.ifBoard">
                    <Checkbox
                      v-for="item in ifB"
                      :label="item.id"
                      :key="item.id"
                      ref="checkboxGroup"
                    >
                      <span>{{ item.name }}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem label="是否提供餐饮:">
                  <!-- <CheckboxGroup v-model="formData4.ifFood">
                    <Checkbox label="1">是</Checkbox>
                    <Checkbox label="0">否</Checkbox>
                  </CheckboxGroup> -->

                  <CheckboxGroup v-model="formData4.ifFood">
                    <Checkbox
                      v-for="item in ifF"
                      :label="item.id"
                      :key="item.id"
                      ref="checkboxGroup"
                    >
                      <span>{{ item.name }}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>

                <FormItem label="有无餐饮服务资格证:">
                  <CheckboxGroup v-model="formData4.ifCslicense">
                    <Checkbox
                      v-for="item in ifCslic"
                      :label="item.id"
                      :key="item.id"
                      ref="checkboxGroup"
                    >
                      <span>{{ item.name }}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>

        <div class="btn_foot">
          <div style="float: right">
            <Button
              style="
                margin-right: 24px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
              "
              @click="back"
              v-if="current === 0"
              >取消</Button
            >
            <Button
              style="
                margin-right: 24px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
              "
              @click="prev"
              v-if="current > 0"
              >上一步</Button
            >
            <Button
              style="
                float: right;
                margin-right: 37px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
                background: rgb(0, 86, 251);
              "
              type="primary"
              @click="next()"
              v-if="current < 3"
              >下一步</Button
            >
            <Button
              style="
                float: right;
                margin-right: 37px;
                width: 140px;
                border-radius: 4px;
                height: 50px;
                background: rgb(0, 86, 251);
              "
              type="primary"
              @click="handleSubmit('formData2')"
              v-if="current === 3"
              >确认提交</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getAddresslist,
  addCheckOrg,
  personalAuthenAdd,
  companyAutheUpdate,
  companyAuthenAdd,
  goAddCheckOrg,
  companyAuthenDetail,
  orgAttrs,
} from "@/api";
import { Debounce } from "../../libs/util";
import { dateFormat } from "@/utils/current";
import { uploadPic } from "../../libs/ali-oss";
import { compressImg } from "../../libs/compress";
export default {
  inject: ["reload"],
  data() {
    return {
      //步骤条
      current: 0,
      isEdit: "add",
      addlenght: 2,
      data: [],
      shu: false,
      loading: true,
      tableHeight: 0,
      modalTitle: "",
      modalStatus: false,
      addressData: [],
      questionTypes: [],
      lprDepts: [],
      trainForms: [],
      placeTypes: [],
      enrollmentScopes: [],
      ifCslic: [
        { id: 1, name: "是" },
        { id: 0, name: "否" },
      ],
      ifF: [
        { id: 1, name: "是" },
        { id: 0, name: "否" },
      ],
      ifB: [
        { id: 1, name: "是" },
        { id: 0, name: "否" },
      ],
      head: require("@/assets/login/head.png"),
      tj: require("@/assets/login/tj.png"),
      //   上传图片相关
      addressData2: [],
      imgName: "",
      visible: false,
      disabled: false,
      avatarList1: [],
      avatarList1x: [],
      visible2: false,
      visible2x: false,
      disabled2: false,
      disabled2x: false,
      disabled1: false,
      disabled1x: false,
      avatarList2: [],
      avatarList2x: [],
      visible3: false,
      visible3x: false,
      visible1: false,
      visible1x: false,
      disabled3: false,
      disabled3x: false,
      tipg2: false,
      tipg2x: false,
      tipg: false,
      tipgx: false,
      tipg1: false,
      tipg1x: false,
      avatarList3: [],
      avatarList3x: [],
      formItem: {
        orgName: "",
        branchName: "",
        branchMobile: "",
        areaIdx: [],
        orgAddress: "",
        marketRegisterNo: "",
        permissionNo: "",
        scopeBusiness: "",

        businessImgUrl: "",
        educationImgUrl: "",
      },
      formData2: {
        organizer: "",
        organizerIdentityId: "",
        organizerMobile: "",
        identityInHoldImg: "",
        identityNationalEmblemImg: "",
        identityFaceImg: "",
        lprDepartment: "",
      },
      formData1: {
        trainOrgname: "",
        trainOrgmobile: "",
        principalMobile: "",
        createTime: "",
        uscCode: "",
        srlNo: "",
        areaIdx: [],
        areaIdx2: [],
      },
      formData3: {
        orgTraincontent: "",
        orgTraintype: [],
        enrollmentScope: "",
        pmSchoolSubject: "",
        enrollmentTarget: "",
        pmSchoolType: [],
      },
      formData4: {
        placeTypeId: "",
        ifBoard: [],
        placeArea: "",
        staffNum: "",
        teacherNum: "",
        fTeacherNum: "",
        pTeacherNum: "",
        cTeacherNum: "",
        ifFood: [],
        ifCslicense: [],
      },
      tableHeight: null,
      ruleValidate: {
        trainOrgname: [
          {
            required: true,
            message: "请输入机构名称",
            trigger: "blur",
          },
        ],

        trainOrgmobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],

        areaIdx: [
          {
            required: true,
            message: "请选择地区",
            trigger: "change",
            type: "array",
          },
        ],

        businessAddress: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: "blur",
          },
        ],

        areaIdx2: [
          {
            required: true,
            message: "请选择地区",
            trigger: "change",
            type: "array",
          },
        ],

        createTime: [
          {
            required: true,
            type: "date",
            message: "请选择时间",
            trigger: "change",
          },
        ],
        uscCode: [
          {
            required: true,
            message: "请输统一社会信用代码",
            trigger: "blur",
          },
        ],
      },

      ruleValidate2: {
        organizer: [
          {
            required: true,
            message: "请输入举办人姓名",
            trigger: "blur",
          },
        ],
        organizerIdentityId: [
          {
            required: true,
            message: "请输入举办人身份证号码",
            trigger: "blur",
          },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "你的身份证格式不正确",
          },
        ],
        organizerMobile: [
          { required: true, message: "请输入举办人电话", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],

        lprDepartment: [
          {
            required: true,
            message: "请选择举办人登记部门",
            trigger: "change",
            type: "number",
          },
        ],
      },

      ruleValidate3: {
        principalName: [
          {
            required: true,
            message: "请输入机构名称",
            trigger: "blur",
          },
        ],

        orgTraintype: [
          {
            required: true,
            type: "array",
            message: "请选择培训类别",
            trigger: "change",
          },
        ],

        enrollmentScope: [
          {
            required: true,
            message: "请选择招生范围",
            trigger: "change",
            type: "number",
          },
        ],
        pmSchoolType: [
          {
            required: true,
            type: "array",
            message: "请选择培训形式",
            trigger: "change",
          },
        ],
      },

      ruleValidate4: {
        staffNum: [
          {
            required: true,
            message: "请输入教职工数",
            trigger: "blur",
          },
        ],
        ifBoard: [
          {
            required: true,
            type: "array",
            message: "请选择是否寄宿",
            trigger: "change",
          },
        ],
        placeTypeId: [
          {
            required: true,
            message: "请选择场地性质",
            trigger: "change",
            type: "number",
          },
        ],
      },
    };
  },
  created() {
    this.goAddCheckOrg();
    this.orgAttrs();
  },
  mounted() {
    this.init();
    this.getAddresslist(); //地址接口
    this.getAddresslist2();
    this.examineBtn();
    this.handleEdit();
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
    lprDe(e) {
      console.log(e);
      this.formData2.lprDepartment = e;
    },
    entScope(e) {
      console.log(e);
      this.formData3.enrollmentScope = e;
    },
    eTypeI(e) {
      console.log(e);
      this.formData4.placeTypeId = e;
    },
    checkAllGroupChange(data1, data2) {
      console.log(data1);
      console.log(data2);
    },
    orgAttrs() {
      orgAttrs().then((res) => {
        if (res.code == 200) {
          console.log(res.result.trainTypes);
          this.questionTypes = res.result.trainTypes;
          this.lprDepts = res.result.lprDepts;
          this.trainForms = res.result.trainForms;
          this.placeTypes = res.result.placeTypes;
          this.enrollmentScopes = res.result.enrollmentScopes;
        }
      });
    },
    prev() {
      if (this.current > 0) {
        this.current--;
        document.querySelector(".yuan_first").scrollIntoView(true);
      }
    },
    // 下一步
    next() {
      if (this.current === 0) {
        this.$refs["formData1"].validate((valid) => {
          if (valid) {
            document.querySelector(".yuan_first").scrollIntoView(true);
            this.current++;
            // let objx = JSON.parse(JSON.stringify(this.formData1));
            // console.log(objx);
          }
        });
      } else if (this.current === 1) {
        this.$refs["formData2"].validate((valid) => {
          if (valid) {
            if (
              this.formData2.identityFaceImg !== "" &&
              this.formData2.identityNationalEmblemImg !== "" &&
              this.formData2.identityInHoldImg !== ""
            ) {
              document.querySelector(".yuan_first").scrollIntoView(true);
              this.current++;
            } else {
              this.$Message.error({
                top: 300,
                closable: true,
                duration: 3,
                content: "请上传完身份信息!",
              });
            }
          }
        });
      } else if (this.current === 2) {
        this.$refs["formData3"].validate((valid) => {
          if (valid) {
            this.current++;
            document.querySelector(".yuan_first").scrollIntoView(true);
          }
        });
      }
      // else if (this.current === 3) {
      //   this.$refs['formData4'].validate(valid => {
      //     if (valid) {
      //       this.handleSubmit()
      //     }
      //   })
      // }
    },

    // 上一步
    back() {
      this.$router.push({
        name: "accrInstitution",
        query: {},
      });
    },
    changeDate(e) {
      console.log(e);
      let date = e.replace(/([^\u0000-\u00FF])/g, "-");
      date = date.substring(0, date.length - 1);
      console.log(date);
      this.formData1.createTime = date;
      this.time = date;
    },

    goAddCheckOrg() {
      goAddCheckOrg().then((res) => {
        if (res.code == 200) {
          console.log(res.result);
        }
      });
    },

    addceshi() {
      // console.log("ccc");

      this.modalsure = false;
    },

    getTownshipList(s_id, z_id) {
      let level = 1;
      let addressData = {};
      getAddresslist({
        level: level,
      }).then((res) => {
        addressData = res.result;
        let newList = [];
        addressData.forEach((item) => {
          if (item.id == s_id) {
            newList = item;
            newList.children = [];
            newList.loading = false;
          }
        });
        addressData = newList;
        let newList2 = [];
        getAddresslist({
          pid: s_id,
        }).then((res) => {
          res.result.forEach((item) => {
            if (item.id == z_id) {
              newList2 = item;
              newList2.children = [];
              newList2.loading = false;
            }
          });
          getAddresslist({
            pid: z_id,
          }).then((res) => {
            newList2.children = res.result;

            addressData.children.push(newList2);
            console.log(addressData);
            this.addressData.push(addressData);
          });
        });
      });
    },

    clickAreaSearch(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        let s_id = this.data.s_id;
        let z_id = this.data.z_id;
        this.getTownshipList(s_id, z_id);
      }
    },

    examineBtn() {},

    changeAreaSearch(v, item) {
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaId = [];
      v.map((val) => {
        areaId.push(val * 1);
      });
      console.log(areaId);
      this.area = area;
      this.areaId = areaId;

      if (areaId.length == 3) {
        // this.searchForm.provinceId = areaId[0];
        // this.searchForm.cityId = areaId[1];
        // this.searchForm.areaId = areaId[2];
      } else {
        // this.searchForm.provinceId = 0;
        // this.searchForm.cityId = 0;
        // this.searchForm.areaId = 0;
      }
    },
    changeArea(v, item) {
      console.log(item);
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaIdx = [];
      v.map((val) => {
        areaIdx.push(val * 1);
      });
      this.formData1.area = area;
      this.formData1.areaIdx = areaIdx;
      this.formData1.myArea = areaIdx[2];
      this.formData1.myCity = areaIdx[1];
      this.formData1.myProvince = areaIdx[0];
      console.log(this.formData1.myCity);
      console.log(this.formData1.areaIdx[0]);
    },

    changeArea2(v, item) {
      console.log(item);
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaIdx2 = [];
      v.map((val) => {
        areaIdx2.push(val * 1);
      });
      this.formData1.area = area;
      this.formData1.areaIdx2 = areaIdx2;
      this.formData1.regAreaId = areaIdx2[2];
      this.formData1.regCityId = areaIdx2[1];
      this.formData1.regProvinceId = areaIdx2[0];
      console.log(this.formData1.regCityId);
      // console.log(this.formData2.areaIdx[0]);
    },
    changeCascader(v, item) {
      // console.log(e);
      let area = [];
      item.map((val) => {
        area.push(val.label);
      });
      let areaId = [];
      v.map((val) => {
        areaId.push(val * 1);
      });
      console.log(areaId);
      this.area = area;
      this.areaId = areaId;

      // this.searchForm.provinceId = e[0];
      // this.searchForm.cityId = e[1];
      // this.searchForm.areaId = e[2];
    },

    loadDataSearch(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
        if (res.code == 200) {
          item.loading = false;
          item.children = res.result;
          if (item.level < 2) {
            item.children.forEach((it) => {
              it.loading = false;
              it.children = [];
            });
          }
          callback();
        }
      });
    },

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
      this.tableHeight = pageHeight - 90;
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
          let obj = this.formData4;
          let objx = JSON.parse(JSON.stringify(this.formData1));
          console.log(this.$route.query.ID);
          console.log(obj);
          console.log(objx);
          obj.id = this.$route.query.id;
          obj.trainOrgname = this.formData1.trainOrgname;
          obj.trainOrgmobile = this.formData1.trainOrgmobile;
          obj.trainOrgmobile = this.formData1.trainOrgmobile;
          obj.checkOrgId = this.$route.query.checkOrgId;
          obj.myArea = this.formData1.myArea;
          obj.myCity = this.formData1.myCity;
          obj.myProvince = this.formData1.myProvince;
          obj.businessAddress = this.formData1.businessAddress;
          obj.createTime = this.time;
          obj.uscCode = this.formData1.uscCode;
          obj.regAreaId = this.formData1.regAreaId;
          obj.regCityId = this.formData1.regCityId;
          obj.regProvinceId = this.formData1.regProvinceId;
          obj.uscCodeImg = this.formData1.uscCodeImg;
          obj.srlNoImg = this.formData1.srlNoImg;
          obj.srlNo = this.formData1.srlNo;
          //2
          obj.lprDepartment = this.formData2.lprDepartment;
          obj.organizer = this.formData2.organizer;
          obj.organizerIdentityId = this.formData2.organizerIdentityId;
          obj.organizerMobile = this.formData2.organizerMobile;
          obj.identityFaceImg = this.formData2.identityFaceImg;
          obj.identityInHoldImg = this.formData2.identityInHoldImg;
          obj.identityNationalEmblemImg = this.formData2.identityNationalEmblemImg;

          //3
          obj.orgTraintype = this.formData3.orgTraintype;
          obj.orgTraincontent = this.formData3.orgTraincontent;
          obj.enrollmentScope = this.formData3.enrollmentScope;
          obj.pmSchoolSubject = this.formData3.pmSchoolSubject;
          obj.enrollmentTarget = this.formData3.enrollmentTarget;
          obj.pmSchoolType = this.formData3.pmSchoolType;

          //4

          console.log(this.formData1);
          companyAutheUpdate(obj).then((res) => {
            console.log(res.result);
            if (res.code == 200) {
              // this.$Message.success({
              //   top: 300,
              //   closable: true,
              //   duration: 3,
              //   content: "新增机构成功!",
              // });
              this.$router.push({
                name: "accrInstitution",
                query: {},
              });
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    // 获取省份
    getAddresslist(id, i, arr) {
      if (this.isEdit == "add") {
        getAddresslist({
          level: 1,
        }).then((res) => {
          this.addressData = res.result;
          this.addressDataSearch = res.result;
          this.addressData.forEach((item) => {
            item.children = [];
            item.loading = false;
          });
        });
      } else if (this.isEdit == "edit") {
        return getAddresslist({
          pid: id,
        }).then((res) => {
          if (i == 0) {
            this.addressData.forEach((item) => {
              if (item.id == id) {
                item.children = res.result;
                item.loading = false;
              } else {
                item.children = [];
                item.loading = false;
              }
            });
          } else if (i == 1) {
            this.addressData.forEach((item) => {
              if (item.id == arr[i - 1]) {
                item.children.forEach((it) => {
                  if (it.id == id) {
                    it.children = res.result;
                    it.loading = false;
                    console.log(it.name, it.children);
                  } else {
                    it.children = [];
                    it.loading = false;
                  }
                });
              }
            });
          }
        });
      }
    },

    // 获取省份2
    getAddresslist2(id, i, arr2) {
      if (this.isEdit == "add") {
        getAddresslist({
          level: 1,
        }).then((res) => {
          this.addressData2 = res.result;
          this.addressDataSearch = res.result;
          this.addressData2.forEach((item) => {
            item.children = [];
            item.loading = false;
          });
        });
      } else if (this.isEdit == "edit") {
        return getAddresslist({
          pid: id,
        }).then((res) => {
          if (i == 0) {
            this.addressData2.forEach((item) => {
              if (item.id == id) {
                item.children = res.result;
                item.loading = false;
              } else {
                item.children = [];
                item.loading = false;
              }
            });
          } else if (i == 1) {
            this.addressData2.forEach((item) => {
              if (item.id == arr2[i - 1]) {
                item.children.forEach((it) => {
                  if (it.id == id) {
                    it.children = res.result;
                    it.loading = false;
                    console.log(it.name, it.children);
                  } else {
                    it.children = [];
                    it.loading = false;
                  }
                });
              }
            });
          }
        });
      }
    },

    clickArea(val) {
      console.log(val, this.addressData, "点击了");
      if (val && !this.addressData[0]) {
        this.getAddresslist();
      }
    },

    clickArea2(val) {
      console.log(val, this.addressData2, "点击了");
      if (val && !this.addressData2[0]) {
        this.getAddresslist2();
      }
    },

    //数据--通用地址
    async regroupAddress(arr) {
      let typex = JSON.parse(sessionStorage.getItem("userInfo")).type;
      if (typex !== "EDUCATIONPRINCIPAL") {
        for (let i = 0, len = arr.length; i < len; i++) {
          await this.getAddresslist(arr[i], i, arr);
        }
      }

      let ar = [];
      arr.forEach((item) => {
        ar.push(item * 1);
      });
      this.formData1.areaIdx = ar;
    },

    async regroupAddress2(arr2) {
      let typex = JSON.parse(sessionStorage.getItem("userInfo")).type;
      if (typex !== "EDUCATIONPRINCIPAL") {
        for (let i = 0, len = arr2.length; i < len; i++) {
          await this.getAddresslist2(arr2[i], i, arr2);
        }
      }

      let ar2 = [];
      arr2.forEach((item) => {
        ar2.push(item * 1);
      });
      this.formData1.areaIdx2 = ar2;
    },
    handleEdit() {
      this.type = this.$route.query.id;

      this.id = this.$route.query.id;

      let objc = {};
      objc.id = this.id;

      companyAuthenDetail(objc).then((res) => {
        console.log(res.result.areaId);
        this.formData1.trainOrgname = res.result.trainOrgname;
        this.formData1.trainOrgmobile = res.result.trainOrgmobile;
        this.formData1.businessAddress = res.result.businessAddress;
        this.formData1.createTime = res.result.createTime;
        this.time = res.result.createTime;
        this.formData1.uscCode = res.result.uscCode;
        console.log("地区" + res.result.regArea[2]);
        this.shu = true;
        let addId_list = [];
        addId_list = res.result.myArea.split(",");
        let id0 = addId_list[0];
        let id1 = addId_list[1];
        let id2 = addId_list[2];
        this.formData1.myArea = id0;
        this.formData1.myCity = id1;
        this.formData1.myProvince = id2;
        let addId_list2 = [];
        addId_list2 = res.result.regArea.split(",");
        let id0x = addId_list2[0];
        let id1x = addId_list2[1];
        let id2x = addId_list2[2];
        this.formData1.regAreaId = id0x;
        this.formData1.regCityId = id1x;
        this.formData1.regProvinceId = id2x;
        let arr = res.result.myArea.split(",");
        let arr2 = res.result.regArea.split(",");
        this.regroupAddress(arr);
        this.regroupAddress2(arr2);

        this.formData1.srlNo = res.result.srlNo;
        if (res.result.uscCodeImg !== "") {
          this.tipg = true;
          this.formData1.uscCodeImg = res.result.uscCodeImg;
          this.avatarList2.push(res.result.uscCodeImg);
        }

        if (res.result.srlNoImg !== "") {
          this.tipg2 = true;
          this.formData1.srlNoImg = res.result.srlNoImg;
          this.avatarList3.push(res.result.srlNoImg);
        }

        //2
        this.formData2.lprDepartment = res.result.lprDepartment;
        this.formData2.organizer = res.result.organizer;
        this.formData2.organizerIdentityId = res.result.organizerIdentityId;
        this.formData2.organizerMobile = res.result.organizerMobile;

        if (res.result.identityFaceImg !== "") {
          this.tipgx = true;
          this.formData2.identityFaceImg = res.result.identityFaceImg;
          this.avatarList2x.push(res.result.identityFaceImg);
        }

        if (res.result.identityInHoldImg !== "") {
          this.tipg2x = true;
          this.formData2.identityInHoldImg = res.result.identityInHoldImg;
          this.avatarList3x.push(res.result.identityInHoldImg);
        }

        if (res.result.identityNationalEmblemImg !== "") {
          this.tipg1x = true;
          this.formData2.identityNationalEmblemImg =
            res.result.identityNationalEmblemImg;
          this.avatarList1x.push(res.result.identityNationalEmblemImg);
        }
        //3
        this.formData3.orgTraintype = res.result.orgTraintype;
        this.formData3.orgTraincontent = res.result.orgTraincontent;
        this.formData3.enrollmentScope = res.result.enrollmentScope;
        this.formData3.pmSchoolSubject = res.result.pmSchoolSubject;
        this.formData3.enrollmentTarget = res.result.enrollmentTarget;
        this.formData3.pmSchoolType = res.result.pmSchoolType;

        //4
        this.formData4.placeTypeId = res.result.placeTypeId;
        this.formData4.placeArea = res.result.placeArea;
        this.formData4.staffNum = res.result.staffNum;
        this.formData4.teacherNum = res.result.teacherNum;
        this.formData4.fTeacherNum = res.result.fteacherNum;
        this.formData4.pTeacherNum = res.result.pteacherNum;
        this.formData4.cTeacherNum = res.result.cteacherNum;
        this.formData4.ifBoard = res.result.ifBoard;
        this.formData4.ifFood = res.result.ifFood;
        this.formData4.ifCslicense = res.result.ifCslicense;

        console.log(arr);
        console.log(arr2);
      });

      this.isEdit = "edit";
      this.modalStatus = true;
      // this.$refs["formItem"].resetFields();
    },

    loadData(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
        if (res.code == 200) {
          item.loading = false;
          item.children = res.result;
          if (item.level < 2) {
            item.children.forEach((it) => {
              it.loading = false;
              it.children = [];
            });
          }
          callback();
        }
      });
    },

    loadData2(item, callback) {
      item.loading = true;
      getAddresslist({
        pid: item.id,
      }).then((res) => {
        if (res.code == 200) {
          item.loading = false;
          item.children = res.result;
          if (item.level < 2) {
            item.children.forEach((it) => {
              it.loading = false;
              it.children = [];
            });
          }
          callback();
        }
      });
    },

    // 上传图片相关
    eyeIcon2(item) {
      this.eyeUrl = item;
      this.visible2 = true;
    },
    handleRemove2(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess2(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError2(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize2(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove2(e) {
      let list = this.avatarList2;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList2 = list;
      this.tipg = false;
    },

    // LOGO图片上传
    avatarUpload2(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList2;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList2 = imgList;
              } else {
                this.avatarList2 = imgList;
              }
            }
            this.tipg = true;
            this.formData1.uscCodeImg = this.avatarList2;
            console.log(this.avatarList2);
          });
        }
      }
    },

    // 上传图片相关
    eyeIcon3(item) {
      this.eyeUrl = item;
      this.visible3 = true;
    },
    handleRemove3(file) {
      this.tipg = false;
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess3(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError3(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize3(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove3(e) {
      let list = this.avatarList3;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList3 = list;
      this.tipg2 = false;
    },

    // LOGO图片上传
    avatarUpload3(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList3;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList3 = imgList;
              } else {
                this.avatarList3 = imgList;
              }
            }
            this.tipg2 = true;
            this.formData1.srlNoImg = this.avatarList3;
            console.log(this.avatarList3);
          });
        }
      }
    },

    // 上传图片相关
    eyeIcon1(item) {
      this.eyeUrl = item;
      this.visible1 = true;
    },
    handleRemove1(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess1(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError1(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize1(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove1(e) {
      let list = this.avatarList1;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList1 = list;
      this.tipg1 = false;
    },

    // LOGO图片上传
    avatarUpload1(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList1;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList1 = imgList;
              } else {
                this.avatarList1 = imgList;
              }
            }
            this.tipg1 = true;
            this.formData1.identityNationalEmblemImg = this.avatarList1;
            console.log(this.avatarList1);
          });
        }
      }
    },

    //步骤2举办人信息图片上传
    // 上传图片相关
    eyeIcon2x(item) {
      this.eyeUrl = item;
      this.visible2x = true;
    },
    handleRemove2(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess2x(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError2x(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize2x(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove2x(e) {
      let list = this.avatarList2;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList2x = list;
      this.tipgx = false;
    },

    // LOGO图片上传
    avatarUpload2x(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList2x;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList2x = imgList;
              } else {
                this.avatarList2x = imgList;
              }
            }
            this.tipgx = true;
            this.formData2.identityFaceImg = this.avatarList2x;
            console.log(this.avatarList2x);
          });
        }
      }
    },

    // 上传图片相关
    eyeIcon3x(item) {
      this.eyeUrl = item;
      this.visible3x = true;
    },
    handleRemove3x(file) {
      this.tipg = false;
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess3x(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError3x(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize3x(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove3x(e) {
      let list = this.avatarList3x;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList3x = list;
      this.tipg2x = false;
    },

    // LOGO图片上传
    avatarUpload3x(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList3x;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList3x = imgList;
              } else {
                this.avatarList3x = imgList;
              }
            }
            this.tipg2x = true;
            this.formData2.identityInHoldImg = this.avatarList3x;
            console.log(this.avatarList3x);
          });
        }
      }
    },

    // 上传图片相关
    eyeIcon1x(item) {
      this.eyeUrl = item;
      this.visible1x = true;
    },
    handleRemove1x(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess1x(res, file) {
      file.url = "";
      file.name = "";
    },
    handleFormatError1x(file) {
      this.$Notice.warning({
        title: "上传头像失败!",
        desc: "这张" + file.name + " 格式不正确, 请上传 jpg 或者 png格式!",
      });
      return false;
    },
    handleMaxSize1x(file) {
      this.$Notice.warning({
        title: "上传图片过大!",
        desc: "这张" + file.name + "过大, 上传小于2M的图片",
      });
    },

    avatarRemove1x(e) {
      let list = this.avatarList1x;
      let index = list.indexOf(e);
      if (index != -1) list.splice(index, 1);
      this.avatarList1x = list;
      this.tipg1x = false;
    },

    // LOGO图片上传
    avatarUpload1x(file) {
      console.log(file);

      if (file.type !== "") {
        if (file.size < 2060000) {
          let path = "data/teacher/";
          let imgList = this.avatarList1x;

          uploadPic(file, path).then((res) => {
            console.log(res);
            if (res.name !== "") {
              let newImg = "https://file.zahooedu.com/" + res.name;
              imgList.push(newImg);
              if (imgList.length !== 1) {
                this.$Message.success({
                  top: 300,
                  closable: true,
                  duration: 3,
                  content: "头像只能上传一张，超出1张默认选择最后一张!",
                });
                for (var i = 0; i < imgList.length - 1; i++) {
                  // 删除除了最后一个的图片地址
                  imgList.splice(0, 1);
                  console.log(imgList);
                }
                this.avatarList1x = imgList;
              } else {
                this.avatarList1x = imgList;
              }
            }
            this.tipg1x = true;
            this.formData2.identityNationalEmblemImg = this.avatarList1x;
            console.log(this.avatarList1x);
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  float: left;
  width: 100%;

  .tab_content {
    position: relative;
    float: left;
    width: 100%;
    background: #fff;
    border-radius: 0 0 18px 18px;
    padding: 26px 38px 0 38px;
    overflow-y: auto;

    .information {
      position: relative;
      float: left;
      width: 100%;

      .title {
        position: relative;
        float: left;
        width: 100%;
        margin-bottom: 10px;

        p {
          position: relative;
          float: left;
          height: 46px;
          width: 100%;
          padding-left: 17px;
          line-height: 46px;
          font-size: 20px;
          color: #323232;
          font-weight: 550;
        }
      }

      .title::after {
        height: 18px;
        width: 4px;
        border-radius: 20px;
        background: #0056fb;
        position: absolute;
        content: "";
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }

      /deep/ .ivu-form {
        width: 510px;
        position: relative;
        float: left;

        .ivu-form-item {
          min-height: 46px;
          margin-bottom: 26px;

          .ivu-form-item-label {
            line-height: 46px;
            height: 46px;
            padding: 0 20px 0 0;
            font-size: 17px;
            color: #2a2a2a;
          }

          .ivu-form-item-content {
            input,
            textarea {
              background: #fff;
              border-radius: 10px;
              border: 1px solid #d9e1eb;
            }

            input {
              line-height: 46px;
              height: 46px;
            }

            textarea {
              height: 150px;
            }
          }

          .ivu-form-item-error-tip {
            left: 180px;
            top: 10px;
          }

          .ivu-radio-group {
            margin-top: 5px;

            label {
              color: #6b6b6b;
              margin-right: 28px;
            }
          }

          .ivu-checkbox-group {
            margin-top: 6px;

            label {
              color: #6b6b6b;
            }
          }

          .ivu-switch {
            margin-top: 8px;
            width: 56px;
            height: 28px;
          }

          .ivu-switch-checked {
            border-color: #689cff;
            background-color: #689cff;
          }

          .ivu-switch:after {
            width: 22px;
            height: 22px;
            left: 2px;
            top: 2px;
          }

          .ivu-switch-checked:after {
            left: 30px;
          }
        }

        h5 {
          color: #b7b7b7;
          position: relative;
          width: 100%;
          padding-left: 180px;
          font-size: 14px;
          height: 14px;
          line-height: 14px;
          margin-top: -13px;
          font-weight: 500 !important;
          margin-bottom: 10px;
        }
      }

      /deep/ .role {
        position: relative;
        float: left;
        width: 100%;
        padding: 0 12px;

        .hint {
          font-size: 14px;
          color: #787878;
          margin-top: -14px;
        }

        .ivu-radio-group {
          margin-bottom: 24px;
          margin-top: 10px;
        }

        .ivu-radio-group::before {
          content: "*";
          display: inline-block;
          margin-right: 4px;
          line-height: 1;
          font-family: SimSun;
          font-size: 14px;
          color: #ed4014;
          top: 50%;
          transform: translateY(-50%);
          left: -2px;
          position: absolute;
        }

        .ivu-radio-inner {
          border-radius: 4px !important;
        }

        .ivu-radio-inner:after {
          border-radius: 3px !important;
        }
      }

      .cont {
        position: relative;
        float: left;
        width: 100%;
        border-radius: 10px;
        border: 2px solid #d9e1eb;
        min-height: 200px;
        padding: 15px 20px;

        p {
          position: relative;
          float: left;
          width: 100%;
          color: #3e3e3e;
          font-size: 16px;
          margin-bottom: 4px;
        }

        h5 {
          position: relative;
          float: left;
          width: 100%;
          font-size: 14px;
          color: #787878;
          margin-bottom: 12px;
        }

        .ivu-tree {
          min-width: 250px;
          display: inline-block;
          position: relative;
          float: left;
        }
      }
    }

    .btn_foot {
      position: relative;
      float: left;
      width: 100%;
      margin-bottom: -30px;
      margin-top: 20px;

      .btn {
        float: right;
        position: relative;
        margin-left: 24px;

        p {
          width: 140px;
          border-radius: 4px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: #8f8f8f;
          color: 18px;
          border: 1px solid #cccccc;
        }
      }
    }
  }
}

/deep/ .ivu-upload-drag {
  border: 0px;
}

img {
  width: 100%;
}

.demo-upload-list {
  width: 58px;
  height: 58px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 58px;
    height: 58px;
    object-fit: cover;
    position: relative;
    float: left;
    border-radius: 50%;
  }

  .removeIcon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
    z-index: 8;
  }

  .eyeIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    z-index: 7;
    font-weight: 550;
    display: none;
  }
}

.demo-upload-list:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list:hover::before {
  width: 58px;
  height: 58px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #ffffff, $alpha: 0.6);
  content: "";
  display: block;
  z-index: 6;
}

.demo-upload-list2 {
  width: 185px;
  height: 201px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 185px;
    height: 201px;
    object-fit: cover;
    position: relative;
    float: left;
  }

  .removeIcon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
    z-index: 8;
  }

  .eyeIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    z-index: 7;
    font-weight: 550;
    display: none;
  }
}

.demo-upload-list2:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list2:hover::before {
  width: 185px;
  height: 201px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #ffffff, $alpha: 0.6);
  content: "";
  display: block;
  z-index: 6;
}
.tjban {
  width: 185px;
  height: 201px;
  line-height: 201px;
  border: 1px solid #71a2ff;
  border-radius: 10px;
}
.tj {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 70px;
  margin-top: 50px;
}

.title_img {
  float: left;
  margin-top: -85px;
  margin-left: 66px;
  color: #71a2ff;
  height: 30px;
}

.tp {
  float: right;
  margin-right: -504px;
  margin-top: 150px;
  width: 640px;
  font-size: 13px;
}
.tpactive {
  float: right;
  margin-right: -504px;
  margin-top: -75px;
  width: 640px;
  font-size: 13px;
}
.tp a {
  float: left;
  width: 100%;
  color: #e8748a;
}

.demo-upload-list3 {
  width: 233px;
  height: 163px;
  position: relative;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 233px;
    height: 163px;
    object-fit: cover;
    position: relative;
    float: left;
  }

  .removeIcon {
    position: absolute;
    right: -7px;
    top: -7px;
    color: red;
    font-size: 16px;
    z-index: 8;
  }

  .eyeIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    z-index: 7;
    font-weight: 550;
    display: none;
  }
}

.demo-upload-list3:hover {
  .eyeIcon {
    display: block;
  }
}

.demo-upload-list3:hover::before {
  width: 233px;
  height: 163px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #ffffff, $alpha: 0.6);
  content: "";
  display: block;
  z-index: 6;
}

.tjban3 {
  width: 233px;
  height: 163px;
  line-height: 201px;
  border: 1px solid #71a2ff;
  border-radius: 10px;
}
.tj3 {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 93px;
  margin-top: 50px;
}

.title_img3 {
  float: left;
  margin-top: -85px;
  margin-left: 90px;
  color: #71a2ff;
  height: 30px;
}

.tp3 {
  float: right;
  margin-right: -550px;
  margin-top: 108px;
  width: 640px;
  font-size: 13px;
}
.tpactive3 {
  float: right;
  margin-right: -550px;
  margin-top: -67px;
  width: 640px;
  font-size: 13px;
}
.tp3 a {
  float: left;
  width: 100%;
  color: #e8748a;
}

.taba {
  width: 510px;
  position: relative;
  float: left;
}

/deep/ .ivu-steps {
  display: flex;
  width: 50%;
  font-size: 0;
  margin-left: 25%;
  line-height: 1.5;
}

/deep/ .ivu-steps .ivu-steps-title {
  display: block;
  margin-top: 15px;
  margin-left: -26px;
}

/deep/ .ivu-steps-item {
  display: inline-block;
  position: relative;
  vertical-align: top;
  flex: 1;
  overflow: inherit;
}

.yuan_first {
  float: left;
  width: 100%;
  position: relative;
  height: 120px;
}
.yuan_lan {
  margin: auto;
  left: 0;
  right: 0;
  position: absolute;
  bottom: 50px;
  top: 30px;
  width: 705px;
}
.yuan {
  float: left;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 3px solid #e7efff;
  border-radius: 50%;
  color: #e5eeff;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
  font-weight: 550;
}
.tabsactive {
  background: #ffffff;
  border: 4px solid #0056fb;
  border-radius: 50%;
  color: #0056fb;
}
.tabsactivexian {
  background: #0056fb !important;
}
.yuan_xian {
  float: left;
  width: 150px;
  height: 4px;
  background: #e5eeff;
  margin-top: 19px;
}

.yuan_title {
  float: left;
  width: 100%;
  height: 50px;
}

.tit1 {
  margin-top: 10px;
  float: left;
  font-size: 15px;
  font-weight: 550;
  margin-left: -21px;
  color: #0056fb;
}

.tit2 {
  margin-top: 10px;
  float: left;
  font-size: 15px;
  font-weight: 550;
  margin-left: 100px;
  color: #e5eeff;
}

.tit3x {
  margin-top: 10px;
  float: left;
  font-size: 15px;
  font-weight: 550;
  margin-left: 80px;
  color: #e5eeff;
}
.tit3 {
  margin-top: 10px;
  float: left;
  font-size: 15px;
  font-weight: 550;
  margin-left: 100px;
  color: #e5eeff;
}
.tit2x {
  margin-top: 10px;
  float: left;
  font-size: 15px;
  font-weight: 550;
  margin-left: 70px;
  color: #e5eeff;
}
.tabsactiveti {
  color: #0056fb;
}

/deep/ .ivu-input-suffix {
  top: 7px;
}

/deep/ .ivu-select-single .ivu-select-selection {
  height: 46px;
  position: relative;
  border-radius: 10px;
}

/deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  display: block;
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 24px;
}

/deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  display: block;
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 24px;
}

/deep/ .ivu-form-item-validating .ivu-input-icon-validate {
  display: none;
}
/deep/ .ivu-date-picker {
  width: 100%;
}

.duan {
  float: left;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #939393;
  margin-top: -35px;
  margin-left: 95px;
}
.duanx {
  float: right;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #939393;
  margin-top: -58px;
  margin-left: 476px;
  z-index: 999999999;
  position: absolute;
}
</style>
