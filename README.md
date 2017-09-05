## redux-middleware-async

#### redux处理异步动作的中间件

#### 安装
	
	npm install redux-middleware-async --save

###### Using middleware
	
	import { applyMiddleware } from 'redux';
	import writeOverDispatch form 'redux-middleware-async';
	applyMiddleware(writeOverDispatch));
	
	
##### 参数
	
	type: redux规范: 需要被dispatch动作的名称
	before: 可选,异步动作之前需要执行的动作
	fail: 可选,异步动作执行失败之后需要执行的动作
	async: 异步动作,一个promise对象
	动作结束后的数据: 处理器中接收action, action.async就是异步动作的反馈
		
	
###### Using action

	const PPP_BEFORE = () => {
		// 执行异步动作之前执行的动作
	};
	
	const PPP_FAIL = () => {
		// 异步动作执行失败后执行的动作
	};

	const PPP = (num) => ({
		type: "PPP", 
		before: PPP_BEFORE, 
		fail: PPP_FAIL,
		async: new Promise((resolve) => {
			let a = parseInt(Math.random()*100);
			setTimeout(()=>{resolve(a)}, 3000);
		})
	});
	