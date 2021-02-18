<script>
    import { onMount } from 'svelte';
    import Upload from '../components/Upload.svelte';
    import { get, post } from '../api';
    let schemeList = [
        {
            schemeName: 'name1',
            schemePrice: '22',
            schemeDescription: 'descriptionaasd',
            schemePicture: '/tmp/asd',
        },
    ];

    const append = () => {
        schemeList = [
            ...schemeList,
            {
                schemeName: 'name2',
                schemePrice: '23',
                schemeDescription: 'descript333ionaasd',
                schemePicture: '/tmp/asd333',
            },
        ];
    };

    const remove = (id, i) => {
        if (!id) {
            schemeList.splice(i, 1);
            schemeList = schemeList;
            return;
        }
        get(`/api/scheme/deleteScheme?schemeId=${id}`).then((res) => {
            schemeList.splice(i, 1);
            schemeList = schemeList;
        });
    };

    onMount(async () => {
        console.log('profile');
        try {
            const res = await get('/api/user/getUserByToken');
            console.log('res', res);

            const schemeData = await get('/api/scheme/getSchemeList');
            console.log(schemeData);
        } catch (err) {
            console.log(err);
        }
    });

    const save = (i) => {
        console.log('save', schemeList);
        post('/api/scheme/schemePublish', schemeList[i]).then((res) => {});
    };
</script>

<div>
    <h1>赞助方案</h1>
    {#each schemeList as scheme, i}
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="mt-5 md:mt-0 md:col-span-2">
                <form>
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div class="col-span-6">
                                <label
                                    for="street_address"
                                    class="block text-sm font-medium text-gray-700"
                                    >赞助项名称</label
                                >
                                <input
                                    type="text"
                                    name="street_address"
                                    id="street_address"
                                    autocomplete="street-address"
                                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder="（如：一包泡面）"
                                    bind:value={scheme.schemeName}
                                />
                            </div>
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3 sm:col-span-2">
                                    <div
                                        class="col-span-6 sm:col-span-3 flex flex-row"
                                    >
                                        <label
                                            for="first_name"
                                            class="block text-sm font-medium text-gray-700"
                                            >￥</label
                                        >
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            autocomplete="given-name"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            placeholder="00.00/月"
                                            bind:value={scheme.schemePrice}
                                        />
                                        <p class="w-max">最低￥0.1</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label
                                    for="about"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    详情
                                </label>
                                <div class="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows="3"
                                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder=""
                                        bind:value={scheme.schemeDescription}
                                    />
                                </div>
                            </div>
                            <div>
                                <Upload
                                    on:url={(e) =>
                                        (scheme.schemePicture = e.detail)}
                                />
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="button"
                                on:click={() => remove(scheme.id, i)}
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            >
                                删除
                            </button>
                            <button
                                on:click={() => save(i)}
                                type="button"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                保存
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    {/each}
    <button
        on:click={append}
        type="button"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
        增加方案项
    </button>
</div>
