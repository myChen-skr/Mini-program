// pages/player/player.js
let musiclist = []
// 正在播放歌曲的index
let playingIndex = 0
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: ' ',
    isPlaying: false,
    name: '',
    singer: '',
    isLyricShow: false,
    lyric: '传给歌词组件的歌词'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.musicId, typeof (options.musicId))
    playingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDatail(options.musicId)
  },
  togglePlaying() {
    this.setData({
      isPlaying: !this.data.isPlaying
    })

  },
  _loadMusicDatail(musicId) {
    let music = musiclist[playingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl: music.al.picUrl

    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl',
      }
    }).then((res) => {
      console.log(res)
      const url = res.result.data[0].url
      if (url === null) {
        wx.showToast({
          title: '没有权限播放'
        })
        backgroundAudioManager.pause()
        this.setData({
          isPlaying: false
        })
        return
      }
      backgroundAudioManager.src = url
      backgroundAudioManager.title = music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer = music.ar[0].name
      this.setData({
        isPlaying: true
      })
      wx.hideLoading()
      // 请求歌词
      wx.cloud.callFunction({
        name: 'music',
        data: {
          musicId,
          $url: 'lyric',
        }
      }).then((res) => {
        console.log(res)
        let lyric = '暂无歌词'
        const lrc = res.result.lrc
        if (lrc) {
          lyric = lrc.lyric
        }
        this.setData({
          lyric
        })
      })
    })
  },
  togglePlaying() {
    if (this.data.isPlaying) {
      backgroundAudioManager.pause()
    } else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onLyricShow() {
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },
  onPrev() {
    playingIndex--
    if (playingIndex < 0) {
      playingIndex = musiclist.length - 1
    }
    this._loadMusicDatail(musiclist[playingIndex].id)


  },
  onNext() {
    playingIndex++
    if (playingIndex === musiclist.length) {
      playingIndex = 0
    }
    this._loadMusicDatail(musiclist[playingIndex].id)

  }
})