<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function sayHello() {
        dispatch('message', {
            text: 'Hello!',
        });
    }
    import { upload } from '../api';

    let avatar;

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        console.log(image);
        const data = new FormData();
        data.append('uploadfile', image);
        upload('/api/picture/uploadPicture', data)
            .then((res) => {
                console.log('res', res);
                dispatch('url', res.imgUrl);
            })
            .catch((err) => {
                console.log('error', err);
            });

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
        };
    };
</script>

<div class="relative w-max">
    {#if avatar}
        <img class="h-20" src={avatar} alt="avatar" />
    {:else}
        <span>添加图片</span>
    {/if}
    <input
        class="opacity-0 w-full h-full absolute top-0 left-0"
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={(e) => onFileSelected(e)}
    />
</div>
