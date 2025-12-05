function fazerLogin() {

    let email = $("#email").val();
    let senha = $("#senha").val();

    let objLogin = {
        email: email,
        senha: senha
    };

    let valido = validarUsuario(objLogin);

    if (valido === true) {
        // Salva no navegador que está logado
        localStorage.setItem("logado", "true");

        // Redireciona para mensagens
        window.location.href = "mensagem.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}