import { createServer, Model } from 'miragejs';
import { list } from './data';

export function makeServer({ environment = 'development' } = {}) {
    const server = createServer({
        environment,

        models: {
            user: Model,
        },

        routes() {
            this.post(
                'https://xxx.com/api/asdasdasd',
                () => list
            );
        },
    });

    return server;
}
