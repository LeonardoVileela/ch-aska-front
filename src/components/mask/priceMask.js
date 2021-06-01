export const priceMask = value => {
    if (value.length > 2) {
        value = value.replace('.', '')
        value = value.replace(/\D/g, '')
        console.log(value)
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(value.toString(), `${value.slice(0, value.length - 2)}.${value.slice(value.length - 2, value.length)}`);
    } else {
        return value
    }
}