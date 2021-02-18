import * as sapper from '@sapper/app';
import { makeServer } from './mock/index.js';

if (process.env.NODE_ENV === 'development') {
    makeServer();
}

sapper.start({
    target: document.querySelector('#sapper'),
});
