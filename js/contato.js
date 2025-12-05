function enviarMensagem() {

    let nome = $("#nome").val();
    let email = $("#email").val();
    let mensagem = $("#msg").val(); 

    let objetoMensagem = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    inserirMensagem(objetoMensagem);

    alert("Mensagem enviada com sucesso!");
}
