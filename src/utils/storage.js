export const setItem = (k, v) => {
    if (v !== 0 && !v) {
        return;
    }
    if (process.browser) {
        window.localStorage.setItem(k, JSON.stringify(v));
    }
};

export const getItem = (k) => {
    let v = null;
    if (process.browser) {
        v = window.localStorage.getItem(k);
    }

    console.log('localStorage getItem key: ', k, 'value: ', v);
    return JSON.parse(v);
};
