export default function (id, serverId) {
  if (id === 'AMEN' && +serverId > 1026) {
    return 'AMER'
  } else if (id === 'PT' && +serverId > 247) {
    return 'ESPT'
  } else if (id === 'ME' && +serverId > 90) {
    return 'TR'
  } else if (id === 'EUEN' && +serverId >= 262) {
    return 'MUSH'
  }
  return id
}
