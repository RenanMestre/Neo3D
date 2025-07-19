// Loader e transição de fade-in ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    document.body.classList.add('loaded');
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
    }, 600);
});

// Desabilita teclas de atalho para inspeção de código (F12, Ctrl+Shift+I/J, Ctrl+U)
document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "u")) {
        event.preventDefault();
    }
});

// Atualiza contador de caracteres do campo "observações" em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('observacoes');
    const contador = document.getElementById('observacoes-contador');
    const max = textarea.maxLength;

    textarea.addEventListener('input', function() {
        const restante = max - textarea.value.length;
        contador.textContent = `${restante} caracteres restantes`;
    });
});

// Atualiza contador de caracteres do campo "pedido" em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('pedido');
    const contador = document.getElementById('pedido-contador');
    const max = textarea.maxLength;

    textarea.addEventListener('input', function() {
        const restante = max - textarea.value.length;
        contador.textContent = `${restante} caracteres restantes`;
    });
});

// Função utilitária para atualizar contadores de caracteres (não usada nos eventos acima)
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

// Reseta os contadores ao resetar o formulário
document.getElementById('formContato').addEventListener('reset', function() {
    document.getElementById('pedido-contador').textContent = '100 caracteres restantes';
    document.getElementById('observacoes-contador').textContent = '150 caracteres restantes';
});

// Mascara o campo de telefone enquanto o usuário digita
document.getElementById('telefone').addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    // Aplica a máscara (formato: (xx) xxxxx-xxxx)
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

// Envia o formulário para o WhatsApp ao clicar em "Enviar"
document.getElementById("formContato").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const pedido = document.getElementById("pedido").value;
    const observacoes = document.getElementById("observacoes").value;

    // Monta a mensagem para o WhatsApp
    const mensagem = `Olá! Meu nome é *${nome}*, prazer em conhecê-lo!\n\n*Email:* ${email}\n*Telefone:* ${telefone}\n*Pedido:* ${pedido}\n*Observações:*\n${observacoes}`;

    // Número do responsável criptografado em Base64
    const numeroResponsavelCripto = "NTUxMTk4NDU0Nzg4NA==";

    // Função para decodificar Base64
    function decodificar(str) {
        return atob(str);
    }
    
    // Decodifica o número do responsável
    const numeroResponsavel = decodificar(numeroResponsavelCripto);

    // Monta o link do WhatsApp com a mensagem pronta
    const link = `https://wa.me/${numeroResponsavel}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp em nova aba
    window.open(link, '_blank');
});

// Altera o fundo do header para transparente ao rolar a página
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 60) {
        header.classList.add('transparent');
    } else {
        header.classList.remove('transparent');
    }
});

// Menu hamburguer: abre/fecha o menu em dispositivos móveis
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Fecha o menu mobile ao clicar em qualquer link do menu
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});
