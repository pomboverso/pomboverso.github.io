const modulePrefix = "pv"

export function getPrefix(name){
    return [modulePrefix, name].join('-')
}