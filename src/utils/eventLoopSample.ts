const eventLoopSample = async () => {
  function async1() {
    console.log('async1 start')
    async2().then(function async1end() {
      console.log('async1 end')
    })
  }
  function async2() {
    console.log('async2 start')
    return new Promise(function async2promise(resolve) {
      resolve(null)
      console.log('async2 promise')
    })
  }
  console.log('script start')
  setTimeout(function () {
    console.log('setTimeout')
  }, 0)
  async1()
  new Promise(function promise1(resolve) {
    console.log('promise1')
    resolve(null)
  })
    .then(function promise2() {
      console.log('promise2')
    })
    .then(function promise3() {
      console.log('promise3')
    })
  console.log('script end')
}

export default eventLoopSample
