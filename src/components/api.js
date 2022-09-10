const url = 'https://nomoreparties.co/v1/plus-cohort-14/';
const token = 'eaada802-eae7-468f-b2f3-51d625f02b5e';

function parseResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

function fetchUserInfo() {
    return fetch(`${url}/users/me`, {
        headers: {
            authorization: token
        }
    }).then((res) => {
        return parseResponse(res);
    });
}

function fetchCards() {
    return fetch(`${url}/cards`, {
        headers: {
            authorization: token
        }
    }).then((res) => {
        return parseResponse(res);
    });
}

function setUserInfo(name, about) {
    return fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then((res) => {
        return parseResponse(res);
    });
}

function addNewCard(name, link) {
    return fetch(`${url}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then((res) => {
        return parseResponse(res);
    });
}

function deleteCard(id) {
    return fetch(`${url}/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    }).then((res) => {
        return parseResponse(res);
    });
}

function setLike(cardId) {
    return fetch(`${url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token
        }
    }).then((res) => {
        return parseResponse(res);
    });
}

function unsetLike(cardId) {
    return fetch(`${url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    }).then((res) => {
        return parseResponse(res);
    });
}

function setUserAvatar(avatar) {
    return fetch(`${url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar,
        })
    }).then((res) => {
        return parseResponse(res);
    });
}

export { fetchUserInfo, fetchCards, setUserInfo, addNewCard, deleteCard, setLike, unsetLike, setUserAvatar };

