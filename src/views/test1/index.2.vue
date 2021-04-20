<template>
<div>
  <input id='btn1' type="button" value="haha">
  <p id='a'>abc</p>
  </div>

</template>
<script>

export default {
  mounted() {
    // console.log('test:' + $('#btn1').html())
    // $('#btn1').click(function() {
    //   alert('Text: ' + $('#test').text())
    // })
    $('#btn1').click(function() {
      alert('haha')
    })
    $('#a').html('Hello world!')
  }
}
</script>







