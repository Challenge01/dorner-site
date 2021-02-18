<script>
    import { post } from '../api';
    let userName = 'username2';
    let password = 'pasword22222';

    function submit() {
        post('/api/user/login', {
            userName,
            password,
        })
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
</script>

<form class="flex flex-col w-96 m-auto items-center">
    <h2>登录</h2>
    <input type="text" bind:value={userName} placeholder="用户名" />
    <input type="password" bind:value={password} placeholder="密码" />
    <button type="button" on:click={submit}>登录</button>
</form>
