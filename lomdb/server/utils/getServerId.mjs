// ----------------------------------------
// SERVER ID SAMPLE: 11174
// ----------------------------------------

export default function getServerId(serverName) {
  const [prefix, numStr] = serverName.split('_')
  const num = Number(numStr)

  // Special rule for AMER servers
  if (prefix === 'AMEN' && num >= 1027) {
    return 2000 + num // example: AMER_1027 → 2027
  }

  const regionBase = {
    // AM
    AMEN: 1,
    ES: 6,
    PT: 11,
    ESPT: 11,
    // EU
    EUEN: 30,
    MUSH: 30,
    DE: 33,
    FR: 36,
    ME: 39,
    RU: 42,
    // SEA
    VN: 4,
    ID: 7,
    EN: 10,
    TH: 13,
  }[prefix]

  if (regionBase === undefined) return null

  // Compose server ID: base * 1000 + server number
  return regionBase * 1000 + num
}