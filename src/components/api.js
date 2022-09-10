const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14/',
    headers: {
        authorization: 'eaada802-eae7-468f-b2f3-51d625f02b5e',
        'Content-Type': 'application/json',
    },
};

function parseResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

function request(url, options) {
    return fetch(url, options).then((res) => parseResponse(res));
}

function fetchUserInfo() {
    return request(`${config.baseUrl}/users/me`, { headers: config.headers });
}

function fetchCards() {
    return request(`${config.baseUrl}/cards`, {
        headers: config.headers
    });
}

function setUserInfo(name, about) {
    return request(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    });
}

function addNewCard(name, link) {
    return request(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    });
}

function deleteCard(id) {
    return request(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    });
}

function setLike(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    });
}

function unsetLike(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    });
}

function setUserAvatar(avatar) {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        })
    });
}

export { fetchUserInfo, fetchCards, setUserInfo, addNewCard, deleteCard, setLike, unsetLike, setUserAvatar };

