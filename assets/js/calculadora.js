class Calculadora {
  static TAXA_POR_HORA = 5.00;

  static calcularTempo(entrada, saida) {
      let [h1, m1] = entrada.split(":").map(Number);
      let [h2, m2] = saida.split(":").map(Number);

      let minutosEntrada = h1 * 60 + m1;
      let minutosSaida = h2 * 60 + m2;

      let totalMinutos = minutosSaida - minutosEntrada;
      let horas = Math.floor(totalMinutos / 60);
      let minutos = totalMinutos % 60;

      return { 
          tempoFormatado: `${horas}h ${minutos}min`, 
          totalMinutos 
      };
  }

  static calcularValor(totalMinutos) {
      return (totalMinutos / 60) * this.TAXA_POR_HORA;
  }
}
