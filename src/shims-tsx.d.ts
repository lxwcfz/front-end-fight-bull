import Vue, { VNode } from 'vue'
import { AxiosStatic } from 'axios'
// import {ElMessageBoxShortcutMethod} from "element-ui/types/message-box";
// import {ElMessage} from "element-ui/types/message";
// import {ElLoadingComponent, LoadingServiceOptions} from "element-ui/types/loading";
// import {ElementUIComponent} from "element-ui/types/component";

declare module 'vue/types/vue' {

  interface Vue {
    $axios: AxiosStatic,
    $getStorage: any,
    $setStorage: any,
    $removeStorage: any,
    $msgBox: any,
    // $message: ElMessage,
    // $confirm: ElMessageBoxShortcutMethod,
    // $loading: (options: LoadingServiceOptions) => ElLoadingComponent,
    $validator: Validator,
  }
}
// declare module 'element-ui/types' { // element scroll组件声明
//   // export class Scrollbar extends ElementUIComponent {}
// }
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }


  interface Validator {
    isEmpty: (value: any) => boolean,
    isPhoneNum: (value: any) => boolean,
    isEamil: (value: any) => boolean,
    isAlphabets: (value: any) => boolean,
  }

  interface Mock {
    mock: (...params: any[]) => any
  }

  interface RoleInfo {
    name: string,
    score: number,
    img: string,
    id: number,
    token?: string
  }

  interface GroupInfo {
    role: RoleInfo,
    list: number[]
  }
}

