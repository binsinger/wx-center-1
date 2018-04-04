<template>
  <div class="index-wrap">
    <div class="head">
      <img :src="header"/>
      <a :href="userInfo.link" class="head-inner">
        <div class="user-photo">
          <img :src="userInfo.headimgurl"/>
        </div>
        <div class="user-name">
          <p>{{userInfo.nickname}}</p>
          <span></span>
        </div>
      </a>
      <div class="btn-sign-down theme-bg-color" :style="{'background-color':word}" @click="signBtn">
        <p class="theme-bg-color" :style="{'background-color':word}">签到有礼<img src="../assets/images/icon-1.png"/></p>
      </div>
      <transition name="down">
        <div class="sign-box" v-show="show">
          <div class="sign-drop">
            <img src="/wap/center/static/img/head-bg.jpg"/>
            <div class="sign-inner">
              <div class="sign-text" v-if="signstate.todaySign===0" @click="signFun">
                <p class="theme-color" :style="{'color':word}">签到</p>
              </div>
              <div class="sign-success" v-if="signstate.todaySign===1" @click="signFun">
                <span class="theme-color" :style="{'color':word}">已连续签到</span>
                <p class="theme-color" :style="{'color':word}">{{signstate.days}}天</p>
              </div>
              <div class="sign-handle">
                <a href="javascript:void(0);" @click="signRuleFun">签到规则</a>
                <!--<a href="javascript:void(0);"><i></i>明日提醒</a>-->
              </div>
            </div>
          </div>
          <div class="sign-date">
            <div class="sign-date-inner" id="sign-date-inner">
              <div class="date-box" v-for="sign in signArray">
                <div class="date date-before-sign-in" v-if="sign.type ==='before' && sign.signTag ===1">
                  <i :style="{'background-color':word}">
                    <em class="left" :style="{'background-color':word}"></em>
                    <em class="right" :style="{'background-color':word}"></em>
                  </i>
                  {{sign.num}}
                </div>
                <div class="date date-before-sign" v-if="sign.type==='before' && sign.signTag ===0"
                     :style="{'color':word}">
                  <i :style="{'border-color':word}"><em
                    class="left"></em><em class="right"></em></i>
                  {{sign.num}}
                </div>
                <div class="date date-on-sign" v-if="sign.type==='day' && signstate.todaySign ===0">
                  <i
                    :style="{'border-color':word}"><em class="left"></em><em
                    class="right"></em></i>今日
                </div>
                <div class="date date-on-sign-in" v-if="sign.type==='day' && signstate.todaySign ===1"
                     :style="{'color':word}">
                  <i :style="{'background-color':word,}">
                    <em class="left" :style="{'background-color':word}"></em>
                    <em class="right" :style="{'background-color':word}"></em></i>今日
                </div>
                <div class="date date-after-sign" v-if="sign.type==='after'"><i><em class="left"></em><em
                  class="right"></em></i>{{sign.num}}
                </div>
              </div>
            </div>
          </div>
          <div class="btn-sign-up" @click="show = !show">
            <p>收起签到卡</p>
          </div>
        </div>
      </transition>
    </div>
    <div class="notice" v-if="notice.show">
      <div class="notice-box">
        <ul class="notice-list" :class="{anim:animate==true}">
          <li v-for="list in noticeList">
            <a :href="list.link" v-if="list.link !== ''">
              <p>{{list.content}}</p>
              <i v-if="list.link !== ''"></i>
            </a>
            <a href="javascript:void(0);" v-if="list.link == ''">
              <p>{{list.content}}</p>
              <i v-if="list.link !== ''"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="integral">
      <div class="integral-user">
        <p>您在<a href="javascript:void(0);" class="theme-color" :style="{'color':word}">“{{score.mpname}}”</a>的积分</p>
        <a :href="score.scoreLink" class="theme-color integral-num" :style="{'color':word}">
          {{score.scoreNum}}
          <i class="theme-bg-color" :style="{'background-color':word}">
            <img src="../assets/images/icon-1.png"/>
          </i>
        </a>
      </div>
      <ul class="integral-handle">
        <li v-for="md in module">
          <a :href="md.link">
            <i><img :src="md.img"/></i>
            {{md.name}}
          </a>
        </li>
      </ul>
    </div>
    <div class="integral-task" v-if="taskInvite.show">
      <!--<h5>{{task.name}}<a :href="task.link">更多</a></h5>-->
      <h5><i :style="{'background-color':word}"></i>{{taskName}}</h5>
      <ul>
        <li class="task-link">
          <a :href="taskInvite.link" v-if="taskInvite.link !== ''">
            <p>邀请好友</p>
            <!--<span>{{taskInvite.rule}}</span>-->
          </a>
          <a href="javascript:void(0);" v-if="taskInvite.link == ''">
            <p>邀请好友</p>
            <!--<span>{{taskInvite.rule}}</span>-->
          </a>
        </li>
        <!--<li>-->
        <!--<div>-->
        <!--<p>邀请好友关注</p>-->
        <!--<span>奖励100积分，最多可获得3000积分</span>-->
        <!--</div>-->
        <!--<div class="task-complete">已完成</div>-->
        <!--</li>-->
      </ul>
    </div>
    <div class="active-item" v-for="ad in adList" :key="ad.id">
      <a :href="ad.link" v-if="ad.link !== ''">
        <img :src="ad.img"/>
      </a>
      <a href="javascript:void(0);" v-if="ad.link == ''">
        <img :src="ad.img"/>
      </a>
    </div>
    <div class="sale" v-if="shop.show">
      <h5><i :style="{'background-color':word}"></i>
        {{shop.name}}
        <a :href="shop.link" v-if="shop.link !== ''" class="theme-color theme-border-color"
           :style="{'color':word,'border-color':word}">前往商城</a>
        <a href="javascript:void(0);" v-if="shop.link == ''" class="theme-color theme-border-color"
           :style="{'color':word,'border-color':word}">前往商城</a>
      </h5>
      <div class="sale-list">
        <a div class="sale-link" v-for="sale in shopList" :href="sale.detial_url">
          <img :src="sale.picurl"/>
          <p>{{sale.name}}</p>
          <span class="theme-color" :style="{'color':word}">{{sale.need_score}}积分+{{sale.need_money}}元</span>
        </a>
      </div>
    </div>

    <!--rule-->
    <div class="rule-modal-box" v-show="signRuleShow">
      <div class="rule-modal-inner">
        <h5 :style="{'color':word}">签到规则</h5>
        <p>每天签到可获得<span :style="{'color':word}">{{ruleBase}}</span>奖励</p>
        <p v-for="rslist in ruleScoreList">连续<span :style="{'color':word}">{{rslist[0]}}</span>天签到后，每天额外奖励<span :style="{'color':word}">{{rslist[1]}}</span>奖励说明</p>
        <p>每月全勤签满，可额外获得<span :style="{'color':word}">{{ruleFull}}</span>奖励</p>
        <a href="javascript:void(0);" :style="{'background-color':word}" class="btn-sure" @click="signRuleShow = !signRuleShow">确定</a>
      </div>
    </div>

    <!--sign result-->
    <div class="sign-modal-box" v-show="signModalShow">
      <div class="sign-modal-inner">
        <p v-html="signModalTitle">{{signModalTitle}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        url: '',
        mpid: 0,
        animate: false,
        show: false,
        setInt: "",
        header: "",
        word: "",
        score: {
          scoreNum: "",
          scoreLink: "",
          mpname: ""
        },
        notice: {
          name: "",
          show: false
        },
        noticeList: [],
        adList: [],
        taskName: "",
        taskInvite: {
          link: "",
          rule: "",
          show: false
        },
        module: [],
        userInfo: {
          nickname: "",
          headimgurl: "",
          link: ""
        },
        shop: {
          name: "",
          link: "",
          show: false
        },
        shopList: {},
        signstate: {
          signUrl: "",
          ruleLink: "",
          todaySign: 0,
          days: 0
        },
        signList: {},
        month: 1,
        monthNum: 31,
        day: 1,
        signArray: [],
        signModalTitle: "",
        signModalLock: true,
        signModalShow: false,
        ruleScoreList:[],
        ruleBase:0,
        ruleFull:0,
        signRuleShow:false,
        signChange:0,
        sinsetInt: "",
      }
    },
    created() {
      this.url = window.location.origin
      this.mpid = this.init("mpid")
      this.load();
      this.timeFun();
      this.setInt = setInterval(this.scroll, 3000);
    },
    methods: {
      init(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      //页面初始化
      load() {
        this.$http({
          method: 'get',
          url: this.url+'/center/wap/center/set',
//          url: 'api/center/wap/center/set',
          params: {
            mpid: this.mpid
          }
        }).then((result) => {
          if (result.data.e == '9999') {
            var userReault = result.data.data;
            for (let i in userReault) {
              if (userReault[i].class == 'Header') {
                this.header = userReault[i].img
              }
              if (userReault[i].class == 'Word') {
                this.word = userReault[i].color
              }
              if (userReault[i].class == 'Score') {
                this.score.scoreNum = userReault[i].score
                this.score.scoreLink = userReault[i].link
                this.score.mpname = userReault[i].mpname
              }
              if (userReault[i].class == 'Notice') {
                this.noticeList = userReault[i].list
                this.notice.show = true
                this.notice.name = userReault[i].name
              }
              if (userReault[i].class == 'Ad') {
                this.adList = userReault[i].list
              }
              if (userReault[i].class == 'Task') {
                this.taskName = userReault[i].name
                this.taskInvite.show = true
                this.taskInvite.link = userReault[i].invite.link
                this.taskInvite.rule = userReault[i].invite.rule
              }
              if (userReault[i].class == 'Module') {
                this.module.push({
                  link: userReault[i].link,
                  name: userReault[i].name,
                  img: userReault[i].icon_url
                })
              }
              if (userReault[i].class == 'UserInfo') {
                this.userInfo.nickname = userReault[i].nickname
                this.userInfo.headimgurl = userReault[i].headimgurl
                this.userInfo.link = userReault[i].link
              }
              if (userReault[i].class == 'Shop') {
                this.shop.show = true
                this.shop.name = userReault[i].name
                this.shop.link = userReault[i].link
                this.shopList = userReault[i].list
              }
              if (userReault[i].class == 'Sign') {
                this.signstate.signUrl = userReault[i].sign_url
                this.signstate.ruleLink = userReault[i].rule_link
                this.signstate.todaySign = userReault[i].is_today_sign

                this.signstate.days = userReault[i].days
                this.signList = userReault[i].log

                let signListArray = [];
                for (i in this.signList) {
                  signListArray.push(this.signList[i])
                }
                let dayNum = 0;
                for (let x = 0; x < signListArray.length; x++) {
                  dayNum++;
                  if (dayNum == this.day) {
                    this.signArray.push({
                      num: `${this.month}.${dayNum}`,
                      signTag: signListArray[x],
                      type: "day"
                    })
                  } else {
                    this.signArray.push({
                      num: `${this.month}.${dayNum}`,
                      signTag: signListArray[x],
                      type: "before"
                    })
                  }
                }
                for (let a = signListArray.length; a < this.monthNum; a++) {
                  dayNum++;
                  this.signArray.push({
                    num: `${this.month}.${dayNum}`,
                    signTag: 0,
                    type: "after"
                  })
                }
              }
            }
            if (this.noticeList.length < 2) {
              clearInterval(this.setInt)
            }
            this.signRule();
          }
        }).catch((result) => {
        })
      },
      //notice 滚动
      scroll() {
        this.animate = true;
        setTimeout(() => {
          this.noticeList.push(this.noticeList[0]);
          this.noticeList.shift();
          this.animate = false;
        }, 1000)
      },
      //签到按钮
      signFun() {
        if (!this.signModalLock) {
          return false
        }
        this.signModalLock = !this.signModalLock;
        this.$http({
          method: 'get',
          url:this.signstate.signUrl,
//          url: 'api/user/wap/sign/sign.html',
          params: {
            mpid: this.mpid
          }
        }).then((result) => {
          if (result.data.e == '9999') {
            this.signstate.todaySign = 1;
            this.signstate.days++;
            this.signChange = result.data.data.change
            this.signModalTitle = '签到成功，恭喜您获得<span style="color:'+this.word+'">'+this.signChange+'</span>积分奖励'
          } else if (result.data.e == '2951') {
            this.signModalTitle = result.data.m
          }
          this.signModalShow = true;
          this.signModalHide();
        }).catch((result) => {
        })
      },
      //签到完成提示浮层5s后隐藏
      signModalHide(){
        var that = this;
         setTimeout(function(){
           that.signModalShow = false;
           that.signModalLock = !that.signModalLock;
         },3000)
      },
      //签到规则
      signRuleFun(){
        this.signRuleShow = true
      },
      signRule(){
        this.$http({
          method: 'get',
          url:this.signstate.ruleLink,
//          url: 'api/center/wap/rule/sign.html',
          params: {
            mpid: this.mpid
          }
        }).then((result) => {
          if (result.data.e == '9999') {
              this.ruleScoreList = result.data.data.attach
              this.ruleBase = result.data.data.base
              this.ruleFull = result.data.data.full
          }
        }).catch((result) => {
        })
      },
      //日期年月
      timeFun() {
        let year = new Date().getFullYear();
        let leap = 28;
        this.isLeapYear(year) ? (leap + 1) : leap
        let monthDays = [31, leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        this.month = new Date().getMonth() + 1
        this.day = new Date().getDate();
        this.monthNum = monthDays[new Date().getMonth()]
      },
      //平年 闰年
      isLeapYear(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
      },
      //点击展开签到浮层
      signBtn() {
        this.show = !this.show
        this.signScroll()
      },
      //打开签到浮层，今日需要默认在当前屏
      signScroll() {
        let w = $(".date").width();
        if (this.day > 5) {
          $('.sign-date-inner').animate({scrollLeft: (this.day - 5) * w}, 100);
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./index.less" lang="less"></style>

