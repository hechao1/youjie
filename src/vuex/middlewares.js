const localStorageMiddleware = {
  onMutation (mutation, { localInfo }) {
  	let type = mutation.type
  	if(type == 'SET_BAODANRESULT' || type == 'REMOVE_BAODANRESULT'){
	  	if(_.isArray(localInfo.baodanResult)){
	    	localStorage.setItem('daze-baodan-result', JSON.stringify(localInfo.baodanResult))
	  	}
  	}
  }
}

export { localStorageMiddleware }
