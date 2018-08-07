## react-middleware-async

#### redux处理异步动作的中间件

#### 安装
	
	npm install react-middleware-async --save

###### Using middleware
	import { createStore, combineReducers, applyMiddleware } from "redux";
	import writeOverDispatch from 'redux-middleware-async';
    var REDUCERS = combineReducers({
        ...
    });
	var store = createStore(REDUCERS, {test: true}, applyMiddleware(writeOverDispatch));
	
	
##### 参数
	
	type: redux规范: 需要被dispatch动作的名称
	before: 可选,异步动作之前需要执行的动作
	fail: 可选,异步动作执行失败之后需要执行的动作
	after: 可选,异步动作结束后需要执行的动作
	async: 异步动作,一个promise对象
	动作结束后的数据: 处理器中接收action, action.async就是异步动作的反馈
	注: 如果异步动作失败了,并且不存在fail做错误处理的动作
		返回: {
			type,
			async: "fail"
		}
	注: async存在,声明此动作为异步动作,fail/after/before才会生效

	
###### Using action

	const PPP_BEFORE = () => {
		// 执行异步动作之前执行的动作
	};
	
	const PPP_FAIL = () => {
		// 异步动作执行失败后执行的动作
	};

	const PPP_AFTER = () => {
		// 异步动作执行完成之后执行的动作
	};

	const PPP = (num) => ({
		type: "PPP", 
		before: PPP_BEFORE, 
		fail: PPP_FAIL,
		after: PPP_AFTER,
		async: new Promise((resolve) => {
			let a = parseInt(Math.random()*100);
			setTimeout(()=>{resolve(a)}, 3000);
		})
	});
	
