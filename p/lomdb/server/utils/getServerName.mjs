export default function getServerName(serverId) {
  let prefix
  let number

  if (serverId >= 1001 && serverId <= 1999) {
    return `AMEN_${String(serverId - 1000).padStart(3, '0')}`
  }

  if (serverId >= 2000 && serverId < 2027) {
    prefix = 'AMEN'
    number = serverId - 1000
    return `${prefix}_${number}`
  }

  if (serverId >= 2027 && serverId < 3000) {
    prefix = 'AMER'
    number = serverId - 1000
    return `${prefix}_${number}`
  }

  const base = Math.floor(serverId / 1000)
  number = serverId % 1000

  const regionMap = {
    1: 'AMEN',
    6: 'ES',
    11: 'PT',
    30: 'EUEN',
    33: 'DE',
    36: 'FR',
    39: 'TR',
    42: 'RU',
    4: 'VN',
    7: 'ID',
    10: 'EN',
    13: 'TH',
  }

  prefix = regionMap[base]
  if (!prefix) return null

  if (prefix === 'PT' && number > 247) prefix = 'ESPT'
  // else if (prefix === 'ME' && number > 90) prefix = 'TR'
  else if (prefix === 'EUEN' && number >= 262)
    prefix = 'MUSH'

  return `${prefix}_${String(number).padStart(3, '0')}`
}
