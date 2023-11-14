window.now4real = window.now4real || {}
now4real.config = {
    target: 'api+widget',
    scope: 'page',
    widget: {
        color_external_background: '#053c5c', color_external_text: '#fff',
        color_internal_background: '#053c5c', color_internal_text: '#fff',
        logo_url: 'https://now4real.github.io/example-conference/imgs/logoWidget.png', // premium feature
        container: 'chat-box',
        language: 'en',
        welcome_message: 'Chat with the other attenders in real time. Messages disappear after {{ time }} {{ timeUnit }}.', // premium feature
        welcome_message_img_url: 'https://now4real.github.io/example-conference/imgs/icon.png', // premium feature
    }
}

now4real.onload = function () {
    console.log('Loaded')

    const subject = 'RANKING_PAGE_VIEWERS'

    this.subscribe(subject, _ => {
        handleRanking(now4real[subject])
    })
}

function handleRanking (ranking) {
    const navLinks = document.querySelector('#talk-nav .talk-nav-links')
    
    navLinks.innerHTML = ''
    
    if (ranking.length) {
        const rank = ranking.map(el => ({ url: el.url, title: el.title.split(':')[0], viewers: el.users }))
                                                .slice(0, 3)

        rank.forEach(talk => {
            const li = document.createElement('li')
            
            const a = document.createElement('a')
            a.href = talk.url
            a.title = `${talk.viewers} viewers`
            a.innerHTML = `${talk.title}`
            
            li.append(a)
            
            navLinks.appendChild(li)
        })
    }
}

(function () { var n4r = document.createElement('script'); n4r.type = 'text/javascript'; n4r.async = true; n4r.src = 'https://cdn.now4real.com/now4real.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(n4r, s); })();