const mixinStatus = () => {
  	methods: {
		foo() {
	  		console.log('foo')
		},
		conflicting() {
	  		console.log('from mixin')
		}
	}
}

export default mixinStatus
