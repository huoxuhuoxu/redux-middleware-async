// FSA

const writeOverDispatch = store => next => async (action) => {
	let { async, before, fail } = action;
	delete action['fail'];
	delete action['before'];
	delete action['async'];
	if(async && (async instanceof Promise)){
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
	};
	next(action);
};


export default writeOverDispatch;
