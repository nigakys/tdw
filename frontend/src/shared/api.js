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

function GetProdutoByRef(ref) {
  return fetch(BASE_URL + "produtos/ref/" + ref, {
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

function GetProdutoById(id) {
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

function GetSortProdutoPreco(order) {
  return fetch(BASE_URL + "produtos/preco/" + order, {
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
    uploadImagemProduto(imagem)
    return response.json();
  });
}

function criarVariante(variante) {
  console.log(variante)
  return fetch(BASE_URL + "variantes/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variante),
  }).then((response) => {
    if (response.status !== 200) {
      return null;
    }
    return true;
  }).catch(() => {
  })
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
    if (imagem != null) {
      uploadImagemProduto(imagem)
    }
    return "sucess";
  });
}

function uploadImagemProduto(imagem) {
  return fetch(BASE_URL + "produtos/imagem", {
    method: "POST",
    body: imagem,
  }).then((response) => {
    if (response.status !== 200) {
      return null;
    }
    return "success";
  }).catch((error) => {
    console.log(error)
  })
}

function updateVariante(_id, stock) {
  var id = new mongo.ObjectID(_id);
  return fetch(BASE_URL + "variantes/stock/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stock),
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return "sucess";
  });
}

function criarEncomenda(encomenda) {
  return fetch(BASE_URL + "encomendas/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encomenda),
  }).then((response) => {
    if (response.status !== 200) {
      return null;
    }
    return "success";
  }).catch((error) => {
    console.log(error)
  })
}

function GetEncomendas() {
  return fetch(BASE_URL + "encomendas/", {
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

function GetEncomendasByUserId(id) {
  return fetch(BASE_URL + "encomendas/" + id, {
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

function uploadImagemVariante(imagem) {
  console.log("ola" + imagem)
  return fetch(BASE_URL + "variantes/imagem", {
    method: "POST",
    body: imagem,
  }).then((response) => {
    if (response.status !== 200) {
      return null;
    }
    return "success";
  }).catch(() => {
  })
}


function GetCategorias() {
  return fetch(BASE_URL + "atributos/categorias/", {
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

function GetVariantes() {
  return fetch(BASE_URL + "variantes/", {
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

function CriarCategoria(atributo) {
  console.log(atributo)
  return fetch(BASE_URL + "atributos/categorias/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(atributo),
  }).then((response) => {
    if (response.status !== 200) {
      return null;
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
      return null;
    }
    return response.json();
  }).catch((error) => {
    console.log(error);
    return 2;
  })
}

function DeleteProduto(_id) {
  var id = new mongo.ObjectID(_id);
  return fetch(BASE_URL + "produtos/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  }).then((response) => {
    if (response.status !== 200) {
      return [];
    }
    return response.json();
  });
}

function DeleteVariante(_id) {
  var id = new mongo.ObjectID(_id);
  return fetch(BASE_URL + "variantes/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  }).then((response) => {
    if (response.status !== 200) {
      return null;
    }
    return true;
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

function updateMorada(morada, id) {
  return fetch(BASE_URL + "users/updatemorada/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(morada),
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
  }).catch((error) => {
    console.log(error)
  })
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
  DeleteProduto,
  DeleteVariante,
  criarCarrinho,
  upadateCarrinho,
  criarUser,
  GetUser,
  GetProdutoById,
  GetEmail,
  GetTipoProduto,
  GetSortProdutoPreco,
  upadateUser,
  GetVariantesProduto,
  updateMorada,
  criarVariante,
  GetCategorias,
  CriarCategoria,
  uploadImagemVariante,
  GetProdutoByRef,
  criarEncomenda,
  GetVariantes,
  updateVariante,
  GetEncomendas,
  GetEncomendasByUserId,
}

export default funcoes;