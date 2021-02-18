<script>
    import { post } from '../api';
    import { user } from '../store';

    let userName = 'username6';
    let telPhone = '13071717171';
    let password = 'pasword22222';

    userName = 'user' + Math.floor(Math.random() * 99999);
    telPhone = Math.floor(Math.random() * 99999000);

    function submit() {
        post('/api/user/register', {
            userName,
            telPhone,
            password,
        })
            .then((res) => {
                user.set(res.user);
                console.log('user store ', user);
            })
            .catch((err) => {
                console.log(err);
            });
    }
</script>

<form class="flex flex-col w-96 m-auto items-center">
    <h2>注册</h2>
    <input type="text" bind:value={userName} placeholder="用户名" />
    <input type="text" bind:value={telPhone} placeholder="手机号" />
    <input type="password" bind:value={password} placeholder="密码" />
    <button type="button" on:click={submit}>注册</button>
</form>
