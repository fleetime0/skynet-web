// webRTCPlayerManager.js
import { WebRTCPlayer } from '@eyevinn/webrtc-player'

export function createWebRTCPlayer(videoElement, streamUrl) {
  const player = new WebRTCPlayer({
    video: videoElement,
    type: 'whep',
    statsTypeFilter: '^inbound-rtp'
  })

  player.on('no-media', () => console.warn('[WebRTC] no media received'))
  player.on('media-recovered', () => console.log('[WebRTC] media recovered'))
  player.load(new URL(streamUrl))
  return player
}
