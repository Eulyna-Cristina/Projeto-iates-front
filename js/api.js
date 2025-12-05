function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function () {
        return retorno;
    });

    consulta.done(function (data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(mensagem) {

    var sucesso = false;

    $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    }).done(function (data, textStatus, jqXHR) {
        sucesso = true;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("POST FAIL - status:", jqXHR && jqXHR.status, "error:", errorThrown);
        sucesso = false;
    });

    return sucesso;
}

function validarUsuario(objLoginSenha) {

    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function () {
        return retorno;
    });

    validacao.done(function (data) {
        retorno = data;
    });

    return retorno;
}

function deletarMensagem(id) {
    console.log("api.deletarMensagem() chamada com id =", id);

    var sucesso = false;

    $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens/' + id,
        method: 'DELETE',
        async: false
    }).done(function (resp, textStatus, jqXHR) {
        console.log("DELETE OK - status:", jqXHR.status, "resp:", resp);
        sucesso = true;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("DELETE FAIL - status:", jqXHR && jqXHR.status, "textStatus:", textStatus, "error:", errorThrown, "responseText:", jqXHR && jqXHR.responseText);
        sucesso = false;
    });

    console.log("api.deletarMensagem() retornando:", sucesso);
    return sucesso;
}

function marcarVisualizada(id) {
    console.log("api.marcarVisualizada() chamada com id =", id);

    var sucesso = false;

    
    console.log("Tentando com POST...");
    $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens/' + id + '/visualizar',
        method: 'POST',
        async: false,
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify({ visualizada: true })
    }).done(function (data) {
        console.log("POST /visualizar sucesso - data:", data);
        sucesso = true;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("POST /visualizar FAIL - status:", jqXHR && jqXHR.status, "error:", errorThrown);
        
        console.log("Tentando com PUT no endpoint raiz...");
        $.ajax({
            url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens/' + id,
            method: 'PUT',
            async: false,
            contentType: 'application/json',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: JSON.stringify({ visualizada: true })
        }).done(function (data) {
            console.log("PUT sucesso - data:", data);
            sucesso = true;
        }).fail(function (jqXHR2, textStatus2, errorThrown2) {
            console.error("PUT FAIL - status:", jqXHR2 && jqXHR2.status, "error:", errorThrown2);
            sucesso = false;
        });
    });

    console.log("api.marcarVisualizada() retornando:", sucesso);
    return sucesso;
}


