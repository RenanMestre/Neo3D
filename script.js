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

// ...existing code...

// Loader e transição de fade-in
window.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    document.body.classList.add('loaded');
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
    }, 600);
});