//Bloqueando acesso de quem não é logado
if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
}

// Local fallback para mensagens visualizadas
const LOCAL_VIS_KEY = "mensagens_visualizadas";

function getVisualizadasLocal() {
    const raw = localStorage.getItem(LOCAL_VIS_KEY);
    try {
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveVisualizadasLocal(arr) {
    localStorage.setItem(LOCAL_VIS_KEY, JSON.stringify(arr));
}

function isVisualizadaLocal(id) {
    const arr = getVisualizadasLocal();
    return arr.includes(String(id));
}

function addVisualizadaLocal(id) {
    const arr = getVisualizadasLocal();
    const sid = String(id);
    if (!arr.includes(sid)) {
        arr.push(sid);
        saveVisualizadasLocal(arr);
    }
}

function removeVisualizadaLocal(id) {
    const sid = String(id);
    let arr = getVisualizadasLocal();
    arr = arr.filter(x => x !== sid);
    saveVisualizadasLocal(arr);
}

function carregarMensagens() {
    let lista = obterMensagens(); 

    let tbody = document.querySelector("#listaMensagens");
    tbody.innerHTML = "";

    lista.forEach((msg) => {  
        // combina estado vindo do servidor com fallback local
        const localVis = isVisualizadaLocal(msg.id);
        const vis = msg.visualizada || localVis;
        const fontWeight = vis ? 'normal' : 'bold';
        const btnText = vis ? 'Desmarcar' : 'Marcar como lida';

        let linha = `
            <tr style="font-weight: ${fontWeight};">
                <td>${msg.nome}</td>
                <td>${msg.email}</td>
                <td>${msg.mensagem}</td>
                <td>
                    <button class="btn-visualizar" onclick="visualizarMensagem('${msg.id}')">${btnText}</button>
                </td>
                <td>
                    <button class="btn-excluir" onclick="excluirMensagem('${msg.id}')">Excluir</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += linha;
    });
}


function visualizarMensagem(id) {  
    if (confirm("Deseja marcar esta mensagem como visualizada?")) {
        // tenta no servidor primeiro
        try {
            const ok = marcarVisualizada(id);
            if (ok) {
                carregarMensagens();
                return;
            }
        } catch (e) {
            console.error('marcarVisualizada threw', e);
        }

        // fallback local: alterna o estado no localStorage
        if (isVisualizadaLocal(id)) {
            removeVisualizadaLocal(id);
            alert('Mensagem desmarcada localmente.');
        } else {
            addVisualizadaLocal(id);
            alert('Mensagem marcada como visualizada (salvo localmente).');
        }
        carregarMensagens();
    }
}

// Excluir
function excluirMensagem(id) {
    console.log("excluirMensagem() chamada com id =", id);

    if (!confirm("Tem certeza que deseja excluir esta mensagem?")) {
        console.log("Usuário cancelou exclusão.");
        return;
    }

    let ok = deletarMensagem(id); // chama a do api.js

    console.log("Resposta deletarMensagem:", ok);

    if (ok) {
        alert("Mensagem excluída!");
        carregarMensagens();
    } else {
        alert("Erro ao excluir. Veja o console para mais detalhes.");
    }
}



carregarMensagens();

function sair() {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}