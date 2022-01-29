var produto = document.getElementById('selProduto')
var cor = document.getElementById('selCor')
var tamanho = document.getElementById('selTamanho')
var modelo = document.getElementById('selModelo')
var txtproduto = document.getElementById('txtProduto')
var txtpreco = document.getElementById('txtPreco')
var txtListaPedido = document.getElementById('txtListaPedidos')
var txtPrecoTotal = document.getElementById('txtTotal')

var listaOpcoes = [['Camisa Lisa', 'Imagens/ModeloLisa.png'], ['Camisa de Mercúrio', 'Imagens/ModeloMercurio.png'], ['Camisa de Vênus', 'Imagens/ModeloVenus.png'], ['Camisa da Terra','Imagens/ModeloTerra.png'], ['Camisa de Marte', 'Imagens/ModeloMarte.png'],['Modelo de Júpirter', 'Imagens/ModeloJupiter.png'], ['Modelo de Saturno', 'Imagens/ModeloSaturno.png'], ['Modelo de Urano', 'Imagens/ModeloUrano.png'], ['Modelo de Netuno', 'Imagens/ModeloNetuno.png'],['Modelo de Plutão', 'Imagens/ModeloPlutao.png']]


function janelaMascara(masc_color){
    if (masc_color=='black') {
        open('Modelopreto.html', '_blank','width=400, height=400')
    } else {
        open('Modelobranco.html', '_blank','width=400, height=400')
    }
}

function fechar(){
    close()
}

function visualizarCamisa(n){
    var camisa = document.getElementById('exemploCamisa')
    var imagem = document.createElement('img')
    camisa.innerHTML = '<p>'
    camisa.innerHTML = `<h1>${listaOpcoes[n][0]}</h1>`
    imagem.setAttribute('src', listaOpcoes[n][1])
    camisa.appendChild(imagem)
    camisa.innerHTML += '</p>'
}

function ehMascara(prod){
    if (prod == 'Masc. Lisa' || prod == 'Masc. Cometa') {
        return true
    } else {
        return false
    }
}

function selecionar(){
    cor.disabled = false
    var cores = cor.getElementsByTagName('option')
    
    if (produto.value =='---'){
        limparCampos()
        return
    }

    if (ehMascara(produto.value)) {
        for (let opt in cores){
            if (cores[opt].value == 'Azul' || cores[opt].value == 'Lilas'){
                cores[opt].disabled = true
            }
        }
        tamanho.disabled = true
        tamanho.value = tamanho[0].value
        modelo.disabled = true
        modelo.value = modelo[0].value
        if (cor.value == 'Azul' || cor.value =='Lilas'){
            cor.value = cor[0].value
        }
    } else {
        for (let opt in cores){
            if (cores[opt].value == 'Azul' || cores[opt].value == 'Lilas'){
                cores[opt].disabled = false
            }
        tamanho.disabled = false
        modelo.disabled = false
        }
    }
    produtoPrevia()
}

function limparCampos(){
    cor.disabled = true
    tamanho.disabled = true
    modelo.disabled = true
    tamanho.value = tamanho[0].value
    modelo.value = modelo[0].value
    cor.value = cor[0].value
    produto.value = produto[0].value
    txtpreco.value = ''
    txtproduto.value = ''
}

function produtoPrevia(){
    let compras = []
    txtpreco.value = ''
    let preco
    if (produto.value == 'Masc. Lisa' || produto.value == 'Masc. Cometa') {
        compras = [produto.value, cor.value]
        preco = 35
    } else {
        compras = [produto.value, cor.value, tamanho.value, modelo.value]
        preco = 70
    }
    txtproduto.value = ''

    if (estaPronto(compras)){
        for (opt in compras){
            txtproduto.value += `${compras[opt]}`
            if (opt != (compras.length - 1)){
                txtproduto.value += ' - '
            }
        }
        txtpreco.value = preco
    }
}

function estaPronto(compra){
    if (compra.length == 0){
        return false
    }
    for (opt in compra) {
        if (compra[opt] == '---'){
            return false
        }
    }
    return true
}

function comprar(){
    if (!txtproduto.value.length == 0){
        txtListaPedido.value += `${txtproduto.value}\n` 
        txtPrecoTotal.value = Number(txtPrecoTotal.value) + Number(txtpreco.value)
        limparCampos()
    } else {    
        alert('Descrição do produto não está completa!')
    }
}

document.body.addEventListener('change', selecionar)