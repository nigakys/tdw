const BASE_URL = "http://localhost:4000/";
var mongo = require("mongodb");

function GetProdutos() {
  return fetch(BASE_URL + "produtos/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

function GetVariantesProduto(id) {
  return fetch(BASE_URL + "variantes/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {

      return [];
    }

    return response.json();
  });
}



function GetUniqueProduto(id) {
  return fetch(BASE_URL + "produtos/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

function GetTipoProduto(tipo) {
  return fetch(BASE_URL + "produtos/tipo/" + tipo, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

function GetSortProdutoPreco(preco) {
  return fetch(BASE_URL + "produtos/preco/" + preco, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

function criarProduto(produto, imagem) {
  return fetch(BASE_URL + "produtos/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    uploadImagem(imagem)
    return response.json();
  });
}

function updateProduto(_id, produto, imagem) {

  var id = new mongo.ObjectID(_id);
  return fetch(BASE_URL + "produtos/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }

    uploadImagem(imagem)
    return response.json();
  });
}

function uploadImagem(imagem) {
  return fetch(BASE_URL + "produtos/imagem", {
    method: "POST",
    body: imagem,
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return "success";
  });
}

function GetUser(user) {
  return fetch(BASE_URL + "users/" + user, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  }).catch((error) => { 
    console.log(error);
    return 2; })
}

function deleteProduto(_id, list) {
  var id = new mongo.ObjectID(_id);
  return fetch(BASE_URL + "produtos/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}



function criarUser(user) {
  return fetch(BASE_URL + "users/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response;
  });
}

function upadateUser(id, list) {
  return fetch(BASE_URL + "users/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

function GetEmail(email) {
  return fetch(BASE_URL + "users/email/" + email, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      return null;
    }
    return response;
  }).catch((error)=>{
    console.log(error)
  })
}

function GetUniqueUser(id) {
  return fetch(BASE_URL + "users/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}


function criarCarrinho(list) {
  return fetch(BASE_URL + "carrinho/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

function upadateCarrinho(id, list) {
  return fetch(BASE_URL + "produtos/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

var funcoes = {
  GetProdutos,
  criarProduto,
  updateProduto,
  deleteProduto,
  criarCarrinho,
  upadateCarrinho,
  criarUser,
  GetUser,
  GetUniqueProduto,
  GetEmail,
  GetTipoProduto,
  GetSortProdutoPreco,
  upadateUser,
  GetUniqueUser,
  GetVariantesProduto,
  uploadImagem,
}

export default funcoes;