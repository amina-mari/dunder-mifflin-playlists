# 1. Visão Geral do Projeto

O Projeto Dunder Mifflin Playlists é  uma aplicação Front-End que permite aos usuários acessarem suas playlists cadastradas no Spotify e também terem uma visão geral dos seus gostos musicais por meio de seleções dos artistas mais ouvidos, músicas mais tocadas recentemente e ainda recomendações de novas faixas baseadas no estilo pessoal de cada um.

O projeto surgiu da ideia de fazer um site implementado com testes do início ao fim em uma estrutura escalável usando [NextJS](https://nextjs.org/) e [React](https://react.dev/). Como bibliotecas de teste, foram utilizadas a biblioteca [Jest](https://jestjs.io/) por oferecer um ótimo suporte ao uso e monitoramento de funções mockadas e a biblioteca [React Testing Library](https://testing-library.com/) por ter uma facilidade com testes de renderizações de rerenderizações em componentes React atualizados por estados.

Como biblioteca de autenticação, foi escolhido o [NextAuth](https://next-auth.js.org/) por já ser uma solução pensada para projetos Next e também por já oferecer um suporte nativo à autenticação OAuth 2.0 do Spotify, utilizada no projeto para acessar as playlists e músicas do usuário. E por fim, para hospedagem do projeto foi usado o [Vercel](https://vercel.com/) por ser uma solução simples e gratuita conhecida por oferecer uma boa integração com as demais tecnologias.

Além desses, para estilização da página foi utilizada a extensão de CSS [SASS](https://sass-lang.com/) em formato de módulos para que cada componente tivesse o seu próprio estilo separado dos demais (por uma questão de organização) e também para evitar possíveis colisões de nomes de classes.

Pretende-se ainda aplicar ESLint para padronização do estilo de código atual e futuro :)

# 2. Instalação e Configurações 

Para uso da aplicação em ambiente local, é preciso configurar as variáveis que estão descritas no arquivo .env.example

## 2.1 SPOTIFY_ID e SPOTIFY_SECRET

Essas duas váriaveis são os tokens de acesso da aplicação que permitem o início do fluxo OAuth 2.0. São as credencias que estão vinculadas à aplicação configurada no Spotify (mais informações sobre como configurar sua conta podem ser encontradas [nesse endereço](https://developer.spotify.com/documentation/web-api/concepts/apps)).

A partir da criação da aplicação autorizada no Spotify, serão gerados os tokens de acesso Client ID e Client Secret. No arquivo .env, o campo SPOTIFY_ID é preenchido com o Client ID e o campo SPOTIFY_SECRET é preenchido com o Client Secret.

## 2.2 NEXTAUTH_URL

Esse é o campo que indica de onde partirão as requisições que a aplicação irá fazer à API do Spotify e também por onde serão recebidos os dados que o Spotify enviar de volta como resposta à requisição. 

Se a aplicação estiver hospedada na Vercel (como foi o caso), esse campo pode ser deixado vazio nas váriaveis de ambiente da Vercel. Se estiver rodando em outra ferramenta de hospedagem, deve ser preenchido com a URL pública da aplicação. 
Exemplo: "http://meu-site-dunder-mifflin-playlists"

Se a aplicação estiver rodando localmente, esse campo pode ser preenchido com "http://localhost:3000". 

## 2.3 NEXTAUTH_SECRET

Esse é um valor randômico usado pra encriptar os tokens JWT e pode ser gerado a partir do comando Bash a seguir:

```openssl rand -base64 32```

O valor retornado pelo comando pode ser usado para preencher o campo NEXTAUTH_SECRET no arquivo .env

## 2.4 Configuração RedirectURI na aplicação Spotify

O mesmo valor declarado na variável NEXTAUTH_URL deve ser também adicionado ao campo 'Redirect URIs' da aplicação Spotify acrescido do final '/api/auth/callback/spotify'
Exemplo: "http://localhost:3000/api/auth/callback/spotify"

Abrir o site [Spotify for Developers](https://developer.spotify.com/), clicar no botão com seu nome de usuário no canto superior direito e depois clicar em Dashboard no menu suspenso que abrir.

Logo depois, selecionar a sua aplicação Spotify criada nos passos anteriores e depois em Settings no canto superior direito. Rolando a página para baixo, existe o botão Edit para editar o campo Redirect URI com o valor descrito acima.

# 3. Uso das Funcionalidades

Para rodar a aplicação localmente, devem ser usados os seguintes comandos em um terminal bash localizado na pasta raiz do projeto: 

```
npm install
npm start
```

Para rodar o projeto em uma plataforma de hospedagem basta seguir o passo a passo descrito na documentação da sua hospedagem de escolha e adicionar as variáveis de ambiente descritas no item 2 nas configurações da plataforma.

# 4. Estrutura de Pastas

```
./
│
├── .next/
├── .swc/
├── node_modules/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │    └── auth/
│   │   │          └── [...nextauth]
│   │   │                   └── route.js   
│   │   ├── components/
│   │   ├── login/
│   │   └── songs/ 
│   │
│   ├── public/
│   │      └── icons/
│   │
│   └── utils/
│          ├── fetchArtists/
│          ├── fetchLatestTracks/
│          └── fetchRecommendations/
│
├── .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── jest.config.js
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
└── README.md
```


<!-- # 5. Árvore de Renderização de Componentes React
Para melhor visualização, abra a imagem abaixo em uma nova guia

![Árvore de Renderização React Dunder Mifflin Playlists](./RenderTreeDunderMifflin.drawio.png)

# 6. React Dependency Tree -->

# 5. Endpoints Utilizados

Para esse projeto, foram usados os dados fornecidos pela [API Web do Spotify](https://developer.spotify.com/documentation/web-api). As funcionalidades de exibir playlists, exibir detalhes das playlists, fonecer recomendações de novas músicas pra o usuário acompanhar, exibir artistas mais tocados e exibir músicas mais tocadas recentemente são todas vindas de endpoints dessa mesma API, o site Dunder Mifflin Playlists apenas organiza de uma forma visualmente atraente esses conteúdos.

Ao todo, foram utilizados 5 endpoints diferentes para exibir as informações

## 5.1 Endpoint de Autorização de Acesso pela Aplicação

```https://accounts.spotify.com/authorize```

Para redirecionar o usuário pra página de autenticação do Spotify, a aplicação, através da biblioteca NextAuth, envia uma requisição HTTP para o endpoint acima enviando o Client ID e o Client Secret que foram cadastrados no arquivo .env, além de também enviar quais escopos de acesso a aplicação requer pra funcionar. Dessa forma, ao se definir escopos mais restritos, não corre-se o risco de a aplicação ter mais acesso do que deveria a dados sensíveis do usuário. 

O procedimento é feito dessa forma pra garantir que a aplicação que envia a requisição é de fato uma aplicação cadastrada no site Spotify for Developers (já que o Client ID e o Client Secret só são obtidos a partir de lá) e também pra conseguir acesso ao token de autenticação do usuário, que é requerido por alguns dos endpoints usados na aplicação, como o endpoint de acesso aos artistas mais tocados.

## 5.2 Endpoint de Artistas mais Tocados / Músicas mais Ouvidas

```https://api.spotify.com/v1/me/top/{type}```

Esse endpoint, que dá acesso tanto aos artistas como às músicas mais ouvidas, foi utilizado de duas formas na aplicação. Ao se alterar o parâmetro ```type``` para "tracks" ou "artists", o enpoint fornece todos as músicas ou artistas mais ouvidos nos últimos 6 meses.

Então, para obter os artistas mais ouvidos pelo usuário, esse endpoint foi utilizado com o parâmetro de rota "artists" e com os parâmetros de busca ```limit``` e ```offset``` pra garantir que estejam sendo mostrados apenas os 5 artistas mais ouvidos nos últimos 6 meses, por uma questão de performance da requisição. 

Já para obter as músicas mais ouvidas pelo usuário, entendeu-se que o usuário estivesse mais interessado em saber suas músicas **recentes** mais ouvidas, então para essa requisição foi utilizado o parâmetro de rota "tracks", os mesmos parâmetros ```limit``` e ```offset``` e ainda o parâmetro ```time_range``` definido como "short_term" para obter as músicas mais tocadas nas últimas 4 semanas.

## 5.3 Endpoint de Recomendações 

```https://api.spotify.com/v1/recommendations```

Como uma funcionalidade a mais que poderia interessar os usuários, também foi utilizado o endpoint de recomendações que utiliza o algoritmo próprio de Machine Learning do Spotify para entender quais músicas teriam mais afinidade com aquelas que são passadas como parâmetros de busca nesse endpoint. Nessa requisição, é obrigatório o envio de algum dado do Spotify que o algoritmo possa se basear para fazer as suas recomendações, podendo ser artistas de referência, estilos musicais de referência ou músicas de referência.

Como as recomendações seriam para um usuário específico, entendeu-se que poderia ser utilizado como referência as próprias respostas das requisições anteriores, que já estavam fazendo uma busca sobre os artistas mais ouvidos do usuário e suas músicas mais tocadas recentemente. Assim, no parâmetro de busca "seed_artists", foi passado os id's dos 5 artistas mais ouvidos pelo usuário nos últimos 6 meses, criando recomendações que não sejam efêmeras só baseadas no estilo atual do usuário.

# 6. Testes: Como rodar

Para deixar a aplicação mais confiável quanto ao que ela se propõe a fazer, foram utilizados testes ao longo de todo desenvolvimento usando a biblioteca  Jest e a biblioteca React Testing Library. Por isso foi dado um enfoque ainda maior ao fato de que as funcionalidades deveriam ter o máximo de desacoplamento possível umas das outras para garantir que os testes unitários pudessem ser feitos de uma forma mais tranquila reduzindo o uso de mocks e, por consequência, conseguindo testar melhor como funcionam num ambiente real.

Por ter sido construída usando NextJS e React, que são tecnologias baseadas no paradigma de programação funcional, o desacoplamento e a criação de funções puras (leia-se: mais testáveis) já são incentivadas desde pelas suas próprias documentações. Assim, foram criados testes unitários para todos os componentes da aplicação e estão sendo desenvolvidos testes integrados mais aficazes para as páginas do site e para as funções críticas como as funções que lançam requisições e as funções de autenticação.

Para se testar a aplicação inteira de uma só vez, pode-se usar o comando ```npm run test```, mas também pode-se rodar os testes individualmente para cada componente/página/função.

## 6.1 Teste individual de componente

Todos os componentes visuais da aplicação que compõem as páginas estão localizados na pasta ```./src/app/components``` e cada um deles é estruturado da seguinte forma:

```
./componente
  ├── __test__/
  │      └── Componente.test.js
  │
  ├── Componente.js
  └── Componente.module.scss
```

Assim, também é possível rodar um teste individualmente para cada componente porque cada componente tem o seu próprio arquivo de teste dentro da sua pasta. Para isso, se pode usar o comando ```npm run test ./src/app/components/<nome-do-componente>```

## 6.2 Teste de uma página específica

Da mesma forma que os componentes, as páginas do site também possuem cada uma o seu próprio arquivo de teste e podem ser executados separadamente. As páginas do site ficam localizadas dentro da pasta ```./src/app```, sendo que todas as pastas que não comecem com ```./api``` ou ```./components``` são interpretadas pelo NextJS como páginas do site. Atualmente, existem as páginas Login e Songs.

Suas pastas são estruturadas da seguinte forma: 

```
./nome-da-pagina
  ├── __test__/
  │      └── nome-da-pagina.test.js
  │
  ├── page.js
  └── page.module.scss
```

Assim, para rodar os testes de uma página específica, pode-se usar o comando ```npm run test ./src/app/<nome-da-pagina>```

# 7. Decisões Técnicas 

