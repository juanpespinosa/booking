var Reserva = function(horario, cantidad, precio, codigo) {
  this.horario = horario;
  this.cantidadDePersonas = cantidad;
  this.precioPersona = precio;
  this.codigo = codigo;
};

//PRECIOS

Reserva.prototype.calcularPrecioBase = function() {
  return this.cantidadDePersonas * this.precioPersona;
};

Reserva.prototype.calcularPrecioFinal = function() {
  return this.calcularPrecioBase() + this.adicionalFinal() - this.descuentoFinal();
};


//DESCUENTOS

Reserva.prototype.aplicarDescuentoXPersona = function() {
  let descuentoXPersonas = 0;

  if (this.cantidadDePersonas.length >= 4 && this.cantidadDePersonas.length <= 6) {
    descuento = this.calcularPrecioBase() * 5 / 100;
  } else if (this.cantidadDePersonas.length >= 7 && this.cantidadDePersonas.length <= 8) {
    descuento = this.calcularPrecioBase() * 10 / 100;
  } else if (this.cantidadDePersonas.length > 8) {
    descuento = this.calcularPrecioBase() * 15 / 100;
  }

  return descuentoXPersonas;
};

Reserva.prototype.aplicarDescuentoCodigo = function() {
  let descuentoXCodigo = 0;

  if (this.codigo == "DES15") {
    descuentoXCodigo = this.calcularPrecioBase() * 15 / 100;
  } else if (this.codigo == "DES200") {
    descuentoXCodigo = 200;
  } else if (this.codigo == "DES1") {
    descuentoXCodigo = this.precioPersona();
  } else {
    descuentoXCodigo = 0;
  }
  return descuentoXCodigo;
};

Reserva.prototype.descuentoFinal = function() {
  return this.aplicarDescuentoCodigo() + this.aplicarDescuentoXPersona();
};

//ADICIONALES
/*
Adicional por horario: las franjas horarias de 13 a 14 y de 20 a 21 horas son muy concurridas. Se agrega un adicional del 5% si la reserva fue hecha para un horario dentro de esos rangos.
Adicional por fin de semana: si la reserva fue realizada para alguno de los días del fin de semana (viernes, sábado o domingo) se le agrega un adicional del 10%.*/
Reserva.prototype.adicionalHorario = function() {
  let adicional = 0;
  let hora = this.horario.getHours();

  if ((hora >= 13 && hora <= 14) || (hora >= 20 && hora <= 21)) {
    adicional = this.calcularPrecioBase() * 5 / 100;
  }
  return adicional;
};

Reserva.prototype.adicionalDia = function() {
  let adicional = 0;
  let dia = this.horario.getDay();

  if (dia == 5 || dia == 6 || dia == 0) { // Viernes = 5 / Sabado = 6 / Domingo = 0
    adicional = this.calcularPrecioBase() * 10 / 100;
  }
  return adicional;
};

Reserva.prototype.adicionalFinal = function() {
  return this.adicionalHorario() + this.adicionalDia();
};
