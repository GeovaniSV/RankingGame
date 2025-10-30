# Ranking Game App

O **Ranking Game App** é um aplicativo mobile desenvolvido em **React Native com Expo** onde o usuário é capaz de Criar, Visualizar a Avaliar jogos, sendo possível dar nota e comentários.

O projeto teve como foco o aprendizado dos desenvolvedores com o consumo de APIs e gerenciamento de **Estados** React, com uma interface responsiva utilizando **NativeWind**.

Foi utilizada uma API externa criada pelo grupo de desenvolvedores do presente projeto, essa API está disponível nesse perfil no repositório [`ranking-game-api`](https://github.com/GeovaniSV/ranking-game-api) lá você conseguirá encontrar o README da API, que também serve como uma breve documentação.

Esse README será utilizado como base de documentação, onde será explicado o objetivo do sistema, como ele foi desenvolvido e como você consegue copiar e rodar o projeto na sua máquina.


## Objetivos do sistema
O principal objetivo do Ranking Game App, é a possibilidade de criar uma card com a avaliação do usuário dentro do contexto de jogos. Para isso o usuário precisa inserir a foto, o nome do jogo, seu comentário e a nota que o jogo irá receber.

Esse card não será publicado pois a aplicação é somente para uso local, onde você terá os dados guardados na API somente para fins de segurança. Isso faz com que não tenhamos a necessidade de enviar as fotos para um serviço de armazenamento online, a imagem é adicionada ao Sistema de Arquivos do próprio aparelho utilizando a biblioteca `expo-file-system/legacy`, e a aplicação salva no banco de dados apenas a URI da imagem.   

---

# Tecnologias utilizadas
Para o desenvolvimento dessa aplicação foram utilizados tecnologias NodeJS modernas como `TypeScript`, `React Native + Expo` como framework, `NativeWind` que é a biblioteca do TailWind CSS para React Native.

## Funcionalidades
Das funcionalidades do app, se destacam:

- Cadastro e autenticação de usuários,
- Criação de novas **Reviews** personalizadas com persistenacia de dados e fotos, onde a foto é armazenada no armazenamento local do dispositivo do usuário _(no banco de dados somente é persistido a URI da imagem)_.
- Visualização dos cards das **Reviews** com scroll infinito.
- Visualização detalhada de cada **Review**, incluindo imagem, nome do jogo, nota e Review
- Exclusão de Review, excluindo a imagem do dispositivo, e o registro do banco de dados.

---

## Estrutura do Projeto

```plaintext
src/
├── Components/
│   ├── ButtonField.tsx         # Botão reutilizável com estilos padronizados
│   ├── GameCard.tsx            # Card com informações resumidas do jogo
│   ├── GameCardPreview.tsx     # Card padrão para quando o usuário não tiver nenhum card criado ainda.
│   ├── TextInputField.tsx      # Input de texto reutilizável com estilos padronizados
│   └── TitleRankingGame.tsx    # Título do APP estilizado para utilizar no topo das telas
│
├── Routes/
│    └── tab.routes.tsx          # Configuração de rotas com React Navigation - Stack Navigation
│
├── Screens/
│   ├── GameDetails.tsx         # Tela onde a Review é detalhada
│   ├── Home.tsx                # Tela inicial com listagem e scroll infinito
│   ├── Login.tsx               # Tela para autenticação de usuários
│   ├── NewGame.tsx             # Tela para criação de uma nova review
│   └── Register.tsx            # Tela para cadastro de novos usuários 
│
├── Services/
│   ├── api.ts                  # Funções para conectividade com APIs externas
│   ├── gameFunctions.tsx       # Funções para comunicação com a API nas rotas de Jogos (Reviews)
│   └── usersFunctions.tsx      # Funções para comunicação com a API nas rotas de usuários
│
├── Styles/
│   ├── colors.ts               # Cores padrões encapsuladas e enviadas para o NativeWind 
│   └── fontFamily.ts           # Fontes de texto padrões encapsuladas e enviadas para o NativeWind
│   
└── Types/
    └── gameTypes.ts            # Tipagens e interfaces do projeto
```

---

# Como funciona?

### Tela de Login

Ao entrar no APP, o usuário se depara com a tela de login. Para realizar o login, o usuário precisa digitar as informações nos campos definidos **_(Email e senha)_**. 

- Caso ele tenha uma conta a API retornará o `Access Token` gerado e o APP irá armazenar esse token em `AsyncStorage` e o usuário terá acesso a tela Home.

- Caso os campos obrigatórios - todos eles - não sejam preenchidos o sistema retornara o código `422 - Unprocessable Entity` com um array de erros informando quais campos não foram preenchidos, assim o APP informará através dos próprios campos quais erros foram encontrados.

- Caso o usuário não tenha uma conta a API retornará código `400 - Bad Request` mostrando ao usuário que suas credenciais são inválidas

- Caso o usuário não tenha uma conta e queira criar uma, ele clica no botão `Não tem uma conta ainda? Inscreva-se já!` e será redirecionado para a tela de **Registro**.

### Tela de Registro

Essa é a tela onde podemos cadastrar um usuário novo no sistema, serão necessários a inserção dos dados nos campos corretos **_(Nome, Email e Senha)_**

- Caso o email do usuário seja válido e não esteja cadastrado no sistema ainda, o email será registrado e o usuário será enviado para a tela de login.

- Caso os campos obrigatórios - todos eles - não sejam preenchidos o sistema retornara o código `422 - Unprocessable Entity` com um array de erros informando quais campos não foram preenchidos, assim o APP informará através dos próprios campos quais erros foram encontrados.

- Caso o email do usuário não seja válido, o sistema irá enviar uma mensagem de erro com o código `422 - Unprocessable Entity` informando que o email não é válido.

- Caso o email preenchido já esteja registrado no sistema, será retornado o código `409 - Conflict` informando que o usuário já está cadastrado no sistema

### Tela Home

Após o cadastro e a autenticação, o usuário irá cair na tela Home que possui um scroll infinito. 

A tela Home utiliza uma `FlatList` que carrega as reviews da API conforme o usuário se aproxima do final da lista `onReachEnd`

A API então poderá retornar duas respostas: 
- Reviews: caso a API ainda não tenha retornado todas as reviews, ela retornará mais 5 nesse processo, carregando a tela Home com mais 5 cards.

- 404: caso a API não tenha mais reviews para retornar, ela retorna o código `404 - Not Found` assim o APP entende que não há mais reviews a serem carregadas.

Além da listagem, na tela Home também temos o botão flutuante para ir para a tela de criação de novas reviews, e cada card na tela Home, ao ser clicado, leva o usuário para a tela de **`GameDetail`**

### Tela NewGame (Novo Jogo)

Nessa tela é onde o usuário consegue cadastrar uma **Review**, preenchendo os campos obrigatórios que são: **Imagem**, **Nome do Jogo**, **Review**, **Nota**

- Caso os campos sejam preenchidos da forma correta e a foto seja selecionada, a **Review** será cadastrada, a imagem será adicionada ao sistema de Arquivo local do usuário, a URI da imagem será enviada para o banco de dados e o usuário será enviado de volta para a tela inicial.

- Caso os campos obrigatórios - todos eles - não sejam preenchidos o sistema retornara o código `422 - Unprocessable Entity` com um array de erros informando quais campos não foram preenchidos, assim o APP informará através dos próprios campos quais erros foram encontrados.


### Tela GameDetail

Ao clicar em um card da tela inicial, o usuário será direcionado à tela de detalhes `GameDetail`.

Nessa tela é possível visualizar os detalhes do jogo como nome, Review e Nota. Além de ser possível deletar a **Review**.

- Caso o usuário clique no botão `Fechar`, ele será redirecionado para a tela inicial

- Caso o usuário clieque no botão `Apagar` abrirá um **Modal** pedindo a confirmação do usuário para apagar aquela review.
    - Caso usuário clique em `Cancelar`, o modal apenas será fechado.
    - Caso o usuário clique em `Apagar`, a **Review** será apagada e o usuário será redirecionado para a tela inicial

---
# Instalação e uso

Essa seção será utilizada para explicar como clonar este repositório e como rodar a aplicação no seu dispositivo. Para que a aplicação funcione com as funcionalidades de CRUD será necessário que você tenha a API funcionando localmente em sua máquina. Para mais informações sobre a API entre nesse link: [`ranking-game-api`](https://github.com/GeovaniSV/ranking-game-api).

### Clonando este repositório

Para clonar esse repositório você precisa ter o Git instalado.

Após a instalação do Git, vá a uma pasta do seu sistema que você queira clonar o projeto e digite: 
```bash
git clone https://github.com/GeovaniSV/RankingGame.git
```

Isso fará com que o projeto seja clonado do repositório remoto para sua pasta local. Entre no CMD dentro da pasta do projeto e digite: 
```bash
npm install
```
Isso fará a instalação de todas as dependências do projeto. Todas as dependencias que foram utilizadas no projeto estão no `package.json`, nesse arquivo também tem as informações do projeto e os scripts que podem ser utilizados para iniciá-lo.

após ter instalado todas as dependências, basta digitar no CMD o seguinte comando: 
```bash
npm start
```

Esse comando fará com que o Expo inicie o aplicativo.

Agora você apenas precisa instalar o aplicativo do Expo Go, e ler o QR Code que aparece no CMD após a inicialização do aplicativo.


