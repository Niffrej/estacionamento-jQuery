class Veiculo {
    constructor(placa, horarioEntrada) {
        this.placa = placa;
        this.horarioEntrada = horarioEntrada;
        this.horarioSaida = null;
        this.tempoEstacionado = null;
        this.valorPagar = null;
    }

    registrarSaida(horarioSaida) {
        this.horarioSaida = horarioSaida;
        let { tempoFormatado, totalMinutos } = Calculadora.calcularTempo(this.horarioEntrada, this.horarioSaida);
        this.tempoEstacionado = tempoFormatado;
        this.valorPagar = Calculadora.calcularValor(totalMinutos);
    }

    gerarRecibo() {
        return new Recibo(this);
    }
}
