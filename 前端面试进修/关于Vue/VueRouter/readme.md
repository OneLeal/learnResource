# Vue 路由: https://v3.router.vuejs.org/zh/guide/#html

## 文档笔记

- 动态路由匹配:

  ```js
    <!-- 路由格式，参数值会被设置到 this.$route.params 中 -->
    const routes = [{ path: '/user/:id', component: User }]
  ```

- 嵌套路由:

  ```js
  <!-- 以 "/" 开头的嵌套路径会被当作根路径 -->
  const routes = [
    {
        path: '/user/:id',
        component: User,
        children: [{ path: 'profile', component: UserProfile }]
    }]
  ```

- 路由组件传参:

  ```js
  <!-- 组件中声明的属性 address 会被赋值为 this.route.params.address -->
  const routes = [
    {
      path: "/user",
      component: User,
      props: (route) => ({ address: route.params.address }),
    },
  ];
  ```

### 路由守卫

- 全局守卫:

  1. beforeEach 全局前置守卫
  2. beforeResolve 全局解析守卫
  3. afterEach 全局后置守卫

- 组件内守卫:

  1. beforeRouteEnter
  2. beforeRouteUpdate
  3. beforeRouteLeave

- 路由独享守卫: beforeEnter

### 完整的导航解析流程

1. 导航被触发;
2. 卸载的组件中的 beforeRouteLeave 调用;
3. 全局守卫 beforeEach 调用;
4. 如果是复用的组件，则 beforeRouteUpdate 调用;
5. 独享守卫 beforeEnter 调用;
6. 解析异步路由组件;
7. 即将挂载的组件中的 beforeRouteEnter 调用(不能访问 this);
8. 全局解析守卫 beforeResolve 调用;
9. 导航被确认(beforeEach 的回调函数中已调用 next());
10. 全局后置守卫 afterEach 调用(无 next 参数);
11. Dom 更新;
12. 已挂载组件中 beforeRouteEnter 的参数 next 中的回调开始执行;
