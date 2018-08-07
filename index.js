// FSA

const writeOverDispatch = store => next => async (action) => {
	let { async, before, fail, after } = action;
	let bAsync = false;
	delete action['fail'];
	delete action['before'];
	delete action['async'];
	delete action['after'];
	if(async && (async instanceof Promise)){
		bAsync = true;
        if(before){
            next(before());
        }
		await new Promise(resolve => {
			async.then(data =>{
				action = { ...action, async: data};
				resolve(action);
			}, err => {
				action = fail ? { ...action, ...fail() } : { ...action, async: 'fail' };
				resolve(action);
			}).catch(err => {
				throw new Error("Error:" + err.toString());
			});
		});
	} else {
		action.async = async;
	};
	
	next(action);
	if(after && bAsync){
		next(after());
	};
};


export default writeOverDispatch;
