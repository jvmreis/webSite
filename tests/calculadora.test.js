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
  expect(2).toBe(1);
});
