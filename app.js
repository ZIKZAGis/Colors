const cols = document.querySelectorAll('.col')
const colBtn = document.querySelector('.generate-colors')

// Рандомные цвета без использования библиотек 

// const generateRandomColor = () => {
//     const hexCodes = '0123456789ABCDEF'

//     let color = ''

//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//     }
//     return '#' + color
// }

document.addEventListener('keydown', (evt) => {
    evt.preventDefault()

    if (evt.code.toLocaleLowerCase() === 'space') {
        setRandomCalors()
    }
})

document.addEventListener('click', (evt) => {
    if (evt.target === colBtn) {
        setRandomCalors()
    }
})

document.addEventListener('click', (evt) => {
    const type = evt.target.dataset.type

    if (type === 'lock') {
        const node = evt.target.tagName.toLocaleLowerCase() === 'i' ? evt.target : evt.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(evt.target.textContent)
    }
})

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
} 

function setRandomCalors(isInitial) {
    const colors = isInitial ? getColorsFromHash : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = isInitial 
            ? colors[index] 
                ? colors[index]
                : chroma.random()
            : chroma.random()
        
        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        if (!isInitial) {
            colors.push(color)
        }

        col.style.background = color
        text.textContent = color

        setTextolor(text, color)
        setTextolor(button, color)
    })

    updateColorsHash(colors)
}

function setTextolor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map((col) => {
            return col.toString().substring(1)
        })
        .join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return []
}

setRandomCalors(true)