
const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.substring(0, 11);

  if (valor.length > 9)
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  else if (valor.length > 6)
    valor = valor.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  else if (valor.length > 3)
    valor = valor.replace(/(\d{3})(\d+)/, "$1.$2");

  e.target.value = valor;
});


const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.substring(0, 11);

  if (valor.length > 6)
    valor = valor.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
  else if (valor.length > 2)
    valor = valor.replace(/(\d{2})(\d+)/, "($1) $2");

  e.target.value = valor;
});


function permitirApenasLetras(campo) {
  campo.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
  });
}

permitirApenasLetras(document.getElementById("nome"));
permitirApenasLetras(document.getElementById("contatoNome"));



const idadeInput = document.getElementById("idade");

idadeInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});


const radios = document.querySelectorAll('input[name="detalhes"]');
const detalhesDiv = document.getElementById("detalhesExtras");

radios.forEach(radio => {
  radio.addEventListener("change", function () {
    if (this.value === "sim") {
      detalhesDiv.style.display = "block";
    } else {
      detalhesDiv.style.display = "none";
    }
  });
});


document.getElementById("formAdmissao")
  .addEventListener("submit", function (e) {

    let valido = true;

    
    const nome = document.getElementById("nome");
    const idade = document.getElementById("idade");
    const cpf = document.getElementById("cpf");
    const contatoNome = document.getElementById("contatoNome");
    const telefone = document.getElementById("telefone");
    const sintomas = document.getElementById("sintomas");

    
    document.querySelectorAll(".erro").forEach(el => el.innerText = "");

    function erro(campoErroId, mensagem) {
      document.getElementById(campoErroId).innerText = mensagem;
      valido = false;
    }

    if (nome.value.trim() === "")
      erro("erroNome", "⚠ Nome é obrigatório.");

   
    if (idade.value.trim() === "")
      erro("erroIdade", "⚠ Idade é obrigatória.");

    
    const cpfNumeros = cpf.value.replace(/\D/g, "");
    if (cpfNumeros.length !== 11)
      erro("erroCpf", "⚠ CPF deve conter 11 dígitos.");

  
    if (contatoNome.value.trim() === "")
      valido = false, alert("⚠ Nome do contato de emergência é obrigatório.");

    const telefoneNumeros = telefone.value.replace(/\D/g, "");
    if (telefoneNumeros.length !== 11)
      valido = false, alert("⚠ Telefone deve conter 11 dígitos.");

    
    if (sintomas.value.trim() === "")
      erro("erroSintomas", "⚠ Descreva os sintomas.");

    if (!valido)
      e.preventDefault();
});