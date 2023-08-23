// 原理1: Promise 可以链式调用，即使之中某一个有抛出异常也不阻塞
Promise.resolve()
  .then(() => {
    console.log("first fn");
    throw new Error("sth wrong occur!");
  })
  .catch((error) => {
    console.warn("first fn: " + error.message);
  })
  .then(() => {
    console.log("second fn");
  })
  .catch((error) => {
    console.warn("second fn: " + error.message);
  })
  .then(() => {
    console.log("third fn");
  });

// 原理2: 即使 Promise 的 then / catch 方法的回调最终会返回一个 Promise 对象也没关系，仍可链式调用并能捕获错误
const error_fn1 = true;
const error_fn2 = false;
const error_fn3 = false;

function fn1() {
  return new Promise((resolve, reject) => {
    console.log("fn1 running");
    if (error_fn1) reject({ message: "fn1 occur error in running time." });
    resolve();
  });
}

function fn2() {
  return new Promise((resolve, reject) => {
    console.log("fn2 running");
    if (error_fn2) reject({ message: "fn2 occur error in running time." });
    resolve();
  });
}

function fn3() {
  return new Promise((resolve, reject) => {
    console.log("fn3 running");
    if (error_fn3) reject({ message: "fn3 occur error in running time." });
    resolve();
  });
}

function occurError(error) {
  console.warn(error.message);
}

function run() {
  if (p instanceof Promise) {
    p.then(() => fn1())
      .catch((error) => occurError(error))
      .then(() => fn2())
      .catch((error) => occurError(error))
      .then(() => fn3())
      .catch((error) => occurError(error));
  } else {
    p = Promise.resolve();
    run();
  }
}

let p;
run();

// ===========================================  基于以上原理，下面模拟实际应用  ===========================================
/**
 * 思考:
 * 1. 开发一款可多人协同操作的编辑器，如何保证数据的一致性？
 * 2. 多人操作时，可能会同时收到多个服务端的推送事件，如何处理？(pushOTData 推送本地数据 / pullOTData 拉取他人数据 / syncOTData 同步他人数据)
 * 3. OT 算法是怎么进行文本内容合并的？
 *
 * 参考文档: https://codemirror.net/examples/collab/
 */

/**
 * 模拟数据:
 * eventName: 事件名
 * updates: 更新数据(在文本的 index 下标位置的下一处插入字符 char)
 * message: 描述信息
 * error: 是否发生错误
 */
const pushOTData = {
  eventName: "onPushOTData",
  updates: [10, "x"],
  message: "insert length mistake.",
  error: true,
};

const pullOTData = {
  eventName: "onPullOTData",
  updates: [1, "y"],
  message: "",
  error: false,
};

const syncOTData = {
  eventName: "onSyncOTDate",
  updates: [6, "z"],
  message: "",
  error: false,
};

// 业务场景: 模拟多个服务端事件推送到客户端
function businessScene() {
  onPushOTData(pushOTData);
  onPullOTData(pullOTData);
  onSyncOTDate(syncOTData);
}

// 服务端推送事件: onPushOTData
function onPushOTData(data) {
  if (!(task instanceof Promise)) task = Promise.resolve();

  task
    .then(() => handlePushOTData(data))
    .catch((error) => handleError(data.eventName, error));
}

// 服务端推送事件: onPullOTData
function onPullOTData(data) {
  if (!(task instanceof Promise)) task = Promise.resolve();

  task
    .then(() => handlePullOTData(data))
    .catch((error) => handleError(data.eventName, error));
}

// 服务端推送事件: onSyncOTDate
function onSyncOTDate(data) {
  if (!(task instanceof Promise)) task = Promise.resolve();

  task
    .then(() => handleSyncOTData(data))
    .catch((error) => handleError(data.eventName, error));
}

// 处理事件 onPushOTData 的回调函数
function handlePushOTData(data) {
  return new Promise((resolve, reject) => {
    const { eventName, updates, error, message } = data;
    console.log(`handle event: ${eventName}`);
    console.log(`update data: ${updates}`);
    // do sth of business logic...

    if (error) {
      reject({ message });
    }
    resolve();
  });
}

// 处理事件 onPullOTData 的回调函数
function handlePullOTData(data) {
  return new Promise((resolve, reject) => {
    const { eventName, updates, error, message } = data;
    console.log(`handle event: ${eventName}`);
    console.log(`update data: ${updates}`);
    // do sth of business logic...

    if (error) {
      reject({ message });
    }
    resolve();
  });
}

// 处理事件 onSyncOTDate 的回调函数
function handleSyncOTData(data) {
  return new Promise((resolve, reject) => {
    const { eventName, updates, error, message } = data;
    console.log(`handle event: ${eventName}`);
    console.log(`update data: ${updates}`);
    // do sth of business logic...

    if (error) {
      reject({ message });
    }
    resolve();
  });
}

// 处理异常
function handleError(eventName, error) {
  console.warn(`something wrong occur in ${eventName}:  ${error.message}`);
}

const task = Promise.resolve();
businessScene();
// ===================================================================================================================
