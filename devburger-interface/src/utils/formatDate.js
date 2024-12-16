export function fomartDate(date) {

    return new Date(date).toLocaleString('pt-br', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}