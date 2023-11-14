window.now4real = window.now4real || {}
now4real.config = {
    target: 'api+widget',
    scope: 'site',
    widget: {
        align: 'right',
        align_mobile: 'right',
        color_external_background: '#053c5c', color_external_text: '#fff',
        color_internal_background: '#053c5c', color_internal_text: '#fff',
        logo_url: 'https://now4real.github.io/example-conference/imgs/logoWidget.png', // premium feature
        welcome_message: 'Chat with the other attenders in real time. Messages disappear after {{ time }} {{ timeUnit }}.', // premium feature
        welcome_message_img_url: 'https://now4real.github.io/example-conference/imgs/icon.png', // premium feature
        language: 'en'
    }
}

now4real.onload = function () {
    console.log('Loaded')

    const talks = ['talk1', 'talk2', 'talk3']

    talks.forEach(talk => {
        const pageContext = `${location.protocol === 'file:' ? '' : '/talks'}/${talk}.html`
        const subject = `COUNTER_PAGE_VIEWERS:${pageContext}`

        this.subscribe(subject, upd => {
            const talkViewers = upd?.data?.value

            console.log(`${talk} -> ${talkViewers}`)

            if (talkViewers) {
                updateViewers(talk, talkViewers)
                handleHottest()
            }
        })
    })
}

function parseCounter (str) {
    const numericPart = parseFloat(str)
    const suffix = str.slice(-1).toUpperCase()

    if (suffix === 'K') {
        return numericPart * 1000
    } else if (suffix === 'M') {
        return numericPart * 1000000
    } else {
        return numericPart
    }
}

function updateViewers (talkID, viewers) {
    const element = document.querySelector(`#${talkID} .viewers`)

    element.innerText = `${viewers} viewer${viewers !== '1' ? 's' : ''}`

    element.setAttribute('data-viewers', parseCounter(viewers))
}

function handleHottest () {
    const talksList = [...document.querySelectorAll('.talk')]

    const talksViewersTuple = talksList.map(talk => talk.querySelector('.viewers'))
                                       .map(viewersSpan => Number(viewersSpan.dataset.viewers || 0))

    console.log('list', talksViewersTuple)

    const max = Math.max(...talksViewersTuple)
    const isMaxUnique = talksViewersTuple.filter(item => item === max).length === 1

    if (max !== 0 && isMaxUnique) {
        const maxIndex = talksViewersTuple.indexOf(max)
                
        talksList.forEach((el, idx) => {
            idx === maxIndex ? el.classList.add('hot') : el.classList.remove('hot')                
        })
    } else {
        talksList.forEach(el => {
            el.classList.remove('hot')
        })
    }
}

(function () { var n4r = document.createElement('script'); n4r.type = 'text/javascript'; n4r.async = true; n4r.src = 'https://cdn.now4real.com/now4real.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(n4r, s); })();