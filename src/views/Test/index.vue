<!--
 * @Author: Lvhz
 * @Date: 2020-12-08 14:08:12
 * @Description: 直播视频流播放 m3u8
-->
<template>
  <div>
    <video
      id="myVideo"
      ref="myVideo"
      style="width: 500px; height: 400px;"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
      preload="auto"
      data-setup="{}">
      <!-- <source src="http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/48c8a9475285890781000441992/playlist.m3u8"> -->
    </video>
    <el-button type="primary" style="margin: 20px;" @click="captureImage">截图</el-button>
    <canvas id="myCanvas" ref="myCanvas" width="500" height="500" style="border:1px solid #d3d3d3; margin-top:15px;">
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-hls';
// videojs-contrib-hls 用于在电脑端播放 如果只需手机播放可以不引入
export default {
  data() {
    return {
      player: null,
      codeStreamSrc: 'http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/48c8a9475285890781000441992/playlist.m3u8'
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.$nextTick(() => {
        if (this.player) this.player.dispose();
        this.player = videojs('myVideo', {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false
        });
        this.player.src({
          src: this.codeStreamSrc,
          type: 'application/x-mpegURL' //在重新添加视频源的时候需要给新的type的值
        });
        // setTimeout(() => {
        //   this.player.play();
        // }, 200);
      });
    },
    // 从视频流捕获图片
    captureImage() {
      const ctx = this.$refs.myCanvas.getContext('2d');
      ctx.drawImage(this.$refs.myVideo, 0, 0, 500, 500);
      // 加红框
      ctx.strokeStyle = '#e22018';
      ctx.strokeRect(125, 137, 115, 108);

      console.log(this.$refs.myCanvas.toDataURL());
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
