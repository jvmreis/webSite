import orchestrator from "tests/orchestrator.js";
beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("nome do teste", callbackFunction);

function callbackFunction() {
  console.log("callback function is here");
}

test("func reduzida", () => {
  console.log("callback function is here");
});

test("func reduzida 2", function () {
  console.log("callback function is here");
});

test("espero 1 seja 1", () => {
  expect(1).toBe(1);
});

const calculator = require("../../models/calculator.js");

test("somar 2 + 2 deveria ser 4", () => {
  const resultado = calculator.somar(2, 2);
  console.log("resultado", resultado);
  expect(resultado).toBe(4);
});

test("somar 2 + 100 deveria ser 102", () => {
  const resultado = calculator.somar(2, 100);
  console.log("resultado", resultado);
  expect(resultado).toBe(102);
});

test("somar banana + 100 deveria ser 'Erro' ", () => {
  const resultado = calculator.somar("banana", 100);
  console.log("resultado", resultado);
  expect(resultado).toBe("Erro");
});
