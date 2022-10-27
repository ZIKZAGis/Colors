const cols = document.querySelectorAll('.col')

// Рандомные цвета без использования библиотек 

// const generateRandomColor = () => {
//     const hexCodes = '0123456789ABCDEF'

//     let color = ''

//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//     }
//     return '#' + color
// }

document.addEventListener('keydown', (event) => {
    if (event.code.toLocaleLowerCase() === 'space') {
        setRandomCalors()
    }
})

const setTextolor = (text, color) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

const setRandomCalors = () => {
    cols.forEach(col => {
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = chroma.random()
        
        setTextolor(text, color)
        setTextolor(button, color)
        col.style.background = color
    })
}

setRandomCalors()