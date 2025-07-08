// Loader e transição de fade-in
window.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    document.body.classList.add('loaded');
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
    }, 600);
});

// Desabilitando teclas para a segurança do site
document.addEventListener("keydown", function(event) {
    // Desabilitando F12, Ctrl+Shift+I que são inspeção de código, Ctrl+Shift+J e Ctrl+U para console e ver fonte
    // Isso é uma medida de segurança para evitar que usuários vejam o código fonte do site
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "u")) {
        event.preventDefault();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('observacoes');
    const contador = document.getElementById('observacoes-contador');
    const max = textarea.maxLength;

    textarea.addEventListener('input', function() {
        const restante = max - textarea.value.length;
        contador.textContent = `${restante} caracteres restantes`;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('pedido');
    const contador = document.getElementById('pedido-contador');
    const max = textarea.maxLength;

    textarea.addEventListener('input', function() {
        const restante = max - textarea.value.length;
        contador.textContent = `${restante} caracteres restantes`;
    });
});

// Atualiza contador ao digitar
function updateCounter(textareaId, counterId, max) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    textarea.addEventListener('input', function() {
    const restante = max - textarea.value.length;
    counter.textContent = `${restante} caracteres restantes`;
    });
}
updateCounter('pedido', 'pedido-contador', 100);
updateCounter('observacoes', 'observacoes-contador', 150);

// Reseta contador ao resetar o form
document.getElementById('formContato').addEventListener('reset', function() {
    document.getElementById('pedido-contador').textContent = '100 caracteres restantes';
    document.getElementById('observacoes-contador').textContent = '150 caracteres restantes';
});

// Mascarando o telefone da pessoa
document.getElementById('telefone').addEventListener('input', function (e) {
  let valor = e.target.value.replace(/\D/g, ''); // remove tudo que não for número

  if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos

  // Aplica a máscara
  if (valor.length > 0) {
    valor = '(' + valor;
  }
  if (valor.length > 3) {
    valor = valor.slice(0, 3) + ') ' + valor.slice(3);
  }
  if (valor.length > 10) {
    valor = valor.slice(0, 10) + '-' + valor.slice(10);
  }

  e.target.value = valor;
});

// Enviando o foormulário para o WhatsApp
document.getElementById("formContato").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const pedido = document.getElementById("pedido").value;
    const observacoes = document.getElementById("observacoes").value;

    // Criando a mensagem para o WhatsApp
    const mensagem = `Olá! Meu nome é *${nome}*, prazer em conhecê-lo!\n\n*Email:* ${email}\n*Telefone:* ${telefone}\n*Pedido:* ${pedido}\n*Observações:*\n${observacoes}`;

    // Número do responsável criptografado Base64
    const numeroResponsavelCripto = "NTUxMTk4NDU0Nzg4NA==";

    // Função para decodificar Base64
    function decodificar(str) {
        return atob(str);
    }
    
    // Carregar o número depois de decodificar
    const numeroResponsavel = decodificar(numeroResponsavelCripto);

    // Monta o link do WhatsApp
    const link = `https://wa.me/${numeroResponsavel}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp com a mensagem pronta
    window.open(link, '_blank');
});

