import { token } from '../store';
import { getItem, setItem } from '../utils/storage';

let _token = getItem('token');
if (_token) {
    token.set(_token);
}

token.subscribe((value) => {
    if (value !== 0 && !value) return;

    _token = value;
    setItem('token', value);
});

// 上传文件不能手动设置content-type，会影响到浏览器追加数据。
export const upload = (url, data) => {
    return fetch(url, {
        body: data,
        method: 'POST',
        headers: {
            Authorization: _token,
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                if (res.data && res.data.loginToken) {
                    token.set(res.data.loginToken);
                }

                return res.data;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.log('err at api/index.js', err);
        });
};

export const post = (url, data) => {
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: _token,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                if (res.data && res.data.loginToken) {
                    token.set(res.data.loginToken);
                }

                return res.data;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.log('err at api/index.js', err);
        });
};

export const get = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: _token,
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                if (res.data && res.data.loginToken) {
                    token.set(res.data.loginToken);
                }

                return res.data;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.log('err at api/index.js', err);
        });
};
