<template>
  <view class="edit-container">
    <!-- 页面标题栏 -->
    <view class="top-title">
      <view class="title-content">
        <!-- 返回 -->
        <navigator open-type="navigateBack">
          <u-icon
            color="#006848"
            name="arrow-left"
            class="arrow-back"
            size="20"
          ></u-icon>
        </navigator>
        <view class="title"><text>信息编辑</text></view>
      </view>
    </view>
    <view class="form-wrapper">
      <u-form labelPosition="left" :model="model1" :rules="rules" ref="form1">
        <u-form-item
          label="真实姓名"
          prop="userInfo.name"
          borderBottom
          ref="item1"
        >
          <u-input
            v-model="model1.userInfo.name"
            border="none"
            prefixIcon="search"
            prefixIconStyle="font-size: 22px;color: #909399"
          ></u-input>
        </u-form-item>
        <u-form-item
          label="性别"
          prop="userInfo.sex"
          borderBottom
          @click="
            showSex = true;
            hideKeyboard();
          "
          ref="item1"
        >
          <u-input
            v-model="model1.userInfo.sex"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择性别"
            border="none"
          ></u-input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </u-form>
      <u-action-sheet
        :show="showSex"
        :actions="actions"
        title="请选择性别"
        description="如果选择保密会报错"
        @close="showSex = false"
        @select="sexSelect"
      >
      </u-action-sheet>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.top-title {
  position: fixed;
  top: 60px;
  width: 90%;
  color: #006848;
  font-size: 36px;
  .title-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .arrow-back {
    font-size: 36px;
  }
  .title {
    flex: 1;
    text-align: center;
  }
}
</style>
