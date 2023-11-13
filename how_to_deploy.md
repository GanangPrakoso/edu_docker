Suplemen deployment dengan Docker:

-   Jika instalasi docker di local gagal (terutama windows user biasanya), instalasi docker di local bisa di SKIP. Langsung coba deploy docker di aws aja

-   Cara buat Mongodb atlas (cloud) untuk mengganti connection string mongo di server user kalian : https://www.mongodb.com/docs/atlas/getting-started/ , lengkapnya silahkan buka other resource di drive tonton materi connect mongo atlas

-   Cara buat redislab (cloud untuk redis) : daftar https://redis.com/ buat db baru, lalu silahkan buka other resource di drive, tonton materi “connect_to_redislab”

-   Untuk deployment orchestrator (graphql) tambahkan key instropection di bagian listen, pembuatan apollo jadi seperti ini (agar deployment kalian bisa mengakses playground buat dicoba2)

```js
const server = new ApolloServer({
  typeDefs:[array typeDef kalian],
  resolvers:[array resolver kalian],
  introspection: true
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
});
```

Notes untuk deployment service user:

-   jangan lupa uri mongo ganti ke atlas
-   jangan lupa listen port ke process.env.PORT

Notes untuk deployment service app:

-   jangan lupa listen port ke process.env.PORT
-   jangan lupa tambahkan config variable NODE_ENV dengan nilai production pada Dockerfile
-   jangan lupa tambahkan config variable DATABASE_URL dengan nilai connection uri dari Supabase

Notes untuk deployment orchestrator:

-   jangan lupa listen port ke process.env.PORT, buat port 80 seperti di challenge 1
-   jangan lupa URL axios ke tiap service diganti dengan yg link service aws (bisa juga langsung ke ip-public:port, tidak perlu dibuat jadi sub-domain)

Cara publish client:
https://docs.expo.dev/workflow/publishing/

---

Untuk cara deploy ke AWS dengan Docker, bisa liat di section `Deploy Dockerizing` to AWS.
