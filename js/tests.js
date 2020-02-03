var expect = chai.expect;

function mockRestaurant() {
  return new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
}

function mockListadoRestaurant() {
  var listadoDeRestaurantes = [
    new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
    new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
    new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
    new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
    new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
    new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
    new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
    new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
    new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
    new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6])
  ];
  return new Listado(listadoDeRestaurantes);
}

describe('Testear Reserva de Horarios', () => {
  let restaurant;
  let horariosCopia;
  let horarios;

  beforeEach(function() {
    restaurant = mockRestaurant();
    horariosCopia = [...restaurant.horarios];
    horarios = restaurant.horarios;
  });

  it('Si esta disponible el horario, lo elimina', function() {
    let horarioReserva = horarios[1];
    restaurant.reservarHorario(horarioReserva);
    expect(restaurant.horarios).that.does.not.include(horarioReserva);
  });

  it('Cuando se reserva un horario no disponible, el array se mantiene igual', function() {
    let horarioNoDisponible = '20:00';
    restaurant.reservarHorario(horarioNoDisponible);
    expect(horariosCopia).to.eql(restaurant.horarios);
  });

  it('Intenta reservar un horario sin pasar un parametro en la funcion, el array se mantiene igual', () => {
    restaurant.reservarHorario();
    expect(horariosCopia).to.eql(restaurant.horarios);
  });
});

describe('Testear Puntuacion', () => {
  let restaurant;

  beforeEach(function() {
    restaurant = mockRestaurant();
  });

  it('Dado un array, devuelve el promedio correctamente', () => {
    //[6, 7, 9, 10, 5]
    let promedioEsperado = 7.4;
    let promedioObtenido = restaurant.obtenerPuntuacion();
    expect(promedioObtenido).to.be.equal(promedioEsperado);
  });

  it('Dado un array vacío, devuelve el valor 0', () => {
    restaurant.calificaciones = [];
    let promedioObtenido = restaurant.obtenerPuntuacion();
    expect(promedioObtenido, 'Se rompio').to.be.equal(0);
  });
});

describe('Testear Calificaciones', () => {
  /*  1- Agrega una calificacion (8) y aparece en el arrray de calificaciones.
      2- Agrega un valor negativo y el array de calificaciones se mantiene igual.
      3- Agrega un valor con decimales y el array de calificaciones se mantiene igual.
      4- Agrega un valor string y el array de calificaciones se mantiene igual.*/
  let restaurant;

  beforeEach(function() {
    restaurant = mockRestaurant();
  });

  it('Agrega una calificacion (8) y aparece en el arrray de calificaciones', () => {
    let arrayCalificaciones = restaurant.calificaciones;
    restaurant.calificar(8);
    expect(arrayCalificaciones).that.does.include(8);
  });

  it('Agrega un valor negativo y el array de calificaciones se mantiene igual', () => {
    let arrayCalificaciones = restaurant.calificaciones;
    restaurant.calificar(-7);
    expect(arrayCalificaciones).that.does.not.include(-7);
  });

  it('Agrega un valor con decimales y el array de calificaciones se mantiene igual', () => {
    let arrayCalificaciones = restaurant.calificaciones;
    restaurant.calificar(7.6);
    expect(arrayCalificaciones).that.does.not.include(7.6);
  });

  it('Agrega un valor string y el array de calificaciones se mantiene igual', () => {
    let arrayCalificaciones = restaurant.calificaciones;
    restaurant.calificar('7');
    expect(arrayCalificaciones).that.does.not.include('7');
  });
});

describe('Testear Búsqueda de Restaurantes', () => {
  /*  1- Busca un ID existente y devuelve restaurant correcto.
      2- Busca un ID inexistente y nos devuelve el string 'No se ha encontrado ningún restaurant'.
      3- Busca un string y nos devuelve el string 'No se ha encontrado ningún restaurant'.*/
  let restaurant;

  beforeEach(function() {
    restaurant = mockListadoRestaurant();
  });

  it('Busca un ID existente y devuelve restaurant correcto', function() {
    let restaurantCorrecto = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]);
    let resultadoObtenido = restaurant.buscarRestaurante(2);
    expect(resultadoObtenido).to.be.eql(restaurantCorrecto);
  });

  it('Busca un ID inexistente y nos devuelve el string: No se ha encontrado ningún restaurant', function() {
    let resultadoCorrecto = "No se ha encontrado ningún restaurant";
    let resultadoObtenido = restaurant.buscarRestaurante(43);
    expect(resultadoObtenido).to.be.eql(resultadoCorrecto);
  });

  it('Busca un string y nos devuelve el string: No se ha encontrado ningún restaurant', function() {
    let resultadoCorrecto = "No se ha encontrado ningún restaurant";
    let resultadoObtenido = restaurant.buscarRestaurante('5');
    expect(resultadoObtenido).to.be.eql(resultadoCorrecto);
  });
});

describe('Testear Obtener Restaurantes', () => {
  /*  1- Busca restaurantes con rubro válido, ciudad válida y horario existente: devuelve un restaurante válido.
      2- Busca restaurantes con rubro válido, ciudad válida y horario no existente: devuelve un array vacio.
      3- Busca restaurantes con rubro válido, ciudad no válida y horario existente: devuelve un array vacio.
      4- Busca restaurantes con rubro no válido, ciudad válida y horario existente: devuelve un array vacio.*/
  let restaurant;

  beforeEach(function() {
    restaurant = mockListadoRestaurant();
  });

  it('Busca restaurantes con el horario, ciudad, y rubro correctos y devuelve restaurante válido', function() {
    let resultadoCorrecto = new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]);
    let resultadoObtenido = restaurant.obtenerRestaurantes("Asiática", "Berlín", "12:00");
    expect(resultadoObtenido[0]).to.be.eql(resultadoCorrecto);
  });

  it('Busca restaurantes con horario diferente y devuelve un array vacio', () => {
    let resultadoObtenido = restaurant.obtenerRestaurantes("Asiática", "Berlín", "15:00");
    expect(resultadoObtenido).to.have.lengthOf(0);
  });

  it('Busca restaurantes con ciudad diferente y devuelve un array vacio', () => {
    let resultadoObtenido = restaurant.obtenerRestaurantes("Asiática", "Londres", "12:00");
    expect(resultadoObtenido).to.have.lengthOf(0);
  });

  it('Busca restaurantes con rubro diferente y devuelve un array vacio', () => {
    let resultadoObtenido = restaurant.obtenerRestaurantes("Pasta", "Berlín", "12:00");
    expect(resultadoObtenido).to.have.lengthOf(0);
  });
});

describe('Testear Reserva TDD', () => {
  /*
  1- Valida que un restaurante calcule correctamente su precio base.
  2- Valida que un restaurante calcule correctamente su precio final, contemplando descuentos y adicionales.*/

  var reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
  var reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");

  describe('Test Reserva Precio Base', () => {
    it('Restaurante calcula correctamente su precio base', () => {
      let resultadoObtenido = reserva1.calcularPrecioBase();
      let resultadoCorrecto = 2800;
      expect(resultadoObtenido).to.be.equal(resultadoCorrecto);
    });
  });

  describe('Test Reserva Precio Final', () => {
    it('Restaurante calcula correctamente su precio final, contemplando descuentos y adicionales', () => {
      let resultadoObtenido = reserva2.calcularPrecioFinal();
      let resultadoCorrecto = 100;
      expect(resultadoObtenido).to.be.equal(resultadoCorrecto);
    });
  });
});
