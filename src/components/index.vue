<template>
  <div class="index-wrap">
    <div class="head">
      <img :src="header"/>
      <div class="head-inner">
        <div class="user-photo">
          <img :src="userInfo.headimgurl"/>
        </div>
        <div class="user-name">
          <a :href="detailUrl" :class="{'tz':detailshow}">{{userInfo.nickname}}</a>
          <a :href="bindphoneUrl" class="userphonetz" v-if="!isBind && isPhone">立即绑定手机获取更多福利...</a>
        </div>
      </div>
      <div class="btn-sign-down theme-bg-color" :style="{'background-color':word}" @click="signBtn">
        <p class="theme-bg-color" :style="{'background-color':word}">签到有礼<img src="../assets/images/icon-1.png"/></p>
      </div>
      <transition name="down">
        <div class="sign-box" v-show="show" style="background:#f00">
          <div class="sign-drop">
            <img src="/wap/center/static/img/head-bg.jpg"/>
            <div class="sign-inner">
              <div class="sign-text" v-if="signstate.todaySign===0" @click="signFun">
                <p class="theme-color" :style="{'color':word}">签到</p>
              </div>
              <div class="sign-success" v-if="signstate.todaySign===1">
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
              <div class="date-box" v-for="(sign, index) in signArray">
                <div class="date date-before-sign-in" v-if="sign.type ==='before' && sign.signTag ===1">
                  <i :style="{'background-color':word}">
                    <em class="left" :style="{'background-color':word}"></em>
                    <em class="right" :style="{'background-color':word}"></em>
                  </i>
                  {{sign.num}}
                </div>
                <div :class="{date: true, 'date-before-sign': true, canSign: sign.canSign}" @click="resignFun({sign,index})" v-if="sign.type==='before' && sign.signTag ===0"
                     :style="{'color':word}" >
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
            <p>点击收起</p>
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
        <p>您在<a href="javascript:void(0);" class="theme-color" :style="{'color':word}">“{{score.mpname}}”</a>的{{unitStr}}</p>
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
        <img :src="ad.img" v-bind:style="{'height':adheight +'px'}"/>
      </a>
      <a href="javascript:void(0);" v-if="ad.link == ''">
        <img :src="ad.img"/>
      </a>
    </div>
    <div class="sale" v-if="shop.show">
      <h5><i :style="{'background-color':word}"></i>
        <!--{{shop.name}}-->
        积分商城
        <a :href="shop.link" v-if="shop.link !== ''" class="theme-color theme-border-color"
           :style="{'color':word,'border-color':word}">更多商品</a>
        <a href="javascript:void(0);" v-if="shop.link == ''" class="theme-color theme-border-color"
           :style="{'color':word,'border-color':word}">更多商品</a>
      </h5>
      <div class="sale-list">
        <a div class="sale-link" v-for="sale in shopList" :href="sale.detial_url">
          <img :src="sale.picurl"/>
          <p>{{sale.name}}</p>
          <span class="theme-color" :style="{'color':word}">{{sale.need_score}}{{unitStr}}+{{sale.need_money}}元</span>
        </a>
      </div>
    </div>

    <!--rule-->
    <div class="rule-modal-box" v-show="signRuleShow">
      <div class="rule-modal-inner">
        <h5 :style="{'color':word}">签到规则</h5>
        <p v-if="ruleBase">每天签到可获得<span :style="{'color':word}">{{ruleBase}}</span>{{unitStr}}</p>
        <p v-if="ruleScoreList" v-for="rslist in ruleScoreList">连续<span :style="{'color':word}">{{rslist[0]}}</span>天签到后，每天额外奖励<span
          :style="{'color':word}">{{rslist[1]}}</span>{{unitStr}}</p>
        <p v-if="ruleFull">每月全勤签满，可额外获得<span :style="{'color':word}">{{ruleFull}}</span>{{unitStr}}</p>
        <p v-if="randscore">每天签到可获得<span :style="{'color':word}">{{randscore.min}}</span>到<span :style="{'color':word}">{{randscore.max}}</span>之间随机{{unitStr}}</p>
        <a href="javascript:void(0);" :style="{'background-color':word}" class="btn-sure"
           @click="signRuleShow = !signRuleShow">确定</a>
      </div>
    </div>

    <!-- resign -->
    <div class="resign-modal-box" v-show="resignModalShow">
      <div class="resign-modal-inner">
        <h5 :style="{'color':word}">提醒</h5>
        <p>此次补签将消耗您<span :style="{'color':word}">{{cost}}</span>{{unitStr}}</p>

        <a href="javascript:void(0);" :style="{'background-color':word}" class="btn-sure"
           @click="resignModalShow = !resignModalShow">好</a>
      </div>
    </div>

    <!--sign result-->
    <div class="sign-modal-box" v-show="signModalShow">
      <div class="sign-modal-inner">
        <p v-html="signModalTitle">{{signModalTitle}}</p>
      </div>
    </div>

    <!--attract-->
    <div class="share-modal-box" v-show="false && shareModalShow">
      <div class="share-modal-inner">
        <div class="title">
          <img src="/wap/center/static/img/subscribe-box.png"/>
        </div>
        <div class="qrcode-box">
          <img :src="mpQrcode"/>
        </div>
        <p>长按二维码加关注</p>
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
          baseNum:"",
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
          rule: [],
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
        shopList: [],
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
        resignModalLock: true,
        resignModalShow: false,
        ruleScoreList: [],
        ruleBase: 0,
        ruleFull: 0,
        randscore:{},
        signRuleShow: false,
        signChange: 0,
        sinsetInt: "",
        shareModalShow: false,
        mpQrcode: "",
        shareList:{},
        unitStr:'',
        cost: '', //补签消耗
        adheight:'',//广告图片高度
        detailUrl:'##',//个人资料页面跳转
        bindphoneUrl:'',//绑定手机页面跳转
        detailshow:false,//个人资料是否跳转
        isBind:false,//手机号是否验证过
        isPhone:false,//后台权限
      }
    },
    created() {
      this.url = window.location.origin
      this.mpid = this.init("mpid")

      this.mpid = 18

      this.load();
      this.timeFun();
      this.setInt = setInterval(this.scroll, 3000);

      this.isBindPhone();
    },
    mounted() {
      //window.vm = this;
    },
    methods: {
      /**
       * 获取地址栏参数
       */
      init(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      /**
       * 页面初始化
       */
      load() {
        this.$http({
          method: 'get',
          // url: this.url+'/center/wap/center/set',
          url: 'api/center/wap/center/set.html',
          params: {
            mpid: this.mpid
          }
        }).then((result) => {
          if (result.data.e == '9999') {
            var userReault = result.data.data;
            this.module = [];
            for (let i in userReault) {
              if (userReault[i].class == 'Header') {
                this.header = userReault[i].img
              }
              if (userReault[i].class == 'Word') {
                this.word = userReault[i].color
              }
              if (userReault[i].class == 'Score') {
                this.score.baseNum = userReault[i].score;
                this.score.scoreNum = this.formatInt(userReault[i].score);
                this.score.scoreLink = userReault[i].link
                this.score.mpname = userReault[i].mpname
              }
              if (userReault[i].class == 'Notice') {
                  this.noticeList = userReault[i].list ? userReault[i].list : []
                  if(this.noticeList.length>0){
                    this.notice.show = true;
                  }else{
                    clearInterval(this.setInt)
                  }
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
                if (userReault[i].subscribe == 0) {
                  this.shareModalShow = true
                }
              }
              if (userReault[i].class == 'Shop') {
                this.shop.show = true
                this.shop.name = userReault[i].name
                this.shop.link = userReault[i].link
                this.shopList = userReault[i].list
              }
              if (userReault[i].class == 'Sign') {
                this.signstate.signUrl = userReault[i].sign_url;
                this.signstate.ruleLink = userReault[i].rule_link;
                this.signstate.todaySign = userReault[i].is_today_sign;

                this.signstate.days = userReault[i].days;
                this.signList = userReault[i].log;

                this.$http({
                  method: 'get',
                  // url: this.signstate.ruleLink,
                  url: 'api/center/wap/rule/sign.html?mpid=18'
                }).then(res => {
                  if(res.data.e == 9999){
                    var resignData = res.data.data;
                    if('resign' in resignData){
                      this.cost = resignData.resign;
                    }

                    let limit = userReault[i].resignLimitNum;
                    let signListArray = [];
                    for (let i in this.signList) {
                      // signListArray.push(this.signList[i])
                      signListArray.push({
                        tag: this.signList[i],
                        date: i
                      })
                    }
                    let dayNum = 0;
                    for (let x = 0; x < signListArray.length; x++) {
                      dayNum++;
                      if (dayNum == this.day) {
                        this.signArray.push({
                          num: `${this.month}.${dayNum}`,
                          signTag: signListArray[x].tag,
                          date: signListArray[x].date,
                          type: "day",
                        })
                      }else if(dayNum === this.day -1){
                          this.signArray.push({
                            num: `${this.month}.${dayNum}`,
                            signTag: signListArray[x].tag,
                            date: signListArray[x].date,
                            type: "before",
                            canSign: true,
                            yesterday: true,
                          })
                      } else {

                        this.signArray.push({
                          num: `${this.month}.${dayNum}`,
                          signTag: signListArray[x].tag,
                          date: signListArray[x].date,
                          type: "before",
                          canSign: this.cost &&  this.day - dayNum <= limit
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
                    this.$nextTick(() => {
                      //签到日期，当前日期在可视区域内
                      this.signScroll();
                    })
                  }
                })

              }
              if (userReault[i].class == 'Mp') {
                this.mpQrcode = userReault[i].mpqrcode
              }
              if(userReault[i].class == 'Share'){
                this.shareList.title = userReault[i].title;
                this.shareList.desc = userReault[i].desc;
                this.shareList.share_link = userReault[i].share_link;
                this.shareList.imgurl = userReault[i].imgurl;
                this.shareList.domain = userReault[i].domain;
                this.shareList.mpid = userReault[i].mpid;
              }
              if(userReault[i].class == 'Special'){
                this.unitStr = userReault[i].score_name
              }
              if(userReault[i].class == 'Detail'){
                this.detailUrl = userReault[i].link
                this.detailshow = true;
              }
              if(userReault[i].class == 'Bindphone'){
                this.bindphoneUrl = userReault[i].link
                this.isPhone = true
              }
            }

            //通知轮播停止
            if (this.noticeList.length < 2) {
              clearInterval(this.setInt)
            }

            //今日未签到，默认显示签到浮层
            if (!this.signstate.todaySign) {
              this.signBtn();
            }

            this.$nextTick(() => {
              //签到日期，当前日期在可视区域内
              this.signScroll();
              //页面数据初始化后，调用分享
              this.shareFun();

              this.adheight = $(".active-item").width() * 5 / 12;
            });
          }
        }).catch((result) => {
        })
      },
      /**
       * 通知轮播效果
       */
      scroll() {
        var self = this;
        self.animate = true;
        if(self.noticeList.length>0){
          setTimeout(() => {
            self.noticeList.push(self.noticeList[0]);
            self.noticeList.shift();
            self.animate = false;
          }, 1000)
        }else{
          clearInterval(self.setInt)
        }

      },
      /**
       * 触发签到按钮
       */
      signFun() {
        if (!this.signModalLock) {
          return false
        }
        this.signModalLock = !this.signModalLock;
        this.$http({
          method: 'get',
          url: this.signstate.signUrl,
          //url: 'api/user/wap/sign/sign.html',
          params: {
            // mpid: this.mpid
          }
        }).then((result) => {
          if (result.data.e == '9999') {
            this.signstate.todaySign = 1;
            this.signstate.days++;
            this.signChange = result.data.data.change
            this.signModalTitle = '签到成功，恭喜您获得<span style="color:' + this.word + '">' + this.signChange + '</span>' + this.unitStr +'奖励'

            this.signChange = this.signChange ? this.signChange : 0;
            var totalNum = Number(this.score.baseNum) + Number(this.signChange);
            this.score.scoreNum  = this.formatInt(totalNum);

            //刷新数据
            this.load();

          } else if (result.data.e == '2951') {
            this.signModalTitle = result.data.m
          }
          this.signModalShow = true;
          this.signModalHide();
        }).catch((result) => {
        })
      },
      /**
       * 补签的英文是什么
       */
      resignFun(option) {

        console.log(option);
        let {sign, index} = option;

        var that = this;
        if(!sign.canSign) return;
        if (!this.resignModalLock) {
          return false
        }
        this.resignModalLock = !this.resignModalLock;
        this.$http({
          method: 'get',
          // url: this.signstate.signUrl,
          url: 'api/user/wap/sign/re-sign?mpid=18',
          params: {
            // mpid: this.mpid
            resignDate: sign.date
          }
        }).then((result) => {
          console.log(result);
           //debugger;
          if(result.data.status == 1){
            var fee = result.data.data.changeScore;

            if(!sign.yesterday){
              this.resignModalShow = true;
            }
            // this.cost = fee;
            this.score.baseNum -= fee;
            this.score.scoreNum  = this.formatInt(this.score.baseNum);

            this.signArray[index].signTag = 1
          }
          this.resignModalLock = true;
        }).catch(result => {
          console.log(result)
        })
      },

      /**
       * 签到完成提示浮层5s后隐藏
       */
      signModalHide() {
        var that = this;
        setTimeout(function () {
          that.signModalShow = false;
          that.signModalLock = !that.signModalLock;
        }, 3000)
      },
      /**
       * 签到规则弹窗显示
       */
      signRuleFun() {
        //触发签到规则方法
        this.signRule();
      },
      /**
       * 签到规则数据
       */
      signRule() {
        this.$http({
          method: 'get',
          url:this.signstate.ruleLink,
          // url: 'api/center/wap/rule/sign.html',
          params: {
            mpid: this.mpid
          }
        }).then((result) => {
          if (result.data.e == '9999') {
            this.ruleScoreList = result.data.data.attach
            this.ruleBase = result.data.data.base
            this.ruleFull = result.data.data.full
            this.randscore = result.data.data.randscore
            this.signRuleShow = true
          }
        }).catch((result) => {
        })
      },
      /**
       * 手机是否绑定过
       */
      isBindPhone(){
        this.$http({
          method: 'get',
          url: this.url+'/user/wap/user/phone',
          // url: 'api/user/wap/user/phone.html',
          params: {
            mpid: this.mpid
          }
        }).then((result) => {
          if (result.data.status == '1') {
            this.isBind = result.data.data.is_bind
          }
        }).catch((result) => {
        })
      },
      /**
       * 日期、年月
       */
      timeFun() {
        let year = new Date().getFullYear();
        let leap = 28;
        this.isLeapYear(year) ? (leap + 1) : leap
        let monthDays = [31, leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        this.month = new Date().getMonth() + 1
        this.day = new Date().getDate();
        this.monthNum = monthDays[new Date().getMonth()]
      },
      /**
       * 平年 闰年
       */
      isLeapYear(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
      },
      /**
       * 触发显示签到浮层
      */
      signBtn() {
        this.show = !this.show
        this.signScroll()
      },
      /**
       * 显示签到浮层，今日需要默认在当前f屏
       */
      signScroll() {
        let w = $(".date").width();
        if (this.day > 5) {
          $('.sign-date-inner').animate({scrollLeft: (this.day - 5) * w}, 100);
        }
      },
      /**
       * 分享方法
       */
      shareFun() {
        var sdkInstance = new jssdk(this.shareList.mpid, this.shareList.domain);
        sdkInstance.share(this.shareList.title, this.shareList.desc, this.shareList.imgurl, this.shareList.title, '', this.shareList.share_link);
      },
      /**
       * 千位符
       */
      formatInt: function (num) {
        num = num + '';//数字转字符串
        var str = "";//字符串累加
        var counter = 0;
        for (var i = num.length - 1; i >= 0; i--) {
          counter++;
          if (counter % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
            str += num[i] + ",";//加千分位逗号
            continue;
          }

          str += num[i];//倒着累加数字
        }
        return str.split('').reverse().join("");//字符串=>数组=>反转=>字符串
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./index.less" lang="less"></style>

