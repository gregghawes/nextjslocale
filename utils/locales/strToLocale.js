export default str => {
    let locale = str.split('-');
    if(locale.length === 1) return str;
    return `${locale[0].trim().toLowerCase()}-${locale[1].trim().toUpperCase()}`
}