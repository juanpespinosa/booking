var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
  this.id = id;
  this.nombre = nombre;
  this.rubro = rubro;
  this.ubicacion = ubicacion;
  this.horarios = horarios;
  this.imagen = imagen;
  this.calificaciones = calificaciones;
};

Restaurant.prototype.reservarHorario = function(horarioReservado) {
  this.horarios = this.horarios.filter(function(reserva) {
    return reserva !== horarioReservado;                     //Refactorizado
  });
};

Restaurant.prototype.calificar = function(nuevaCalificacion) {
  if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
    this.calificaciones.push(nuevaCalificacion);
  }
};

Restaurant.prototype.obtenerPuntuacion = function() {
  if (this.calificaciones.length === 0) {
    return 0;
  } else {
    var promedio = this.promedio(this.calificaciones);
    return promedio;
  }
};

Restaurant.prototype.sumatoria = function(numeros) {
  let suma = numeros.reduce(function(acumulador, valorActual) {
    return acumulador + valorActual;
  });
  return suma;
};

Restaurant.prototype.promedio = function(numeros) {
  let suma = this.sumatoria(numeros);
  let promedio = suma / numeros.length;
  return Math.round(promedio * 10) / 10;
};
