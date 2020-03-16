<template lang="pug">
    div.login-wrap.w100
        div.title.tc 趣味斗牛
        div.login.tl
            div.login-item
                div.label 账号：
                input.mt2.input(placeholder="请输入账号", v-model.trim="name")
            div.login-item
                div.mt2.label 密码：
                input.mt2.input(placeholder="请输入密码", type="password", v-model.trim="password")
            button.btn(@click="doLogin()") 登录 / 注册
        img.logo-left(src="../../assets/logo.png")
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { loginApi } from '../../api/index';
import { Dialog, Notify } from 'vant';
import { setStorage } from '../../utils/storage';
import { storageName } from '../../config/config';

@Component
export default class Login extends Vue {
    name = '';
    password = '';

    mounted() {
        
    }
    doLogin(registe) {
        if(!this.name) {
            Notify({ type: 'warning', message: '账号不能为空' });
            return;
        }
        if(!this.password) {
            Notify({ type: 'warning', message: '密码不能为空' });
            return;
        }
        loginApi({
            name: this.name,
            password: this.password,
            registe
        }).then(res => {
            if (res.status === 200) {
                if(res.data) {
                    Notify({ type: 'success', message: '登录成功' });
                    setStorage(storageName, res.data);
                    setTimeout(() => {
                        window.location.href = window.location.href.replace('login.html', '');
                    }, 500)
                } else {
                    Dialog.confirm({title: '提示', message: '该账户未注册，是否注册并登录'}).then(() => {
                        this.registe();
                    }).catch(() => {
                        
                    })
                }
            }
        })
    }
    registe() {
        this.doLogin(1)
    }
}
</script>

<style lang="stylus">
@keyframes textShadow {
    0 {
        text-shadow: 2px 2px 5px #2ac9e2;
    }
    50% {
        text-shadow: 4px 4px 5px #2ac9e2;
    }
    100% {
        text-shadow: 2px 2px 5px #2ac9e2;
    }
}
@keyframes btn {
    0 {
        box-shadow 0 0 5px 
    }
    50% {
        box-shadow 0 0 10px #43b3c5
    }
    100% {
        box-shadow 0 0 5px
    }
}
.login-wrap
    height 100%
    background-image url('../../assets/login-bg.png')
    background-size 100% 100%
    .title
        font-size: 20px;
        line-height: 40px;
        color: #f9ab37;
        letter-spacing: 16px;
        text-shadow: 2px 2px 5px #2ac9e2;
        animation textShadow 1.5s infinite linear
    .login
        width: 270px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        height: 230px;
        background: linear-gradient(45deg, #513e5a, rgba(72,52,82,.3) , #513e5a);
        border-radius: 10px;
        padding: 20px;
        .label
            color #f9ab37
            font-size 14px
            letter-spacing 3px
        input
            outline: none;
            background: rgba(0,0,0,.3);
            border: none;
            border-radius: 3px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            color: #928194;
            font-weight: bold;
            box-shadow 0 0 5px
        .btn
            outline: none;
            border: none;
            width: 100px;
            height: 30px;
            border-radius: 5px;
            margin: 0 auto;
            display: block;
            margin-top: 25px;
            background: linear-gradient(0deg, #503c5e, #8c66b9, #503c5e);
            color: #f9ab37;
            box-shadow: 0 0 5px;
            animation btn 1.5s infinite
            text-align center
            font-size 14px
            cursor pointer
            &:active
                opacity .7
    .logo-left
        width: 30px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 7px;
        transform: translateX(-117px);
        opacity: .8;
</style>