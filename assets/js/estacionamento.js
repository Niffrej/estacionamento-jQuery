class Estacionamento {
    constructor() {
        this.veiculos = Storage.carregarVeiculos();
        this.init();
    }

    init() {
        this.carregarVeiculos();
        this.adicionarEventos();
    }

    carregarVeiculos() {
        $("#lista-veiculos").empty();
        this.veiculos.forEach((veiculo, index) => {
            this.adicionarLinha(veiculo, index);
        });
    }

    adicionarLinha(veiculo, index) {
        let linha = `
            <tr data-index="${index}">
                <td>${veiculo.placa}</td>
                <td>${veiculo.horarioEntrada}</td>
                <td>${veiculo.horarioSaida || "--"}</td>
                <td>${veiculo.tempoEstacionado || "--"}</td>
                <td>${veiculo.valorPagar ? `R$ ${veiculo.valorPagar.toFixed(2)}` : "--"}</td>
                <td>
                    ${!veiculo.horarioSaida ? `<button class="btn-saida">Registrar Saída</button>` : ""}
                    ${veiculo.horarioSaida ? `<button class="btn-recibo">Gerar Recibo</button>` : ""}
                    <button class="btn-remover">Remover</button>
                </td>
            </tr>`;

        $("#lista-veiculos").append(linha);
    }

    registrarEntrada() {
        let placa = $("#placa").val().toUpperCase();
        let horarioEntrada = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (placa === "") {
            alert("Por favor, digite a placa do veículo!");
            return;
        }

        let veiculo = new Veiculo(placa, horarioEntrada);
        this.veiculos.push(veiculo);
        Storage.salvarVeiculos(this.veiculos);

        this.adicionarLinha(veiculo, this.veiculos.length - 1);
        $("#placa").val("");
    }

    registrarSaida(index) {
        let horarioSaida = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        this.veiculos[index].registrarSaida(horarioSaida);
        Storage.salvarVeiculos(this.veiculos);
        this.carregarVeiculos();
    }

    removerVeiculo(index) {
        this.veiculos.splice(index, 1);
        Storage.salvarVeiculos(this.veiculos);
        this.carregarVeiculos();
    }

    gerarRecibo(index) {
        let veiculo = this.veiculos[index];
        let recibo = veiculo.gerarRecibo();
        alert(recibo.gerar());
    }

    adicionarEventos() {
        $("#registrar").click(() => this.registrarEntrada());

        $("#lista-veiculos").on("click", ".btn-saida", (event) => {
            let index = $(event.target).closest("tr").data("index");
            this.registrarSaida(index);
        });

        $("#lista-veiculos").on("click", ".btn-remover", (event) => {
            let index = $(event.target).closest("tr").data("index");
            this.removerVeiculo(index);
        });

        $("#lista-veiculos").on("click", ".btn-recibo", (event) => {
            let index = $(event.target).closest("tr").data("index");
            this.gerarRecibo(index);
        });
    }
}

$(document).ready(function () {
    new Estacionamento();
});
